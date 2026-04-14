package streama

import grails.converters.JSON
import grails.transaction.Transactional
import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)
class MovieShowController {

  def theMovieDbService
  def taggingService
  def videoService
  static responseFormats = ['json', 'xml']

  def show(MovieShow movieShowInstance) {
    if(movieShowInstance == null){
      render status: NOT_FOUND
      return
    }

    def apiResponse = [
      id: movieShowInstance.id,
      title: movieShowInstance.title,
      original_title: movieShowInstance.originalTitle,
      overview: movieShowInstance.overview,
      tagline: movieShowInstance.tagline,
      release_date: movieShowInstance.releaseDate,
      backdrop_path: movieShowInstance.backdropPath,
      poster_path: movieShowInstance.posterPath,
      vote_average: movieShowInstance.voteAverage,
      genre: movieShowInstance.genre,
      type: movieShowInstance.type,
      currentVolume: movieShowInstance.currentVolume,
      apiId: movieShowInstance.apiId,
      imdb_id: movieShowInstance.imdbId,
      status: movieShowInstance.status,
      percentage_complete: movieShowInstance.percentageComplete,
      firstAired: movieShowInstance.firstAired,
      language: movieShowInstance.language,
      addedBy: movieShowInstance.addedBy,
      apiBackdrop16x9: movieShowInstance.apiBackdrop16x9,
      apiPosterThumb: movieShowInstance.apiPosterThumb,
    ]

    def actorMapping = movieShowInstance.actorMappings
    def actors = actorMapping.collect { actorMappingInstance ->
      def actor = actorMappingInstance.actor
      def character = actorMappingInstance.character
      def profilePath = actor.profilePath
      def tmdbId = actor.tmdbId
      return [
        id: actor.id,
        name: actor.name,
        character: character,
        profile_path: profilePath,
        tmdb_id: tmdbId
      ]
    }
    apiResponse.actors = actors

    if(params.get('flat') == 'true'){
      params.remove('flat')
      render apiResponse as JSON
      return
    }
    respond apiResponse
  }
}
