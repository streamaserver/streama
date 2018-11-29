package streama.marshallers

import grails.converters.JSON
import grails.transaction.Transactional
import org.grails.web.util.WebUtils
import streama.Episode
import streama.File
import streama.GenericVideo
import streama.Movie
import streama.Profile
import streama.Video
import streama.ViewingStatus

@Transactional
class PlayerMarshallerService {

  def springSecurityService

  def init() {
    JSON.createNamedConfig('player') { cfg ->
      cfg.registerObjectMarshaller(Video) { Video video ->
        def returnArray = [:]

        def request = WebUtils.retrieveGrailsWebRequest()?.getCurrentRequest()
        def profileId = request.getHeader("profileId")
        Profile profile = Profile.findById(profileId)

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

        returnArray['files'] = video.files.findAll { it.extension != '.srt' && it.extension != '.vtt' }*.getSimpleInstance()
        returnArray['subtitles'] = video.files.findAll { it.extension == '.srt' || it.extension == '.vtt' }*.getSimpleInstance()

        returnArray['hasFiles'] = video.hasFiles()

        returnArray['viewedStatus'] = ViewingStatus.findByVideoAndUserAndProfile(video, springSecurityService.currentUser, profile)
        returnArray['outro_start'] = video.outro_start ? video.outro_start * 60 : null  //convert to seconds

        if (video instanceof Episode) {
          returnArray['mediaType'] = 'episode'
          returnArray['show'] = video.show?.getSimpleInstance(['imdb_id', 'apiId'])
          returnArray['episodeString'] = video.episodeString
          returnArray['name'] = video.name
          returnArray['air_date'] = video.air_date
          returnArray['season_number'] = video.season_number
          returnArray['episode_number'] = video.episode_number
          returnArray['still_path'] = video.buildImagePath('still_path', 1280)
          returnArray['intro_start'] = video.intro_start
          returnArray['intro_end'] = video.intro_end

          Video nextEpisode = video.getNextEpisode()
          if (nextEpisode && nextEpisode.files) {
            returnArray['nextEpisode'] = nextEpisode?.getSimpleInstance()
          }else{
            returnArray['nextVideo'] = video.suggestNextVideo()?.getSimpleInstance()
          }
        }
        if (video instanceof Movie) {
          returnArray['mediaType'] = 'movie'
          returnArray['title'] = video.title
          returnArray['release_date'] = video.release_date
          returnArray['backdrop_path'] = video.buildImagePath('backdrop_path', 1280)
          returnArray['poster_path'] = video.poster_path
          returnArray['trailerKey'] = video.trailerKey
          returnArray['nextVideo'] = video.suggestNextVideo()?.getSimpleInstance()

        }
        if (video instanceof GenericVideo) {
          returnArray['mediaType'] = 'genericVideo'
          returnArray['title'] = video.title
          returnArray['release_date'] = video.release_date
          returnArray['backdrop_image_src'] = video.backdrop_image?.src
          returnArray['poster_image_src'] = video.poster_image?.src
        }

        return returnArray;
      }


      cfg.registerObjectMarshaller(File) { File file ->
        def returnArray = [:]

        returnArray['id'] = file.id
        returnArray['name'] = file.name
        returnArray['sha256Hex'] = file.sha256Hex
        returnArray['src'] = file.getSrc()
        returnArray['externalLink'] = file.externalLink
        returnArray['localFile'] = file.localFile
        returnArray['originalFilename'] = file.originalFilename
        returnArray['extension'] = file.extension
        returnArray['contentType'] = file.contentType
        returnArray['size'] = file.size
        returnArray['dateCreated'] = file.dateCreated
        returnArray['quality'] = file.quality
        returnArray['subtitleLabel'] = file.subtitleLabel
        returnArray['subtitleSrcLang'] = file.subtitleSrcLang


        return returnArray;
      }
    }

  }
}
