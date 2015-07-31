package streama

import grails.transaction.Transactional
import org.apache.commons.codec.digest.DigestUtils
import org.springframework.web.multipart.commons.CommonsMultipartFile
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest

@Transactional
class UploadService {

  def grailsApplication
  def grailsLinkGenerator

  def getStoragePath(){
    return Settings.findBySettingsKey('Upload Directory')?.value
  }

  def upload(DefaultMultipartHttpServletRequest request) {

    CommonsMultipartFile rawFile = request.getFile('file')
    def sha256Hex = DigestUtils.sha256Hex(rawFile.inputStream)
    def index = rawFile.originalFilename.lastIndexOf('.')
    def extension = rawFile.originalFilename[index..-1];
    if(!extension){
      extension = ".png"
    }
    java.io.File targetFile = new java.io.File(this.dir.uploadDir,sha256Hex+extension)
    rawFile.transferTo(targetFile)

    File file = createFileFromUpload(sha256Hex, rawFile, extension)
    return file
  }


  def createFileFromUpload(sha256Hex, image, extension){
    def imageInstance = new File(sha256Hex:sha256Hex);
    imageInstance.originalFilename = image.originalFilename
    imageInstance.contentType = image.contentType
    imageInstance.extension = extension
    imageInstance.size = image.size
    imageInstance.name = image.name
    imageInstance.save(failOnError: true)

    return imageInstance
  }

  def getDir() {
    def imagePath = storagePath
    def uploadDir = new java.io.File(imagePath + '/upload')
    if (!uploadDir.exists()){
      uploadDir.mkdirs()
    }
    def dirs = [uploadDir:uploadDir]
    return dirs

  }

    String getPathWithoutExtension(String sha256Hex){
      def uploadDir = new java.io.File(storagePath + '/upload')
      return "$uploadDir/$sha256Hex"
    }

  String getPath(String sha256Hex, extension){
    if(!extension){
      extension = ".png"
    }
    return getPathWithoutExtension(sha256Hex) + extension
  }

  def getFileSrc(File file){
    def serverURL = grailsApplication.metadata['grails.serverURL']
    return grailsLinkGenerator.serverBaseURL  + "/file/serve/" + file.sha256Hex + file.extension

  }


}
