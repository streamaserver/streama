package streama

class TvShow {

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

  def getExternalLinks(){
    theMovieDbService.getExternalLinks(this.apiId)
  }

  def getHasFiles(){
    return (this.episodes?.find{it.files} ? true : false)
  }

  def getFullTvShowMeta(){
    return theMovieDbService.getFullTvShowMeta(this.apiId)
  }


  def getFirstEpisode(){
    Episode firstEpisode = this.episodes?.find{it.files && it.season_number != "0"}

    this.episodes.each{ Episode episode ->
      if((episode.season_number == firstEpisode?.season_number) && (episode.episode_number < firstEpisode?.episode_number) && episode.files){
        firstEpisode = episode
      }
      else if(episode.season_number < firstEpisode?.season_number && episode.files && episode.season_number != "0"){
        firstEpisode = episode
      }
    }

    if(firstEpisode && firstEpisode.files){
      return firstEpisode
    }
  }
}
