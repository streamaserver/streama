package streama

import streama.traits.SimpleInstance

class Video implements SimpleInstance{

  transient springSecurityService
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
  static simpleInstanceFields = ['overview', 'poster_path:posterPath', 'title']

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

  String getStatus(){
    ViewingStatus viewingStatus = getViewingStatus()
    if(viewingStatus?.completed || viewingStatus?.hasVideoEnded()){
      return VideoStatus.COMPLETED
    }
    else if(viewingStatus){
      return VideoStatus.VIEWING
    }
    return VideoStatus.UNVIEWED
  }


  def getNextEpisode(){
    if(!(this instanceof Episode)){
      return
    }

    Episode episode = (Episode) this

    def allEpisodesForTvShow = episode.show.episodes
    Video nextEpisode = allEpisodesForTvShow.findAll{it.seasonEpisodeMerged > episode.seasonEpisodeMerged && !it.deleted && it.getVideoFiles()}.min{it.seasonEpisodeMerged}

    if(nextEpisode && nextEpisode.getVideoFiles()){
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

  String getFullTitle(){
    if(this instanceof Episode){
      return this.episodeString + ' - ' + this.name
    }else{
      return this.title + (this.release_date?.substring(0, 4))
    }
  }

  Set<File> getVideoFiles(){
    return this.files?.findAll{it.extension != '.srt' && it.extension != '.vtt'} ?: []
  }
  Set<File> getSubtitles(){
    return this.files?.findAll{it.extension == '.srt' || it.extension == '.vtt'} ?: []
  }

  def addLocalFile(localFilePath){
    return videoService.addLocalFile(this, [localFile: localFilePath])
  }

  /**
   * builds entire image path for tmdb image paths. Ie returns something like
   * https://image.tmdb.org/t/p/w300/uZEIHtWmJKzCL59maAgfkpbcGzC.jpg
   * @param propertyName on the video instance
   * @param size for the tmdb image path. defaults to w300
   * @return entire image link for tmdb, for non-tmdb-videos returns value as is.
   */
  String buildImagePath(String propertyName, String size = "w300"){
    if(!this.hasProperty(propertyName)){
      log.error('no Property fonud on instance called ' + propertyName)
      return
    }

    String imagePath = this[propertyName]
    return TheMovieDbService.buildImagePath(imagePath, size)
  }


  Video suggestNextVideo(){
    def result

    if (this instanceof Movie) {
      if(!this.genre){
        return
      }
      def firstGenre = this.genre?.getAt(0)

      List<Movie> allOtherMovies = Movie.where{
        id != this.id
        isNotEmpty("files")
        deleted != true
      }.list()

      result = allOtherMovies.max{ it.genre*.id?.intersect(this.genre*.id)?.size()}  //TODO: how big of a performance impact does this have for a large DB? need to test
    }

    if (this instanceof Episode) {
      if(this.show?.genre){
        TvShow tmp
        tmp=TvShow.find{ genre.id in (this.show?.genre.id) && id!=this.show.id && id > this.show.id}
        if(tmp == null){
          result = TvShow.find{ genre.id in (this.show?.genre.id) && id!=this.show.id && id < this.show.id}?.getFirstEpisode()
        }else{
          result = tmp?.getFirstEpisode()
        }
      }
    }

    return result
  }


  def getPosterPath(Integer width = 300){
    String TMDB_BASE_PATH = "https://image.tmdb.org/t/p/w${width}/"

    if(this instanceof Episode){
      return this.show?.getPosterPath()
    }else if(this instanceof GenericVideo){
      return this.poster_image?.getSrc()
    }

    if(this instanceof Movie && this.poster_image){
      return this.poster_image?.getSrc()
    }
    if(this.poster_path?.startsWith('http')){
      return this.poster_path
    }

    return TMDB_BASE_PATH + this.poster_path
  }


  File getDefaultVideoFile(){
    def videoFiles = getVideoFiles()
    if(!videoFiles){
      return
    }
    return videoFiles.find{it.isDefault} ?: videoFiles[0]
  }

  String getType(){
    if(this instanceof Movie){
      return 'movie'
    }
    if(this instanceof GenericVideo){
      return 'genericVideo'
    }
    if(this instanceof Episode){
      return 'episode'
    }
  }

  def getReleaseDate(){
    if(this instanceof Episode){
      return air_date
    }else{
      return release_date
    }
  }

  def inWatchlist(){
    User currentUser = springSecurityService.currentUser
    Profile profile = currentUser.getProfileFromRequest()
    return WatchlistEntry.where{
      user == currentUser
      profile == profile
      isDeleted == false
      video ==this
    }.count() > 0
  }
}
