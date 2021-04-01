package streama

class GenericVideo extends Video{

  String title
  String release_date

  File poster_image
  File backdrop_image

  String trailerKey

  static hasMany = [tags: Tag, genre: Genre]

  static constraints = {

  }

  static mapping = {
    cache true
  }
}
