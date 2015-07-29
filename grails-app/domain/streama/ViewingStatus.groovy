package streama

/**
 * Created by antonia on 23/07/15.
 */
class ViewingStatus {

  Date dateCreated
  Date lastUpdated
  
  Video video
  TvShow tvShow
  User user
  Integer currentPlayTime
  Integer runtime
  Boolean completed = false


  static constraints = {
    dateCreated nullable: true
    lastUpdated nullable: true
    currentPlayTime nullable: false
    video nullable: false
  }
}
