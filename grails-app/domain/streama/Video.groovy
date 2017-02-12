package streama

class Video {

  def springSecurityService

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
}
