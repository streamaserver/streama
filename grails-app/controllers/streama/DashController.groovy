package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*

class DashController {
  static responseFormats = ['json', 'xml']

  def springSecurityService
  def videoService

  def listContinueWatching(){
    User currentUser = springSecurityService.currentUser

    List<ViewingStatus> viewingStatusList = videoService.listContinueWatching(currentUser)

    return [viewingStatusList: viewingStatusList]
  }


  def listShows(){
    def max = params.int('max', 50)
    def offset = params.int('offset', 0)
    def sort = params.sort
    def order = params.order

    def tvShowQuery = TvShow.where{
      def tv1 = TvShow
      deleted != true
      exists Episode.where{
        def ep = Episode
        def tv2 = show
        tv1.id == tv2.id
        isNotEmpty("files")
      }.id()

    }

    def tvShows = tvShowQuery.list(max: max, offset: offset, sort: sort, order: order)
    def totalTvShowsCount = tvShowQuery.count()

    def result = [total: totalTvShowsCount, list: tvShows]

    JSON.use ('dashTvShow') {
      respond result
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
    def max = params.int('max', 50)
    def offset = params.int('offset', 0)
    def sort = params.sort
    def order = params.order

    def movieQuery = Movie.where {
      deleted != true
      isNotEmpty("files")
    }
    def movies =  movieQuery.list(max: max, offset: offset, sort: sort, order: order)
    def totalMovieCount = movieQuery.count()

    def result = [total: totalMovieCount, list: movies]

    JSON.use('dashMovies'){
      respond result
    }
  }


  def listGenericVideos(){
    def videos = GenericVideo.where {
      deleted != true
      isNotEmpty("files")
    }.list()

    JSON.use('dashGenericVideo'){
      render (videos as JSON)
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
    respond Genre.list()
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
