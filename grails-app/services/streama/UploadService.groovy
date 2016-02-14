package streama

import grails.transaction.Transactional
import org.apache.commons.codec.digest.DigestUtils
import org.springframework.web.multipart.commons.CommonsMultipartFile
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
    def storage2 = Settings.findBySettingsKey('Second Directory')?.value
    if(storage2){
      storages.add(storage2)
    }

    return storages
  }

  def upload(DefaultMultipartHttpServletRequest request) {

    CommonsMultipartFile rawFile = request.getFile('file')
    def sha256Hex = DigestUtils.sha256Hex(rawFile.inputStream)
    def index = rawFile.originalFilename.lastIndexOf('.')
    String extension = rawFile.originalFilename[index..-1];
    def originalFilenameNoExt = rawFile.originalFilename[0..(index-1)]
    def contentType = rawFile.contentType;

    java.io.File targetFile = new java.io.File(this.dir.uploadDir, sha256Hex+extension)
    rawFile.transferTo(targetFile)

    File file = createFileFromUpload(sha256Hex, rawFile, extension, originalFilenameNoExt + extension, contentType)

    return file
  }


  def createFileFromUpload(sha256Hex, rawFile, extension, originalFilename, contentType){
    def fileInstance = new File(sha256Hex:sha256Hex)
    fileInstance.originalFilename = originalFilename
    fileInstance.contentType = contentType
    fileInstance.extension = extension
    fileInstance.size = rawFile.size
    fileInstance.name = rawFile.name
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

  String getPath(String sha256Hex, extension){
    def foundVideoPath

    storagePaths.each{storagePath ->
      if(foundVideoPath){
        return
      }
      def uploadDir = new java.io.File(storagePath + '/upload')
      def filePath = "$uploadDir/$sha256Hex" + extension
      if((new java.io.File(filePath)).exists()){
        foundVideoPath = filePath
      }

    }
    return foundVideoPath
  }

  def getFileSrc(File file){
    return settingsService.baseUrl  + "/file/serve/" + file.id + file.extension
  }


}
