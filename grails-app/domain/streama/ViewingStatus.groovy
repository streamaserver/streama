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
  Boolean isActive = true
  Profile profile

  static Integer COMPLETED_PERCENTAGE_THRESHOLD = 95

  static mapping = {
    cache true
    video cache: true
    tvShow cache: true
    user cache: true
  }

  static constraints = {
    dateCreated nullable: true
    lastUpdated nullable: true
    currentPlayTime nullable: false
    video nullable: false
  }

  Double calculateCompletionPercentage(){
    if(!currentPlayTime || !runtime){
      return 0
    }
    return (currentPlayTime/runtime) * 100
  }

  Boolean hasVideoEnded(){
    (calculateCompletionPercentage() >= ViewingStatus.COMPLETED_PERCENTAGE_THRESHOLD)
  }

}
