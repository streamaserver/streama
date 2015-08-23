package streama

class Video {

  Date dateCreated
  Date lastUpdated

  String overview
  String apiId
  String original_language

  Double vote_average
  Integer vote_count
  Double popularity

  String imdb_id

  static hasMany = [files: File]

  static mapping = {
    cache true
    files cache: true
  }

  static constraints = {
    overview size: 1..5000

    dateCreated nullable: true
    lastUpdated nullable: true
  }
}
