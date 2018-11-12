package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*

class DashController {
  static responseFormats = ['json', 'xml']

  def springSecurityService
  def videoService

  def listContinueWatching(){
    User currentUser = springSecurityService.currentUser
    Long profileId = request.getHeader('profileId')?.toLong()
    Profile profile = Profile.findById(profileId)

    List<ViewingStatus> viewingStatusList = videoService.listContinueWatching(currentUser, profile)

    return [viewingStatusList: viewingStatusList]
  }


  def listShows(){
    JSON.use ('dashTvShow') {
      respond videoService.listShows(params, [:])
    }
  }


  def listEpisodesForShow(TvShow tvShow){
    respond tvShow.getFilteredEpisodes()
  }



  def listRecommendations(){
    User currentUser = springSecurityService.currentUser
    List<Video> result = []
    def favoriteGenreNames = currentUser.favoriteGenres*.name

    if(!favoriteGenreNames){
      render status: NO_CONTENT
      return
    }
    def movies = Movie.where{
      genre{
        name in favoriteGenreNames
      }
      deleted != true
    }.list().findAll{it.hasFiles()}

    def tvShows = TvShow.where{
      genre{
        name in favoriteGenreNames
      }
      episodes.size() > 0
      deleted != true
    }.list()
    result = movies + tvShows*.firstEpisode

    JSON.use ('dashViewingStatus') {
      render (result as JSON)
    }
  }


  def firstEpisodeForShow(TvShow tvShow){
    Episode firstEpisode = tvShow.firstEpisode
    if(firstEpisode){
      respond firstEpisode
    }else{
      respond status: NOT_FOUND
    }
  }

  def listMovies(){
    JSON.use('dashMovies'){
      respond videoService.listMovies(params, [:])
    }
  }


  def listGenericVideos(){
    def genreId = params.long('genreId')

    def genericVideoQuery = GenericVideo.where {
      deleted != true
      isNotEmpty("files")
      if(genreId){
        genre{
          id == genreId
        }
      }
    }
    def sort = params.sort
    def order = params.order

    def videos = genericVideoQuery.list(sort: sort, order: order)
    def total = genericVideoQuery.count()

    def result = [total: total, list: videos]

    JSON.use('dashGenericVideo'){
      render (result as JSON)
    }
  }

  def searchMedia() {
    String query = params.query
    def movies = Movie.findAllByDeletedNotEqual(true)
    def shows = TvShow.findAllByDeletedNotEqual(true)


    def result = [
        shows:shows.findAll{it.name.toLowerCase().contains(query.toLowerCase())},
        movies:movies.findAll{it.title.toLowerCase().contains(query.toLowerCase())}
    ]
    respond result
  }


  def listGenres(){
    def genres = Genre.list()
    genres = genres.findAll{Genre currentGenre ->
      def isUsedForMovie = Movie.where{genre{id == currentGenre.id}}.count() > 0
      def isUsedForTvShow = TvShow.where{genre{id == currentGenre.id}}.count() > 0
      def isUsedForGenericVideo = GenericVideo.where{genre{id == currentGenre.id}}.count() > 0
      return (isUsedForMovie || isUsedForTvShow || isUsedForGenericVideo)
    }
    respond genres
  }

  def listNewReleases(){
    JSON.use('dashMovies'){
      respond NotificationQueue.findAllByType('newRelease').sort{new Random(System.nanoTime())}
    }
  }


  def mediaDetail(){
    log.debug(params.mediaType)
    log.debug(params.id)
    Integer id = params.int('id')
    def media

    if(params.mediaType == 'movie'){
      media = Movie.get(id)
    }
    if(params.mediaType == 'tvShow'){
      media = TvShow.get(id)
    }
    if(params.mediaType == 'episode'){
      media = Episode.get(id)
    }
    if(params.mediaType == 'genericVideo'){
      media = GenericVideo.get(id)
    }
    if(!media){
      render status: NOT_FOUND
      return
    }

    JSON.use('mediaDetail'){
      render (media as JSON)
    }
  }


  def cotinueWatching(TvShow tvShow){
    def result

    if(!tvShow){
      render status: NOT_FOUND
      return
    }

    User currentUser = springSecurityService.currentUser
    ViewingStatus viewingStatus = ViewingStatus.withCriteria {
      eq("user", currentUser)
      eq("tvShow", tvShow)
      video {
        isNotEmpty("files")
        ne("deleted", true)
      }
//      eq("completed", false)
      order("lastUpdated", "desc")
    }?.getAt(0)

    if(viewingStatus?.video){
      result = viewingStatus?.video
    }else{
      result = tvShow.firstEpisode
    }
    JSON.use('mediaDetail'){
      render (result as JSON)
    }
  }

  def markAsCompleted(Video video){
    ViewingStatus.where{
      video == video
    }.deleteAll()
    render "OK"
  }
}
