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


  static constraints = {
    overview sqlType:"text"

    dateCreated nullable: true
    lastUpdated nullable: true
  }
}
