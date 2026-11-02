package streama

import streama.traits.SimpleInstance
import java.security.SecureRandom
import org.hibernate.Criteria

class TvShow implements SimpleInstance {

  transient springSecurityService
  transient theMovieDbService

  Boolean deleted = false
  Boolean manualInput = false

  Date dateCreated
  Date lastUpdated

  String name
  String overview
  String apiId

  String backdrop_path
  String poster_path
  String first_air_date
  String original_language
  String imdb_id

  Double vote_average
  Integer vote_count
  Double popularity
  static hasMany = [episodes: Episode, genre: Genre]

  File poster_image
  File backdrop_image

  static mapping = {
    cache true
    episodes cache: true
    overview type: 'text'
  }

  static constraints = {
    name nullable: false
    overview size: 1..5000
  }

  List<Episode> getFilteredEpisodes() {
    List filteredEpisodes = Episode.findAllByShowAndDeletedNotEqual(this, true)
    return filteredEpisodes
  }

//  def getEpisodes(){
//    return this.getFilteredEpisodes()
//  }

  def getExternalLinks() {
    theMovieDbService.getExternalLinks(this.apiId)
  }

  def getHasFiles() {
    return (this.episodes?.find { it.files } ? true : false)
  }

  def getFullTvShowMeta() {
    try {
      return theMovieDbService.getFullTvShowMeta(this.apiId)
    }catch (e) {
      log.warn("couldnt get FullTvShowMeta for ${this.apiId}")
      log.warn(e.message)
      return null
    }
  }

  def inWatchlist() {
    User currentUser = springSecurityService.currentUser
    Profile profile = currentUser.getProfileFromRequest()
    return WatchlistEntry.where {
      user == currentUser
      profile == profile
      tvShow == this
      isDeleted == false
    }.count() > 0
  }

  List<Episode> listEpisodesWithFiles() {
    return this.episodes?.findAll { it.files && it.season_number != '0' } as List
  }

  def getFirstEpisode() {
    return listEpisodesWithFiles().min { it.seasonEpisodeMerged }
  }

  def getPosterPath(Integer width = 300){
    if(this.poster_image){
      return this.poster_image.src
    }
    if(!this.poster_path){
      return
    }
    String TMDB_BASE_PATH = "https://image.tmdb.org/t/p/w${width}/"
    if(this.poster_path?.startsWith('http')){
      return this.poster_path
    }
    return TMDB_BASE_PATH + this.poster_path
  }

}
