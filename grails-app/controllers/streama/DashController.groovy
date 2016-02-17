package streama

import grails.converters.JSON

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
      eq("completed", false)
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

  def listMovies(){
    def movies = Movie.withCriteria {
      ne("deleted", true)
      isNotEmpty("files")
    }

    JSON.use('dashMovies'){
      respond movies
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
}
