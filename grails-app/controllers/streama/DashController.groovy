package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*

class DashController {

  def springSecurityService

  def listContinueWatching(){
    User currentUser = springSecurityService.currentUser

    def continueWatching = ViewingStatus.withCriteria {
      eq("user", currentUser)
      video{
        isNotEmpty("files")
        ne("deleted", true)
      }
//      eq("completed", false)
      order("lastUpdated", "desc")
    }

    JSON.use ('dashViewingStatus') {
      respond continueWatching
    }
  }

  def listShows(){
    def tvShows = TvShow.withCriteria{
      ne("deleted", true)
      isNotEmpty("episodes")
    }

    tvShows = tvShows.findAll{ tvShow->
      return tvShow.hasFiles
    }

    JSON.use ('dashTvShow') {
      respond tvShows
    }
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
    def movies = Movie.withCriteria {
      ne("deleted", true)
      isNotEmpty("files")
    }

    JSON.use('dashMovies'){
      respond movies
    }
  }


  def listGenericVideos(){
    def videos = GenericVideo.withCriteria {
      ne("deleted", true)
      isNotEmpty("files")
    }

    JSON.use('dashGenericVideo'){
      respond videos
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
}
