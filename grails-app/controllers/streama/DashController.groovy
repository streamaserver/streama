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


  def firstEpisodeForShow(TvShow tvShow){
    Episode firstEpisode = tvShow.episodes?.find{it.files && it.season_number != "0"}

    tvShow.episodes.each{ Episode episode ->
      if((episode.season_number == firstEpisode?.season_number) && (episode.episode_number < firstEpisode?.episode_number) && episode.files){
        firstEpisode = episode
      }
      else if(episode.season_number < firstEpisode?.season_number && episode.files && episode.season_number != "0"){
        firstEpisode = episode
      }
    }

    if(firstEpisode && firstEpisode.files){
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
      respond NotificationQueue.findAllByType('newRelease')
    }
  }
}
