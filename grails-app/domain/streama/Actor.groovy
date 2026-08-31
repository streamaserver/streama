package streama

class Actor {

  String name
  String imdbId
  String bio
  Date dateCreated
  Date lastUpdated

  static hasMany = [movies: ActorMapping]

  static constraints = {
    name blank: false
    imdbId nullable: true
    bio nullable: true, maxSize: 2000
  }
}
