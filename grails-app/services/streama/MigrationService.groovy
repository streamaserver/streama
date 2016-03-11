package streama

import grails.transaction.Transactional

@Transactional
class MigrationService {

  def theMovieDbService

  def setDefaultDeletedFlag() {
    def videos = Video.findAllByDeletedIsNull()

    videos.each{
      it.deleted = false
      it.save(failOnError: true)
    }
  }

  def setTrailerForMovies() {
    def movies = Movie.findAllByTrailerKeyIsNull()

    movies.each{
      def trailer
      try{
        trailer = theMovieDbService.getTrailerForMovie(it.apiId)
      }catch (e){}
      it.trailerKey = trailer?.key
      it.save(failOnError: true)
    }
  }


  def importMovieDbGenres(){
    def movieGenres = theMovieDbService.getMovieGenres()
    def tvGenres = theMovieDbService.getTvGenres()
    def genres = movieGenres + tvGenres

    genres.each{
      if(Genre.findByApiId(it.apiId)){
        return
      }

      Genre genre = new Genre()
      genre.name = it.name
      genre.apiId = it.apiId
      genre.save(failOnError: true)
    }

    return genres
  }


  def addGenresToMoviesAndShows(){
    def movies = Movie.list()

    movies.each{ movie ->
      if(movie.genre){
        return
      }

      def metaData = movie.fullMovieMeta
      if(!metaData?.genres){
        return
      }

      metaData?.genres.each{ metaGenre ->
        log.info("genre: " + metaGenre.name + " for movie " + movie.title)
        Genre genre = Genre.findByApiId(metaGenre.id)
        if(!genre){
          log.error("Genre missing!: " + metaGenre.name)
          return
        }
        movie.addToGenre(genre)
      }

      movie.save(failOnError: true)
    }

    def tvShows = TvShow.list()

    tvShows.each{ tvShow ->
      if(tvShow.genre || !tvShow.apiId){
        return
      }
      def metaData = tvShow.fullTvShowMeta
      if(!metaData?.genres){
        return
      }

      metaData?.genres.each{ metaGenre ->
        log.info("genre: " + metaGenre.name + " for tvShow " + tvShow.name)
        Genre genre = Genre.findByApiId(metaGenre.id)

        if(!genre){
          log.error("Genre missing!: " + metaGenre.name)
          return
        }

        tvShow.addToGenre(genre)
      }

      tvShow.save(failOnError: true)
    }
  }
}
