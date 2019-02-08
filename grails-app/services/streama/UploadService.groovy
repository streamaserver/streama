package streama

import grails.transaction.Transactional
import org.apache.commons.codec.digest.DigestUtils
import org.springframework.web.multipart.MultipartFile

import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption

@Transactional
class UploadService {

  def settingsService
  def grailsApplication

  def getStoragePaths(){
    def storages = []
    def storage1 = Settings.findBySettingsKey('Upload Directory')?.value
    if(storage1){
      storages.add(storage1)
    }

    def secondDirectory = Settings.findBySettingsKey('Second Directory')?.value
    def additionalReadStorages = secondDirectory?.split(/\|/)

    if(additionalReadStorages){
      storages.addAll(additionalReadStorages)
    }
    return storages
  }

  def getLocalPath(){
    return Settings.findBySettingsKey('Local Video Files')?.value
  }

  def upload(request, params = [:]) {
    //log.debug(params)
    def rawFile = request.getFile('file')
    return upload(rawFile, params)
  }

  /**
   * extracts Data and uploads file from MultipartFile
   * @param uploadFile
   * @param params
   * @return
   */
  File upload(MultipartFile uploadFile, params = [:]){
    def mimetype = uploadFile.contentType
    def sha256Hex = DigestUtils.sha256Hex(uploadFile.inputStream)
    def index = uploadFile.originalFilename.lastIndexOf('.')
    String extension = uploadFile.originalFilename[index..-1]
    def originalFilenameNoExt = uploadFile.originalFilename[0..(index-1)]
    def contentType = uploadFile.contentType;

    def allowedTypes = grailsApplication.config.streama.uploadtypes

    //If the file upload content type isn't in the upload types array, fail the upload.
    if(!allowedTypes.contains(mimetype)){
      return null
    }

    java.io.File targetFile = new java.io.File(this.dir.uploadDir, sha256Hex+extension)
    uploadFile.transferTo(targetFile)

    File file = createFileFromUpload(sha256Hex, uploadFile, extension, originalFilenameNoExt + extension, contentType, params)

    //log.debug(file)
    return file
  }

  /**
   * extracts Data and create streama.File from inputStream
   * @param inputStream
   * @param fileName
   * @param contentType
   * @param params
   * @return
   */
  File upload(InputStream inputStream, String fileName, String contentType, params = [:]){
    String sha256Hex = DigestUtils.sha256Hex(inputStream)
    Integer fileSize = inputStream.bytes?.length
    String extension = fileName.split(/\./).takeRight(1)

    storeFileFromInputStream(inputStream, fileName, contentType)
    File streamaFile = createFileFromUpload(sha256Hex, fileSize, extension, fileName, contentType, params)

    return streamaFile
  }

  /**
   * create file on harddisk from inputStream
   * @param inputStream
   * @param fileName
   * @param contentType
   * @return
   */
  java.io.File storeFileFromInputStream(InputStream inputStream, String fileName, String contentType){
    String sha256Hex = DigestUtils.sha256Hex(inputStream)
    String extension = fileName.split(/\./).takeRight(1)
    def allowedTypes = grailsApplication.config.streama.uploadtypes

    if(!allowedTypes.contains(contentType)){
      return null
    }

    String fileLocation = this.dir.uploadDir + sha256Hex + extension
    Path outputPath = Paths.get(fileLocation)
    Files.copy(inputStream, outputPath, StandardCopyOption.REPLACE_EXISTING)
    return new java.io.File(fileLocation)
  }


  File createFileFromUpload(String sha256Hex, Integer size, String extension, String originalFilename, String contentType, params = [:]){
    def fileInstance = new File(sha256Hex:sha256Hex)
    fileInstance.originalFilename = originalFilename
    fileInstance.contentType = contentType
    fileInstance.extension = extension
    fileInstance.size = size
    fileInstance.name = originalFilename
    if(params?.isPublic == 'true'){
      fileInstance.isPublic = true
    }
    fileInstance.save(failOnError: true)

    return fileInstance
  }


  File createFileFromUpload(String sha256Hex, MultipartFile rawFile, String extension, String originalFilename, String contentType, params = [:]){
    return createFileFromUpload(sha256Hex, (Integer) rawFile.size, extension, originalFilename, contentType, params)
  }

  def getDir() {
    def imagePath = storagePaths.getAt(0)
    def uploadDir = new java.io.File(imagePath + '/upload')
    if (!uploadDir.exists()){
      uploadDir.mkdirs()
    }
    def dirs = [uploadDir:uploadDir]
    return dirs

  }

  String getPath(File file){
    if (file.localFile) {
      // A local file is defined
      return new java.io.File(file.localFile)
    }

    // The file is stored in the upload directory
    def foundVideoPath

    storagePaths.each{storagePath ->
      if(foundVideoPath){
        return
      }
      def uploadDir = new java.io.File(storagePath + '/upload')
      def filePath = "$uploadDir/$file.sha256Hex" + file.extension
      if((new java.io.File(filePath)).exists()){
        foundVideoPath = filePath
      }

    }
    return foundVideoPath
  }

  def getFileSrc(File file){
    def servePrefix = grailsApplication.config.streama.servePrefix

    if(servePrefix){
      servePrefix = servePrefix.replaceAll('/$', '')
    }else {
      servePrefix = ""
    }

    return servePrefix + "/file/serve/" + file.id + file.extension
  }
}
