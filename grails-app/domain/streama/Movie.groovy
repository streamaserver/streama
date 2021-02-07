package streama

class Movie extends Video{

  transient theMovieDbService


  String title
  String release_date

  String backdrop_path
  String poster_path
  String trailerKey
  File poster_image
  File backdrop_image


  static hasMany = [tags: Tag, genre: Genre]

  static constraints = {
  }

  static mapping = {
    cache true
  }

  def getSimilarMovies(){
    if(!this.apiId){
      return
    }
    theMovieDbService.getSimilarMovies(this.apiId)
  }

  def getFullMovieMeta(){
    if(!this.apiId){
      return
    }
    theMovieDbService.getFullMovieMeta(this.apiId)
  }

}
