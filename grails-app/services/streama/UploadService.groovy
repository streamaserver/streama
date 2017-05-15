package streama

import grails.transaction.Transactional
import org.apache.commons.codec.digest.DigestUtils
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest

@Transactional
class UploadService {

  def settingsService

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
    log.debug(params)
    def rawFile = request.getFile('file')
    def sha256Hex = DigestUtils.sha256Hex(rawFile.inputStream)
    def index = rawFile.originalFilename.lastIndexOf('.')
    String extension = rawFile.originalFilename[index..-1];
    def originalFilenameNoExt = rawFile.originalFilename[0..(index-1)]
    def contentType = rawFile.contentType;

    java.io.File targetFile = new java.io.File(this.dir.uploadDir, sha256Hex+extension)
    rawFile.transferTo(targetFile)

    File file = createFileFromUpload(sha256Hex, rawFile, extension, originalFilenameNoExt + extension, contentType, params)

    return file
  }


  def createFileFromUpload(sha256Hex, rawFile, extension, originalFilename, contentType, params = [:]){
    def fileInstance = new File(sha256Hex:sha256Hex)
    fileInstance.originalFilename = originalFilename
    fileInstance.contentType = contentType
    fileInstance.extension = extension
    fileInstance.size = rawFile.size
    fileInstance.name = rawFile.name
    if(params?.isPublic == 'true'){
      fileInstance.isPublic = true
    }
    fileInstance.save(failOnError: true)


    return fileInstance
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
    def baseUrl = settingsService.baseUrl
    baseUrl = baseUrl.replaceAll('/$', '')
    return baseUrl  + "/file/serve/" + file.id + file.extension
  }
}
