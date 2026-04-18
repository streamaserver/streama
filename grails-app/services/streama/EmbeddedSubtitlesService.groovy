package streama

import grails.transaction.Transactional
import groovy.json.JsonSlurper
import groovy.util.logging.Slf4j
import org.apache.commons.codec.digest.DigestUtils

@Slf4j
@Transactional
class EmbeddedSubtitlesService {

  def ffmpegService
  def uploadService
  def fileService

  // ffmpeg subtitle codecs that can be converted to WebVTT (text-based)
  static final List<String> TEXT_SUBTITLE_CODECS = [
    'subrip', 'srt', 'ass', 'ssa', 'mov_text', 'webvtt', 'text'
  ]

  /**
   * Probes a video file for embedded subtitle streams and returns metadata
   * for each one (without extracting anything). If fileId is null the
   * video's default video file is used.
   */
  Map listEmbeddedStreams(Video video, Long fileId = null) {
    def ctx = resolveVideoContext(video, fileId)
    if (ctx.error) return ctx

    def streams = probeSubtitleStreams(ctx.ffprobePath, ctx.sourcePath)
    if (streams == null) {
      return [error: true, message: 'Failed to probe video file']
    }

    def result = streams.collect { stream ->
      String codec = stream.codec_name?.toString()?.toLowerCase()
      String lang = stream.tags?.language?.toString() ?: 'und'
      String title = stream.tags?.title?.toString()
      boolean extractable = TEXT_SUBTITLE_CODECS.contains(codec)
      [
        index      : stream.index,
        codec      : codec,
        language   : lang,
        title      : title,
        label      : title ?: languageLabel(lang),
        extractable: extractable,
        reason     : extractable ? null : 'image-based subtitle (cannot convert to WebVTT)',
        forced     : stream.disposition?.forced == 1,
        hearing_impaired: stream.disposition?.hearing_impaired == 1,
        default_   : stream.disposition?.default == 1
      ]
    }
    return [error: false, streams: result]
  }

  /**
   * Extracts the given subtitle stream indexes from the video's default video
   * file, converts them to WebVTT and attaches them as File records on the
   * Video.
   *
   * @param streamIndexes list of stream indexes to extract. If null/empty all
   *                      text-based streams are extracted.
   */
  Map extractFromVideo(Video video, List<Integer> streamIndexes = null, Long fileId = null) {
    def ctx = resolveVideoContext(video, fileId)
    if (ctx.error) return ctx

    def streams = probeSubtitleStreams(ctx.ffprobePath, ctx.sourcePath)
    if (streams == null) {
      return [error: true, message: 'Failed to probe video file']
    }
    if (streams.isEmpty()) {
      return [error: false, extracted: 0, skipped: 0, subtitleIds: [],
              message: 'No embedded subtitle tracks found']
    }

    def wanted = streamIndexes ? streamIndexes.collect { it as int } as Set : null

    int extracted = 0
    int skipped = 0
    List<Long> createdIds = []

    def uploadDir = uploadService.getDir().uploadDir.toString()
    String baseFilename = ctx.videoFile.originalFilename ?: video.title ?: "video-${video.id}"
    int dotIdx = baseFilename.lastIndexOf('.')
    if (dotIdx > 0) {
      baseFilename = baseFilename.substring(0, dotIdx)
    }

    streams.each { stream ->
      int idx = stream.index as int
      if (wanted != null && !wanted.contains(idx)) {
        return
      }
      String codec = stream.codec_name?.toString()?.toLowerCase()
      if (!TEXT_SUBTITLE_CODECS.contains(codec)) {
        log.info("Skipping non-text subtitle stream #${idx} (codec=${codec})")
        skipped++
        return
      }

      String lang = stream.tags?.language?.toString() ?: 'und'
      String title = stream.tags?.title?.toString()

      String tmpName = "embedded-${video.id}-${idx}-${System.currentTimeMillis()}.vtt"
      java.io.File tmpFile = new java.io.File(uploadDir, tmpName)

      boolean ok = extractSubtitleStream(ctx.ffmpegPath, ctx.sourcePath, idx, tmpFile.absolutePath)
      if (!ok || !tmpFile.exists() || tmpFile.length() == 0) {
        log.warn("Failed to extract subtitle stream #${idx}")
        if (tmpFile.exists()) tmpFile.delete()
        skipped++
        return
      }

      try {
        byte[] bytes = tmpFile.bytes
        String sha256Hex = DigestUtils.sha256Hex(bytes)
        java.io.File finalFile = new java.io.File(uploadDir, sha256Hex + '.vtt')
        if (!finalFile.exists()) {
          tmpFile.renameTo(finalFile)
        } else {
          tmpFile.delete()
        }

        String originalFilename = "${baseFilename}.${lang}.vtt"
        def params = [size: finalFile.length(), language: lang]
        File fileDb = uploadService.createFileFromUpload(
          sha256Hex, finalFile, '.vtt', originalFilename, 'text/vtt', null, params
        )
        if (fileDb) {
          fileDb.subtitleLabel = title ?: languageLabel(lang)
          if (video.getSubtitles().isEmpty()) {
            fileDb.isDefault = true
          }
          fileDb.save(flush: true, failOnError: true)
          video.addToFiles(fileDb)
          createdIds << fileDb.id
          extracted++
        }
      } catch (Exception e) {
        log.error("Error saving extracted subtitle: ${e.message}", e)
        if (tmpFile.exists()) tmpFile.delete()
        skipped++
      }
    }

    if (extracted > 0) {
      video.save(flush: true, failOnError: true)
    }

    return [error: false, extracted: extracted, skipped: skipped, subtitleIds: createdIds]
  }

  private Map resolveVideoContext(Video video, Long fileId = null) {
    if (!video) {
      return [error: true, message: 'Video not found']
    }
    def videoFile
    if (fileId) {
      videoFile = video.getVideoFiles()?.find { it.id == fileId }
      if (!videoFile) {
        return [error: true, message: 'Video file not found on this video']
      }
    } else {
      videoFile = video.getDefaultVideoFile() ?: video.getVideoFiles()?.find { true }
    }
    if (!videoFile) {
      return [error: true, message: 'No video file associated with this video']
    }
    String sourcePath = uploadService.getPath(videoFile)?.toString()
    if (!sourcePath || !(new java.io.File(sourcePath).exists())) {
      return [error: true, message: 'Video file not found on disk']
    }
    String ffprobePath = ffmpegService.getFfprobePath()
    String ffmpegPath = ffmpegService.getFfmpegPath()
    if (!ffprobePath || !ffmpegPath) {
      return [error: true, message: 'FFmpeg/FFprobe not available on this server']
    }
    return [error: false, videoFile: videoFile, sourcePath: sourcePath,
            ffprobePath: ffprobePath, ffmpegPath: ffmpegPath]
  }

  /**
   * Run ffprobe to list subtitle streams. Returns a list of maps with
   * keys: index, codec_name, tags (language, title).
   */
  private List probeSubtitleStreams(String ffprobePath, String filePath) {
    try {
      def command = [
        ffprobePath,
        '-v', 'quiet',
        '-print_format', 'json',
        '-show_entries', 'stream=index,codec_name,codec_type,disposition:stream_tags=language,title',
        '-select_streams', 's',
        filePath
      ]
      log.debug("Probing subtitle streams: ${command.join(' ')}")

      def process = command.execute()
      def stdout = new StringBuilder()
      def stderr = new StringBuilder()
      process.consumeProcessOutput(stdout, stderr)
      process.waitFor()

      if (process.exitValue() != 0) {
        log.warn("ffprobe failed: ${stderr}")
        return null
      }

      def json = new JsonSlurper().parseText(stdout.toString())
      return (json?.streams ?: []) as List
    } catch (Exception e) {
      log.error("Error probing subtitle streams: ${e.message}", e)
      return null
    }
  }

  /**
   * Extract a single subtitle stream and convert to WebVTT.
   */
  private boolean extractSubtitleStream(String ffmpegPath, String inputPath, int streamIndex, String outputPath) {
    try {
      def command = [
        ffmpegPath,
        '-y',
        '-i', inputPath,
        '-map', "0:${streamIndex}".toString(),
        '-c:s', 'webvtt',
        '-f', 'webvtt',
        outputPath
      ]
      log.info("Extracting subtitle: ${command.join(' ')}")

      def process = command.execute()
      def stderr = new StringBuilder()
      process.consumeProcessOutput(new StringBuilder(), stderr)
      process.waitFor()

      if (process.exitValue() != 0) {
        log.warn("ffmpeg subtitle extract failed for stream ${streamIndex}: ${stderr}")
        return false
      }
      return true
    } catch (Exception e) {
      log.error("Error extracting subtitle stream: ${e.message}", e)
      return false
    }
  }

  private String languageLabel(String code) {
    if (!code) return 'Unknown'
    def map = [
      eng: 'English', ger: 'German', deu: 'German', fre: 'French', fra: 'French',
      spa: 'Spanish', ita: 'Italian', dut: 'Dutch', nld: 'Dutch', por: 'Portuguese',
      rus: 'Russian', jpn: 'Japanese', kor: 'Korean', chi: 'Chinese', zho: 'Chinese',
      swe: 'Swedish', nor: 'Norwegian', dan: 'Danish', fin: 'Finnish', pol: 'Polish',
      ara: 'Arabic', heb: 'Hebrew', tur: 'Turkish', cze: 'Czech', ces: 'Czech',
      hun: 'Hungarian', gre: 'Greek', ell: 'Greek', und: 'Unknown'
    ]
    return map[code.toLowerCase()] ?: code.toUpperCase()
  }
}
