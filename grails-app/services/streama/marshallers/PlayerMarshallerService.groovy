package streama.marshallers

import grails.converters.JSON
import grails.transaction.Transactional
import streama.Episode
import streama.GenericVideo
import streama.Movie
import streama.Video
import streama.ViewingStatus

@Transactional
class PlayerMarshallerService {

  def springSecurityService

  def init() {
    JSON.createNamedConfig('player') { cfg ->
      cfg.registerObjectMarshaller(Video) { Video video ->
        def returnArray = [:]

        returnArray['id'] = video.id
        returnArray['dateCreated'] = video.dateCreated
        returnArray['lastUpdated'] = video.lastUpdated
        returnArray['overview'] = video.overview
        returnArray['imdb_id'] = video.imdb_id
        returnArray['vote_average'] = video.vote_average
        returnArray['vote_count'] = video.vote_count
        returnArray['popularity'] = video.popularity
        returnArray['original_language'] = video.original_language
        returnArray['apiId'] = video.apiId

        returnArray['files'] = video.files.findAll { it.extension != '.srt' && it.extension != '.vtt' }
        returnArray['subtitles'] = video.files.findAll { it.extension == '.srt' || it.extension == '.vtt' }

        returnArray['hasFiles'] = video.hasFiles()

        returnArray['viewedStatus'] = ViewingStatus.findByVideoAndUser(video, springSecurityService.currentUser)

        if (video instanceof Episode) {
          returnArray['show'] = video.show
          returnArray['episodeString'] = video.episodeString
          returnArray['name'] = video.name
          returnArray['air_date'] = video.air_date
          returnArray['season_number'] = video.season_number
          returnArray['episode_number'] = video.episode_number
          returnArray['still_path'] = video.still_path
          returnArray['intro_start'] = video.intro_start
          returnArray['intro_end'] = video.intro_end
          returnArray['outro_start'] = video.outro_start
          Video nextEpisode

          nextEpisode = video.show.episodes?.find {
            return (it.episode_number == video.episode_number + 1 && it.season_number == video.season_number)
          }
          if (!nextEpisode) {
            video.show.episodes?.find {
              return (it.season_number == video.season_number + 1 && it.episode_number == 1)
            }
          }

          if (nextEpisode && nextEpisode.files) {
            returnArray['nextEpisode'] = [id: nextEpisode?.id]
          }
        }
        if (video instanceof Movie) {
          returnArray['title'] = video.title
          returnArray['release_date'] = video.release_date
          returnArray['backdrop_path'] = video.backdrop_path
          returnArray['poster_path'] = video.poster_path
          returnArray['trailerKey'] = video.trailerKey

        }
        if (video instanceof GenericVideo) {
          returnArray['title'] = video.title
          returnArray['release_date'] = video.release_date
          returnArray['backdrop_image_src'] = video.backdrop_image?.src
          returnArray['poster_image_src'] = video.poster_image?.src
        }

        return returnArray;
      }
    }

  }
}
