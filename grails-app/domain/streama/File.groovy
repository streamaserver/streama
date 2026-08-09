package streama

import streama.traits.SimpleInstance

class File implements SimpleInstance {

  def uploadService

  Date dateCreated
  Date lastUpdated

  String sha256Hex
  String openSubtitleHash
  String name
  String extension
  String contentType
  String originalFilename
  Long size
  String externalLink
  String localFile
  String subtitleLabel
  String subtitleSrcLang
  String label
  String quality
  Boolean isPublic = false
  Boolean isDefault = false

  // Audio transcoding fields
  String audioCodec              // detected audio codec (aac, eac3, ac3, dts, etc.)
  Boolean needsTranscoding       // true if browser-incompatible codec
  String transcodedAudioPath     // path to cached transcoded .aac file

  static constraints = {
    sha256Hex maxSize: 64
    quality inList: ['720p', '480p', '360p']
    audioCodec nullable: true
    needsTranscoding nullable: true
    transcodedAudioPath nullable: true
  }
  static transients = ['uploadService']

  static simpleInstanceFields = ['id', 'src', 'originalFilename', 'contentType', 'subtitleSrcLang', 'subtitleLabel',
                                 'externalLink', 'label', 'isDefault', 'audioCodec', 'needsTranscoding']

  def getImagePath(){
    uploadService.getPath(this)
  }

  def getSrc(){
    if(externalLink){
      return externalLink
    }
    def res = uploadService.getFileSrc(this)
    return res
  }

  def getFileExists(){
    if(this.imagePath){
      java.io.File rawFile = new java.io.File(this.imagePath)
      return rawFile.exists()
    }else{
      return false
    }
  }

  def getAssociatedVideos(){
    def videos = Video.withCriteria {
      ne("deleted", true)
      files{
        idEq(this.id)
      }
    }

    return videos
  }

  def getAssociatedVideosInclDeleted(){
    def videos = Video.withCriteria {
      files{
        idEq(this.id)
      }
    }

    return videos
  }

  def getIsInUse(){
    if(this.associatedVideos){
      return true
    }
    else if(TvShow.findByDeletedNotEqualAndBackdrop_image(true, this)){
      return true
    }
    else if(TvShow.findByDeletedNotEqualAndPoster_image(true, this)){
      return true
    }
  }
}
