package streama

class Movie extends Video{

  transient theMovieDbService


  String title
  String release_date

  String backdrop_path
  String poster_path

  static constraints = {
  }


  def getSimilarMovies(){
    theMovieDbService.getSimilarMovies(this.apiId)
  }

  def getFullMovieMeta(){
    theMovieDbService.getFullMovieMeta(this.apiId)
  }

}
