package streama

class NotificationQueue {

  Date dateCreated
  Date lastUpdated

  Boolean isCompleted = false

  Movie movie
  TvShow tvShow
  Video videoToPlay

  String description
  String type //notification or newRelease

  static constraints = {
  }
}
