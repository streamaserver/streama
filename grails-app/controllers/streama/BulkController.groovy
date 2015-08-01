package streama

class BulkController {

  static responseFormats = ['json', 'xml']

  def fetchImdbIdForAllMoviesAndShow() {
    def movies = Movie.list()
    def tvShows = TvShow.list()

    movies.each{ movie ->
      movie.imdb_id = movie.fullMovieMeta?.imdb_id
      movie.save failOnError: true
    }
    tvShows.each{ tvShow ->
      tvShow.imdb_id = tvShow.externalLinks?.imdb_id
      tvShow.save failOnError: true
    }

    render (view: "/message", model: [title: "Success!", message: "Done fetching & saving IMDb ids for $tvShows.size Shows and $movies.size Movies."])
  }
}
