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
}
