package streama.marshallers

import grails.converters.JSON
import grails.transaction.Transactional
import streama.*

@Transactional
class MediaDetailMarshallerService {

  def springSecurityService
  def settingsService
  def mediaService

  def init() {
    JSON.createNamedConfig('mediaDetail') {  cfg ->
      cfg.registerObjectMarshaller(TvShow) { TvShow  tvShow ->
        def result = [:]

        result['id'] = tvShow.id
        result['dateCreated'] = tvShow.dateCreated
        result['lastUpdated'] = tvShow.lastUpdated
        result['name'] = tvShow.name
        result['overview'] = tvShow.overview
        result['apiId'] = tvShow.apiId
        result['backdrop_path'] = tvShow.backdrop_path
        result['poster_path'] = tvShow.poster_path
        result['first_air_date'] = tvShow.first_air_date
        result['original_language'] = tvShow.original_language
        result['vote_average'] = tvShow.vote_average
        result['vote_count'] = tvShow.vote_count
        result['imdb_id'] = tvShow.imdb_id
        result['popularity'] = tvShow.popularity
        result['episodesWithFilesCount'] = tvShow.episodes.findAll{it.files}.size()
        result['episodesCount'] = tvShow.episodes.size()
        result['manualInput'] = tvShow.manualInput
        result['poster_image_src'] = tvShow.poster_image?.src
        result['genre'] = tvShow.genre

        return result
      }
    }

  }
}
