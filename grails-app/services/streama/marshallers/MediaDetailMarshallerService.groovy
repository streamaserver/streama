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
        result['mediaType'] = 'tvShow'
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

      cfg.registerObjectMarshaller(Movie) { Movie  movie ->
        def result = [:]

        result['id'] = movie.id
        result['mediaType'] = 'movie'
        result['dateCreated'] = movie.dateCreated
        result['lastUpdated'] = movie.lastUpdated
        result['poster_path'] = movie.poster_path
        result['release_date'] = movie.release_date
        result['title'] = movie.title
        result['overview'] = movie.overview
        result['apiId'] = movie.apiId
        result['original_language'] = movie.original_language
        result['vote_average'] = movie.vote_average
        result['vote_count'] = movie.vote_count
        result['popularity'] = movie.popularity
        result['imdb_id'] = movie.imdb_id
        result['poster_image_src'] = movie.poster_image?.src
        result['genre'] = movie.genre

        result['files'] = movie.files.findAll{it.extension != '.srt' && it.extension != '.vtt'}
        result['subtitles'] = movie.files.findAll{it.extension == '.srt' || it.extension == '.vtt'}

        result['hasFiles'] = movie.hasFiles()
        return result
      }

      cfg.registerObjectMarshaller(Episode) { Episode  episode ->
        def result = [:]

        result['id'] = episode.id
        result['mediaType'] = 'episode'
        result['dateCreated'] = episode.dateCreated
        result['lastUpdated'] = episode.lastUpdated
        result['backdrop_path'] = episode.still_path
        result['release_date'] = episode.air_date
        result['title'] = episode.title
        result['overview'] = episode.overview
        result['apiId'] = episode.apiId
        result['original_language'] = episode.original_language
        result['vote_average'] = episode.vote_average
        result['vote_count'] = episode.vote_count
        result['popularity'] = episode.popularity
        result['imdb_id'] = episode.imdb_id

        result['files'] = episode.files.findAll{it.extension != '.srt' && it.extension != '.vtt'}
        result['subtitles'] = episode.files.findAll{it.extension == '.srt' || it.extension == '.vtt'}

        result['hasFiles'] = episode.hasFiles()
        result['tvShow'] = episode.show
        return result
      }
    }

  }
}
