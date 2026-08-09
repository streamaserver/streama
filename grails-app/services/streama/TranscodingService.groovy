package streama

import grails.transaction.Transactional
import groovy.util.logging.Slf4j
import java.util.concurrent.ConcurrentHashMap

@Slf4j
@Transactional
class TranscodingService {

  def ffmpegService
  def uploadService
  def settingsService

  // Track active transcoding jobs (fileId -> progress)
  private static final ConcurrentHashMap<Long, TranscodingProgress> activeJobs = new ConcurrentHashMap<>()

  static class TranscodingProgress {
    Long fileId
    String status  // 'queued', 'transcoding', 'completed', 'failed'
    Double progress  // 0.0 - 1.0
    String error
    Long startTime
    Long endTime

    TranscodingProgress(Long fileId) {
      this.fileId = fileId
      this.status = 'queued'
      this.progress = 0.0
      this.startTime = System.currentTimeMillis()
    }
  }

  /**
   * Get the cache directory for transcoded files
   */
  String getCacheDirectory() {
    String uploadDir = uploadService.getUploadPath()
    if (!uploadDir) {
      uploadDir = System.getProperty('java.io.tmpdir')
    }
    return "${uploadDir}/transcode-cache"
  }

  /**
   * Get the cache path for a specific file's transcoded audio
   */
  String getCachePath(File file) {
    if (!file?.sha256Hex) return null
    return "${getCacheDirectory()}/${file.sha256Hex}.aac"
  }

  /**
   * Check if transcoded audio exists for a file
   */
  boolean hasTranscodedAudio(File file) {
    if (file?.transcodedAudioPath) {
      def audioFile = new java.io.File(file.transcodedAudioPath)
      return audioFile.exists()
    }
    return false
  }

  /**
   * Probe a file and update its audio codec information
   * @return true if file was updated
   */
  boolean probeAndUpdateFile(File file) {
    if (!ffmpegService.isTranscodingAvailable()) {
      return false
    }

    String filePath = uploadService.getPath(file)
    if (!filePath) {
      log.warn("Cannot probe file ${file.id}: no file path")
      return false
    }

    String codec = ffmpegService.probeAudioCodec(filePath)
    if (codec) {
      file.audioCodec = codec
      file.needsTranscoding = ffmpegService.needsTranscoding(codec)

      // Check if we already have cached transcoded audio
      if (file.needsTranscoding) {
        String cachePath = getCachePath(file)
        if (new java.io.File(cachePath).exists()) {
          file.transcodedAudioPath = cachePath
        }
      }

      file.save(flush: true)
      log.info("Updated file ${file.id} codec info: ${codec}, needsTranscoding: ${file.needsTranscoding}")
      return true
    }
    return false
  }

  /**
   * Get transcoding status for a file
   */
  Map getTranscodingStatus(File file) {
    def result = [
      fileId: file.id,
      audioCodec: file.audioCodec,
      needsTranscoding: file.needsTranscoding,
      hasTranscodedAudio: hasTranscodedAudio(file),
      status: 'ready'
    ]

    // Check if transcoding is in progress
    def progress = activeJobs.get(file.id)
    if (progress) {
      result.status = progress.status
      result.progress = progress.progress
      result.error = progress.error
    } else if (file.needsTranscoding && !hasTranscodedAudio(file)) {
      result.status = 'pending'
    }

    return result
  }

  /**
   * Transcode a file's audio (blocking)
   * @return true if transcoding succeeded or was already done
   */
  boolean transcodeFile(File file) {
    if (!file) return false

    // Already transcoded?
    if (hasTranscodedAudio(file)) {
      return true
    }

    // Doesn't need transcoding?
    if (!file.needsTranscoding) {
      return true
    }

    // Already in progress?
    if (activeJobs.containsKey(file.id)) {
      log.info("Transcoding already in progress for file ${file.id}")
      return false
    }

    // Get source file path
    String sourcePath = uploadService.getPath(file)
    if (!sourcePath) {
      log.error("Cannot transcode file ${file.id}: source file not found")
      return false
    }

    // Set up cache path
    String outputPath = getCachePath(file)
    if (!outputPath) {
      log.error("Cannot determine cache path for file ${file.id}")
      return false
    }

    // Create progress tracker
    def progress = new TranscodingProgress(file.id)
    activeJobs.put(file.id, progress)

    try {
      progress.status = 'transcoding'

      // Ensure cache directory exists
      new java.io.File(getCacheDirectory()).mkdirs()

      // Do the transcoding
      boolean success = ffmpegService.transcodeAudioToAac(sourcePath, outputPath) { Double p ->
        progress.progress = p
      }

      if (success) {
        progress.status = 'completed'
        progress.progress = 1.0
        progress.endTime = System.currentTimeMillis()

        // Update file record
        file.transcodedAudioPath = outputPath
        file.save(flush: true)

        log.info("Transcoding completed for file ${file.id}")
        return true
      } else {
        progress.status = 'failed'
        progress.error = 'FFmpeg transcoding failed'
        return false
      }
    } catch (Exception e) {
      log.error("Transcoding failed for file ${file.id}: ${e.message}", e)
      progress.status = 'failed'
      progress.error = e.message
      return false
    } finally {
      // Keep job in map for a short time so status can be queried
      Thread.start {
        Thread.sleep(30000)  // Keep for 30 seconds
        activeJobs.remove(file.id)
      }
    }
  }

  /**
   * Transcode file asynchronously
   */
  void transcodeFileAsync(File file) {
    Thread.start {
      transcodeFile(file)
    }
  }

  /**
   * Get list of files needing transcoding
   */
  List<File> getFilesPendingTranscoding() {
    return File.findAllByNeedsTranscodingAndTranscodedAudioPathIsNull(true)
  }

  /**
   * Transcode all pending files
   * @param progressCallback Called with (completed, total) counts
   */
  void transcodeAllPending(Closure progressCallback = null) {
    def pendingFiles = getFilesPendingTranscoding()
    int total = pendingFiles.size()
    int completed = 0

    log.info("Starting batch transcoding of ${total} files")

    for (File file : pendingFiles) {
      transcodeFile(file)
      completed++
      if (progressCallback) {
        progressCallback(completed, total)
      }
    }

    log.info("Batch transcoding completed: ${completed}/${total} files")
  }

  /**
   * Clear transcoded cache for a specific file
   */
  void clearCache(File file) {
    if (file?.transcodedAudioPath) {
      def cacheFile = new java.io.File(file.transcodedAudioPath)
      if (cacheFile.exists()) {
        cacheFile.delete()
        log.info("Deleted cache file: ${file.transcodedAudioPath}")
      }
      file.transcodedAudioPath = null
      file.save(flush: true)
    }
  }

  /**
   * Clear all transcoded cache
   * @return Number of files deleted
   */
  int clearAllCache() {
    def cacheDir = new java.io.File(getCacheDirectory())
    int count = 0
    if (cacheDir.exists()) {
      cacheDir.eachFile { cacheFile ->
        if (cacheFile.name.endsWith('.aac')) {
          cacheFile.delete()
          count++
        }
      }
    }

    // Clear database references
    File.findAllByTranscodedAudioPathIsNotNull().each { file ->
      file.transcodedAudioPath = null
      file.save(flush: true)
    }

    log.info("Cleared ${count} cached transcoded files")
    return count
  }

  /**
   * Get cache statistics
   */
  Map getCacheStats() {
    def cacheDir = new java.io.File(getCacheDirectory())
    long totalSize = 0
    int fileCount = 0

    if (cacheDir.exists()) {
      cacheDir.eachFile { cacheFile ->
        if (cacheFile.name.endsWith('.aac')) {
          totalSize += cacheFile.length()
          fileCount++
        }
      }
    }

    return [
      cacheDirectory: getCacheDirectory(),
      fileCount: fileCount,
      totalSizeBytes: totalSize,
      totalSizeMB: String.format("%.2f", totalSize / (1024 * 1024)),
      pendingCount: getFilesPendingTranscoding().size(),
      activeJobs: activeJobs.size()
    ]
  }
}
