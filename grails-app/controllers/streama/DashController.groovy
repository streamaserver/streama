package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*

class DashController {
  static responseFormats = ['json', 'xml']

  def springSecurityService
  def videoService
  def mediaService

  def listContinueWatching(){
    User currentUser = springSecurityService.currentUser
    Long profileId = request.getHeader('profileId')?.toLong()
    Profile profile = Profile.findById(profileId)
    respond videoService.listContinueWatching(currentUser, profile, params)
  }

  def listShows(){
    JSON.use ('dashTvShow') {
      respond videoService.listShows(params, [:])
    }
  }

  def listEpisodesForShow(TvShow tvShow) {
    respond tvShow.getFilteredEpisodes()
  }

  def listRecommendations() {
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
    result = movies + tvShows*.getFirstEpisode()

    JSON.use ('dashViewingStatus') {
      render (result as JSON)
    }
  }

  def firstEpisodeForShow(TvShow tvShow) {
    Episode firstEpisode = tvShow.getFirstEpisode()
    if(firstEpisode){
      respond firstEpisode
    }else{
      respond status: NOT_FOUND
    }
  }

  def randomEpisodeForShow(TvShow tvShow) {
    Episode randomEpisode = mediaService.getRandomEpisode(tvShow)
    if (randomEpisode) {
      respond randomEpisode
    } else {
      respond status: NOT_FOUND
    }
  }

  def listMovies(){
    JSON.use('dashMovies'){
      respond videoService.listMovies(params, [:])
    }
  }

  def listGenericVideos(){
    List<Long> genreIds = params.list('genreId')*.toLong() ?: []
    Profile currentProfile = User.getProfileFromRequest()
    if(currentProfile?.isChild){
      genreIds += Genre.findAllByNameInList(['Kids', 'Family'])*.id
    }

    def genericVideoQuery = GenericVideo.where {
      deleted != true
      isNotEmpty("files")
      if(genreIds){
        genre{
          id in genreIds
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

    def movies = Movie.where{
      deleted != true
      title =~ "%${query}%"
    }.list()

    def tvShows = TvShow.where{
      deleted != true
      name =~ "%${query}%"
    }.list()

    def result = [
        shows: tvShows,
        movies: movies
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
    List<Long> genreIds
    Profile currentProfile = User.getProfileFromRequest()
    if(currentProfile?.isChild){
      genreIds = Genre.findAllByNameInList(['Kids', 'Family'])*.id
    }
    List<NotificationQueue> newReleasesList = NotificationQueue.where{
      type == 'newRelease'

      if(genreIds){
        or{
          tvShow{
            genre{
              'in'('id', genreIds)
            }
          }
          movie{
            genre{
              'in'('id', genreIds)
            }
          }
        }
      }
    }.list()
    newReleasesList = newReleasesList.sort { new Random(System.nanoTime()) }

    JSON.use('dashMovies'){
      respond newReleasesList
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

  def continueWatching(TvShow tvShow){
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
      result = tvShow.getFirstEpisode()
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
