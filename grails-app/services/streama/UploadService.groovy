package streama

import grails.transaction.Transactional
import org.apache.commons.codec.digest.DigestUtils
import org.apache.tika.metadata.Metadata
import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.sax.BodyContentHandler

@Transactional
class UploadService {

  def settingsService
  def grailsApplication
  def openSubtitlesHasherService
  def fileService

  def getStoragePaths() {
    def storages = []
    def storage1 = Settings.findBySettingsKey('Upload Directory')?.value
    if (storage1) {
      storages.add(storage1)
    }

    def secondDirectory = Settings.findBySettingsKey('Second Directory')?.value
    def additionalReadStorages = secondDirectory?.split(/\|/)

    if (additionalReadStorages) {
      storages.addAll(additionalReadStorages)
    }
    return storages
  }

  def getLocalPath() {
    return Settings.findBySettingsKey('Local Video Files')?.value
  }

  def upload(request, params = [:]) {
    //log.debug(params)
    def rawFile = request.getFile('file')
    def mimetype = rawFile.contentType
    def sha256Hex = rawFile.inputStream.withStream { stream -> DigestUtils.sha256Hex(stream) }
    def index = rawFile.originalFilename.lastIndexOf('.')
    String extension = rawFile.originalFilename[index..-1];
    def originalFilenameNoExt = rawFile.originalFilename[0..(index - 1)]
    def contentType = rawFile.contentType;

    def allowedTypes = grailsApplication.config.streama.uploadtypes

    //If the file upload content type isn't in the upload types array, fail the upload.
    if (!allowedTypes.contains(mimetype)) {
      return null
    }

    java.io.File targetFile = new java.io.File(this.dir.uploadDir, sha256Hex + extension)
    rawFile.transferTo(targetFile)

    def openSubtitleHash = fileService.allowedVideoFormats.contains(extension) ? openSubtitlesHasherService.computeHash(targetFile) : null

    File file = createFileFromUpload(sha256Hex, rawFile, extension, originalFilenameNoExt + extension, contentType, openSubtitleHash, params)

    //log.debug(file)
    return file
  }


  def createFileFromUpload(String sha256Hex, rawFile, String extension, String originalFilename, String contentType, String openSubtitleHash, Map params = [:]) {
    def fileInstance = new File(sha256Hex: sha256Hex)
    fileInstance.originalFilename = originalFilename
    fileInstance.contentType = contentType
    fileInstance.extension = extension
    fileInstance.size = params.size ?: rawFile.size
    fileInstance.subtitleSrcLang = params?.language
    fileInstance.name = rawFile.name
    fileInstance.openSubtitleHash = openSubtitleHash
    if (params?.isPublic == 'true') {
      fileInstance.isPublic = true
    }
    fileInstance.save(failOnError: true)


    return fileInstance
  }

  def getDir() {
    def imagePath = storagePaths.getAt(0)
    def uploadDir = new java.io.File(imagePath + '/upload')
    if (!uploadDir.exists()) {
      uploadDir.mkdirs()
    }
    def dirs = [uploadDir: uploadDir]
    return dirs

  }

  String getPath(File file) {
    if (file.localFile) {
      // A local file is defined
      return new java.io.File(file.localFile)
    }

    // The file is stored in the upload directory
    def foundVideoPath

    storagePaths.each { storagePath ->
      if (foundVideoPath) {
        return
      }
      def uploadDir = new java.io.File(storagePath + '/upload')
      def filePath = "$uploadDir/$file.sha256Hex" + file.extension
      if ((new java.io.File(filePath)).exists()) {
        foundVideoPath = filePath
      }

    }
    return foundVideoPath
  }

  def getFileSrc(File file) {
    def servePrefix = grailsApplication.config.streama.servePrefix

    if (servePrefix) {
      servePrefix = servePrefix.replaceAll('/$', '')
    } else {
      servePrefix = ""
    }

    return servePrefix + "/file/serve/" + file.id + file.extension
  }


  File createUploadFromFromLink(String imageLink) {
    def url = new URL(imageLink)
    URLConnection con = url.openConnection()
    con.setUseCaches(false)
    def fileName = new java.io.File(url.file).name
    def orignialImageData = con.inputStream.bytes


    render new Date()
  }

  /**
   * Handle Upload from real byte[]
   * @param bytes
   * @param params
   * @return
   */
  File handleUpload(byte[] fileData, params) {
    if (!fileData) {
      return
    }
    params.sha256Hex = DigestUtils.sha256Hex(fileData)
    params.extension = extractExtensionFromFilename(params.name)
    params.contentType = params.contentType ?: detectContentType(fileData)
    params.size = fileData.size()

    java.io.File targetFile = new java.io.File(this.dir.uploadDir, params.sha256Hex + params.extension)
    targetFile.setBytes(fileData)
    File file = createFileFromUpload(params.sha256Hex, targetFile, params.extension, params.name, params.contentType, null, params)
    return file
  }


  String extractExtensionFromFilename(String filename) {
    String extension

    if (filename == 'undefined') {
      extension = '.png'
    } else {
      def index = filename.lastIndexOf('.')
      extension = filename[index..-1];

      if (extension.length() < 3) {
        extension = '.png'
      }
    }
    return extension
  }

  def detectContentType(byte[] buf) {
    AutoDetectParser parser = new AutoDetectParser()
    BodyContentHandler handler = new BodyContentHandler(new StringWriter())
    Metadata metadata = new Metadata()
    parser.parse(new ByteArrayInputStream(buf), handler, metadata)
    def contentType = metadata.get("Content-Type")
//    log.debug('contentType' + contentType)
    return contentType
  }

}
