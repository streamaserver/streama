package streama

import grails.transaction.Transactional
import groovy.util.logging.Slf4j

@Slf4j
@Transactional
class FfmpegService {

  def settingsService

  // Codecs that browsers cannot play natively
  static final List<String> INCOMPATIBLE_CODECS = [
    'eac3',      // Dolby Digital Plus
    'ac3',       // Dolby Digital
    'dts',       // DTS
    'truehd',    // Dolby TrueHD
    'pcm_s16le', // PCM audio
    'pcm_s24le',
    'pcm_s32le',
    'flac'       // FLAC (limited browser support)
  ]

  // Codecs that browsers can play
  static final List<String> COMPATIBLE_CODECS = [
    'aac',
    'mp3',
    'opus',
    'vorbis'
  ]

  /**
   * Detects if FFmpeg is available and returns its path
   * @return Map with 'found', 'ffmpegPath', 'ffprobePath', 'version'
   */
  Map detectFfmpeg() {
    def result = [found: false, ffmpegPath: null, ffprobePath: null, version: null]

    // First check if custom paths are configured
    String configuredFfmpeg = settingsService.getValueForName('ffmpeg_path')
    String configuredFfprobe = settingsService.getValueForName('ffprobe_path')

    // Try configured paths first, then auto-detect
    String ffmpegPath = configuredFfmpeg ?: findExecutable('ffmpeg')
    String ffprobePath = configuredFfprobe ?: findExecutable('ffprobe')

    if (ffmpegPath && ffprobePath) {
      // Verify they actually work
      try {
        def versionProcess = [ffmpegPath, '-version'].execute()
        versionProcess.waitFor()
        if (versionProcess.exitValue() == 0) {
          def versionOutput = versionProcess.text
          def versionMatch = versionOutput =~ /ffmpeg version (\S+)/
          result.version = versionMatch ? versionMatch[0][1] : 'unknown'
          result.found = true
          result.ffmpegPath = ffmpegPath
          result.ffprobePath = ffprobePath
        }
      } catch (Exception e) {
        log.warn("FFmpeg detection failed: ${e.message}")
      }
    }

    return result
  }

  /**
   * Find an executable in the system PATH
   */
  private String findExecutable(String name) {
    def isWindows = System.getProperty('os.name').toLowerCase().contains('windows')
    def pathSeparator = isWindows ? ';' : ':'
    def executableName = isWindows ? "${name}.exe" : name

    // Common install locations
    def commonPaths = [
      '/usr/bin',
      '/usr/local/bin',
      '/opt/homebrew/bin',  // macOS ARM
      '/opt/local/bin',     // MacPorts
      'C:\\ffmpeg\\bin',    // Windows common
      'C:\\Program Files\\ffmpeg\\bin'
    ]

    // Check PATH environment variable
    def pathEnv = System.getenv('PATH')
    def searchPaths = pathEnv?.split(pathSeparator)?.toList() ?: []
    searchPaths.addAll(commonPaths)

    for (String path : searchPaths) {
      def file = new java.io.File(path, executableName)
      if (file.exists() && file.canExecute()) {
        return file.absolutePath
      }
    }

    // Try using 'which' or 'where' command
    try {
      def command = isWindows ? ['where', name] : ['which', name]
      def process = command.execute()
      process.waitFor()
      if (process.exitValue() == 0) {
        return process.text.trim().split('\n')[0]
      }
    } catch (Exception ignored) {}

    return null
  }

  /**
   * Get the FFmpeg path (configured or auto-detected)
   */
  String getFfmpegPath() {
    String configured = settingsService.getValueForName('ffmpeg_path')
    return configured ?: findExecutable('ffmpeg')
  }

  /**
   * Get the FFprobe path (configured or auto-detected)
   */
  String getFfprobePath() {
    String configured = settingsService.getValueForName('ffprobe_path')
    return configured ?: findExecutable('ffprobe')
  }

  /**
   * Check if transcoding is enabled and FFmpeg is available
   */
  boolean isTranscodingAvailable() {
    def enabled = settingsService.getValueForName('transcoding_enabled')
    if (!enabled) return false

    def detection = detectFfmpeg()
    return detection.found
  }

  /**
   * Probe a video file to get its audio codec
   * @param filePath Full path to the video file
   * @return The audio codec name (e.g., 'aac', 'eac3', 'ac3') or null if detection failed
   */
  String probeAudioCodec(String filePath) {
    String ffprobePath = getFfprobePath()
    if (!ffprobePath) {
      log.warn("FFprobe not available, cannot probe audio codec")
      return null
    }

    try {
      def command = [
        ffprobePath,
        '-v', 'quiet',
        '-select_streams', 'a:0',  // First audio stream
        '-show_entries', 'stream=codec_name',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        filePath
      ]

      log.debug("Probing audio codec: ${command.join(' ')}")

      def process = command.execute()
      def stdout = new StringBuilder()
      def stderr = new StringBuilder()
      process.consumeProcessOutput(stdout, stderr)
      process.waitFor()

      if (process.exitValue() == 0) {
        String codec = stdout.toString().trim()
        log.info("Detected audio codec for ${filePath}: ${codec}")
        return codec
      } else {
        log.warn("FFprobe failed for ${filePath}: ${stderr}")
        return null
      }
    } catch (Exception e) {
      log.error("Error probing audio codec: ${e.message}", e)
      return null
    }
  }

  /**
   * Check if a codec needs transcoding for browser playback
   */
  boolean needsTranscoding(String codec) {
    if (!codec) return false
    return INCOMPATIBLE_CODECS.contains(codec.toLowerCase())
  }

  /**
   * Get file duration in seconds using ffprobe
   */
  Double getFileDuration(String filePath) {
    String ffprobePath = getFfprobePath()
    if (!ffprobePath) return null

    try {
      def command = [
        ffprobePath,
        '-v', 'quiet',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        filePath
      ]

      def process = command.execute()
      def stdout = new StringBuilder()
      process.consumeProcessOutput(stdout, new StringBuilder())
      process.waitFor()

      if (process.exitValue() == 0) {
        return stdout.toString().trim() as Double
      }
    } catch (Exception e) {
      log.error("Error getting file duration: ${e.message}")
    }
    return null
  }

  /**
   * Transcode audio from video file to AAC
   * @param inputPath Path to the source video file
   * @param outputPath Path where the transcoded AAC file should be saved
   * @param progressCallback Optional callback for progress updates (0.0 - 1.0)
   * @return true if transcoding succeeded, false otherwise
   */
  boolean transcodeAudioToAac(String inputPath, String outputPath, Closure progressCallback = null) {
    String ffmpegPath = getFfmpegPath()
    if (!ffmpegPath) {
      log.error("FFmpeg not available, cannot transcode")
      return false
    }

    // Get duration for progress calculation
    Double duration = getFileDuration(inputPath)

    try {
      // Ensure output directory exists
      new java.io.File(outputPath).parentFile?.mkdirs()

      def command = [
        ffmpegPath,
        '-i', inputPath,
        '-vn',                    // No video
        '-c:a', 'aac',           // AAC codec
        '-b:a', '384k',          // 384kbps bitrate (good quality for 5.1)
        '-ac', '6',              // Keep 5.1 channels if present
        '-y',                    // Overwrite output
        '-progress', 'pipe:1',   // Progress to stdout
        outputPath
      ]

      log.info("Starting audio transcode: ${inputPath} -> ${outputPath}")
      log.debug("FFmpeg command: ${command.join(' ')}")

      def process = command.execute()

      // Parse progress from stdout
      def reader = new BufferedReader(new InputStreamReader(process.inputStream))
      String line
      while ((line = reader.readLine()) != null) {
        if (line.startsWith('out_time_ms=') && duration && progressCallback) {
          try {
            def timeMs = line.replace('out_time_ms=', '') as Long
            def progress = (timeMs / 1000000.0) / duration
            progressCallback(Math.min(progress, 1.0))
          } catch (Exception ignored) {}
        }
      }

      // Capture stderr for error messages
      def stderr = process.errorStream.text
      process.waitFor()

      if (process.exitValue() == 0) {
        log.info("Audio transcode completed: ${outputPath}")
        return true
      } else {
        log.error("FFmpeg transcoding failed with exit code ${process.exitValue()}: ${stderr}")
        // Clean up failed output
        new java.io.File(outputPath).delete()
        return false
      }
    } catch (Exception e) {
      log.error("Error during audio transcoding: ${e.message}", e)
      // Clean up failed output
      new java.io.File(outputPath).delete()
      return false
    }
  }

  /**
   * Stream video with muxed transcoded audio
   * Uses FFmpeg to combine original video stream with transcoded audio on-the-fly
   *
   * @param outputStream The output stream to write to (response.outputStream)
   * @param videoPath Path to the original video file
   * @param audioPath Path to the transcoded audio file
   * @param rangeStart Start byte for range request (null for full file)
   * @param rangeEnd End byte for range request (null for full file)
   */
  void streamMuxedVideo(OutputStream outputStream, String videoPath, String audioPath, Long rangeStart = null, Long rangeEnd = null) {
    String ffmpegPath = getFfmpegPath()
    if (!ffmpegPath) {
      throw new RuntimeException("FFmpeg not available")
    }

    try {
      def command = [
        ffmpegPath,
        '-i', videoPath,         // Original video (with incompatible audio)
        '-i', audioPath,         // Transcoded audio
        '-map', '0:v',           // Use video from first input
        '-map', '1:a',           // Use audio from second input
        '-c:v', 'copy',          // Copy video without re-encoding
        '-c:a', 'copy',          // Copy transcoded audio
        '-f', 'mp4',             // Output format
        '-movflags', 'frag_keyframe+empty_moov+faststart',  // Streaming-friendly MP4
        'pipe:1'                 // Output to stdout
      ]

      // For range requests, we need to seek
      if (rangeStart != null && rangeStart > 0) {
        // Calculate approximate time offset based on file size
        // This is an approximation - proper seeking would require more complex logic
        def videoFile = new java.io.File(videoPath)
        def totalSize = videoFile.length()
        Double duration = getFileDuration(videoPath)
        if (duration) {
          Double seekTime = (rangeStart / totalSize) * duration
          command = [
            ffmpegPath,
            '-ss', seekTime.toString(),  // Seek before input
            '-i', videoPath,
            '-i', audioPath,
            '-map', '0:v',
            '-map', '1:a',
            '-c:v', 'copy',
            '-c:a', 'copy',
            '-f', 'mp4',
            '-movflags', 'frag_keyframe+empty_moov',
            'pipe:1'
          ]
        }
      }

      log.debug("Streaming muxed video: ${command.join(' ')}")

      def process = command.execute()

      // Stream output to response
      byte[] buffer = new byte[16384]
      def inputStream = process.inputStream
      int bytesRead
      while ((bytesRead = inputStream.read(buffer)) != -1) {
        outputStream.write(buffer, 0, bytesRead)
      }

      process.waitFor()

      if (process.exitValue() != 0) {
        def stderr = process.errorStream.text
        log.error("FFmpeg streaming failed: ${stderr}")
      }
    } catch (Exception e) {
      log.error("Error streaming muxed video: ${e.message}", e)
      throw e
    }
  }
}
