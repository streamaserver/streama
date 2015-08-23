package streama

class File {

  def uploadService

  Date dateCreated
  Date lastUpdated

  String sha256Hex
  String name
  String extension
  String contentType
  String originalFilename
  Long size
  
  String quality

  static mapping = {
    cache true
  }

  static constraints = {
    sha256Hex maxSize: 64
    quality inList: ['720p', '480p', '360p']
  }
  static transients = ['uploadService']

  def getImagePath(){
    uploadService.getPath(sha256Hex, extension)
  }

  def getSrc(){
    def res = uploadService.getFileSrc(this)
    return res
  }
}
