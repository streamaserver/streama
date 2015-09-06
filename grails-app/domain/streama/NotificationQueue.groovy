package streama

class NotificationQueue {

  Date dateCreated
  Date lastUpdated

  Boolean isCompleted = false

  Movie movie
  TvShow tvShow

  String description

  static constraints = {
  }
}
