package streama

class Video {

  def springSecurityService
  transient videoService

  Date dateCreated
  Date lastUpdated

  String overview
  String apiId
  String original_language

  Double vote_average
  Integer vote_count
  Double popularity
  Integer intro_start
  Integer intro_end
  Integer outro_start
  Integer reportCount
  Boolean deleted = false
  String imdb_id

  static hasMany = [files: File]

  static mapping = {
    cache true
    files cache: true
    overview type: 'text'
  }

  static constraints = {
    overview size: 1..5000

    dateCreated nullable: true
    lastUpdated nullable: true
  }

  def hasFiles(){
    if(files){
      return true
    }
    return false
  }

  def getViewingStatus(){
    ViewingStatus.findByVideoAndUser(this, springSecurityService.currentUser)
  }

  def getNextEpisode(){
    if(!(this instanceof Episode)){
      return
    }

    Episode episode = (Episode) this

    Video nextEpisode = episode.show.episodes?.find{
      return (it.episode_number == episode.episode_number+1 && it.season_number == episode.season_number)
    }
    if(!nextEpisode){
      nextEpisode = episode.show.episodes?.find{
        return (it.season_number == episode.season_number+1 && it.episode_number == 1)
      }
    }

    if(nextEpisode && nextEpisode.files){
      return nextEpisode
    }
  }


  String getTitle(){
    if (this instanceof Movie) {
      return this.title
    }
    if (this instanceof GenericVideo) {
      return this.title
    }
    if (this instanceof Episode) {
      return this.show?.name
    }
  }
  def getVideoFiles(){
    return this.files?.findAll{it.extension != '.srt' && it.extension != '.vtt'}
  }
  def getSubtitles(){
    return this.files?.findAll{it.extension == '.srt' || it.extension == '.vtt'}
  }

  def addLocalFile(localFilePath){
    return videoService.addLocalFile(this, [localFile: localFilePath])
  }

  /**
   * builds entire image path for tmdb image paths. Ie returns something like
   * https://image.tmdb.org/t/p/w300/uZEIHtWmJKzCL59maAgfkpbcGzC.jpg
   * @param propertyName on the video instance
   * @param size for the tmdb image path. defaults to 300
   * @return entire image link for tmdb, for non-tmdb-videos returns value as is.
   */
  String buildImagePath(String propertyName, Integer size = 300){
    if(!this.hasProperty(propertyName)){
      log.error('no Property fonud on instance called ' + propertyName)
      return
    }

    String imagePath = this[propertyName]

    if(imagePath?.startsWith('/')){
      return "https://image.tmdb.org/t/p/w$size$imagePath"
    }else{
      return imagePath
    }
  }
}
