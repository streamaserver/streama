package streama


import grails.converters.JSON
import grails.transaction.Transactional
import org.codehaus.groovy.grails.web.converters.configuration.DefaultConverterConfiguration

@Transactional
class MarshallerService {

  def springSecurityService
  def settingsService
  def mediaService

  def init() {

    JSON.registerObjectMarshaller(User) {  User user ->
      def returnArray = [:]

      returnArray['id'] = user.id
      returnArray['username'] = user.username
      returnArray['authorities'] = user.authorities
      returnArray['enabled'] = user.enabled
      returnArray['dateCreated'] = user.dateCreated
      returnArray['fullName'] = user.fullName
      returnArray['invitationSent'] = user.invitationSent
      returnArray['language'] = user.language
      returnArray['favoriteGenres'] = user.favoriteGenres
      returnArray['isAdmin'] = (user.authorities.find{it.authority == 'ROLE_ADMIN'} ? true : false)
      returnArray['isContentManager'] = (user.authorities.find{it.authority == 'ROLE_CONTENT_MANAGER'} ? true : false)
      returnArray['pauseVideoOnClick'] = user.pauseVideoOnClick

      if(user.invitationSent && user.uuid){
        returnArray['invitationLink'] = settingsService.baseUrl +  "/invite?uuid=${user?.uuid}"
      }

      return returnArray;
    }

    JSON.registerObjectMarshaller(File) {  File file ->
      def returnArray = [:]

      returnArray['id'] = file.id
      returnArray['name'] = file.name
      returnArray['sha256Hex'] = file.sha256Hex
      returnArray['src'] = file.getSrc()
      returnArray['externalLink'] = file.externalLink
      returnArray['originalFilename'] = file.originalFilename
      returnArray['extension'] = file.extension
      returnArray['contentType'] = file.contentType
      returnArray['size'] = file.size
      returnArray['dateCreated'] = file.dateCreated
      returnArray['quality'] = file.quality

      return returnArray;
    }

    JSON.registerObjectMarshaller(NotificationQueue) {  NotificationQueue notificationQueue ->
      def returnArray = [:]

      returnArray['id'] = notificationQueue.id
      returnArray['dateCreated'] = notificationQueue.dateCreated
      returnArray['movie'] = notificationQueue.movie
      returnArray['tvShow'] = notificationQueue.tvShow
      returnArray['media'] = notificationQueue.tvShow ? notificationQueue.tvShow : notificationQueue.movie
      returnArray['description'] = notificationQueue.description
      returnArray['videoToPlayId'] = notificationQueue.videoToPlay?.id
      returnArray['isCompleted'] = notificationQueue.isCompleted

      return returnArray;
    }

    JSON.registerObjectMarshaller(Movie){ Movie movie ->
      def returnArray = [:]

      returnArray['id'] = movie.id
      returnArray['mediaType'] = 'movie'
      returnArray['dateCreated'] = movie.dateCreated
      returnArray['lastUpdated'] = movie.lastUpdated
      returnArray['poster_path'] = movie.poster_path
      returnArray['release_date'] = movie.release_date
      returnArray['title'] = movie.title
      returnArray['overview'] = movie.overview
      returnArray['apiId'] = movie.apiId
      returnArray['original_language'] = movie.original_language
      returnArray['vote_average'] = movie.vote_average
      returnArray['vote_count'] = movie.vote_count
      returnArray['popularity'] = movie.popularity
      returnArray['imdb_id'] = movie.imdb_id
      returnArray['poster_image_src'] = movie.poster_image?.src

      returnArray['files'] = movie.files.findAll{it.extension != '.srt' && it.extension != '.vtt'}
      returnArray['subtitles'] = movie.files.findAll{it.extension == '.srt' || it.extension == '.vtt'}

      returnArray['hasFiles'] = movie.hasFiles()

//            returnArray['viewedStatus'] = ViewingStatus.findByVideoAndUser(movie, springSecurityService.currentUser)

      return returnArray;
    }

    JSON.registerObjectMarshaller(GenericVideo){ GenericVideo genericVideo ->
      def returnArray = [:]

      returnArray['id'] = genericVideo.id
      returnArray['isGenericVideo'] = true
      returnArray['mediaType'] = 'genericVideo'

      returnArray['dateCreated'] = genericVideo.dateCreated
      returnArray['lastUpdated'] = genericVideo.lastUpdated
      returnArray['overview'] = genericVideo.overview
      returnArray['imdb_id'] = genericVideo.imdb_id
      returnArray['vote_average'] = genericVideo.vote_average
      returnArray['vote_count'] = genericVideo.vote_count
      returnArray['popularity'] = genericVideo.popularity
      returnArray['original_language'] = genericVideo.original_language

      returnArray['title'] = genericVideo.title
      returnArray['release_date'] = genericVideo.release_date
      returnArray['poster_image_src'] = genericVideo.poster_image?.src
      returnArray['backdrop_image_src'] = genericVideo.backdrop_image?.src
      returnArray['trailerKey'] = genericVideo.trailerKey


      returnArray['files'] = genericVideo.files.findAll{it.extension != '.srt' && it.extension != '.vtt'}
      returnArray['subtitles'] = genericVideo.files.findAll{it.extension == '.srt' || it.extension == '.vtt'}
      returnArray['tags'] = genericVideo.tags
      returnArray['genre'] = genericVideo.genre
      returnArray['hasFiles'] = genericVideo.hasFiles()


      return returnArray;
    }

    JSON.registerObjectMarshaller(TvShow){ TvShow tvShow ->
      def returnArray = [:]

      returnArray['id'] = tvShow.id
      returnArray['mediaType'] = 'tvShow'
      returnArray['dateCreated'] = tvShow.dateCreated
      returnArray['lastUpdated'] = tvShow.lastUpdated
      returnArray['poster_path'] = tvShow.poster_path
      returnArray['backdrop_path'] = tvShow.backdrop_path
      returnArray['first_air_date'] = tvShow.first_air_date
      returnArray['name'] = tvShow.name
      returnArray['overview'] = tvShow.overview
      returnArray['apiId'] = tvShow.apiId
      returnArray['imdb_id'] = tvShow.imdb_id
      returnArray['original_language'] = tvShow.original_language
      returnArray['vote_average'] = tvShow.vote_average
      returnArray['vote_count'] = tvShow.vote_count
      returnArray['popularity'] = tvShow.popularity
      returnArray['manualInput'] = tvShow.manualInput
      returnArray['poster_image_src'] = tvShow.poster_image?.src


      returnArray['hasFiles'] = tvShow.getHasFiles()
      returnArray['firstEpisode'] = mediaService.getFirstEpisode(tvShow)

//            returnArray['viewedStatus'] = ViewingStatus.findByVideoAndUser(movie, springSecurityService.currentUser)

      return returnArray;
    }


    JSON.createNamedConfig('fullShow') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(TvShow) { TvShow  tvShow ->
        def returnArray = [:]

        returnArray['id'] = tvShow.id
        returnArray['dateCreated'] = tvShow.dateCreated
        returnArray['lastUpdated'] = tvShow.lastUpdated
        returnArray['name'] = tvShow.name
        returnArray['overview'] = tvShow.overview
        returnArray['apiId'] = tvShow.apiId
        returnArray['backdrop_path'] = tvShow.backdrop_path
        returnArray['poster_path'] = tvShow.poster_path
        returnArray['first_air_date'] = tvShow.first_air_date
        returnArray['original_language'] = tvShow.original_language
        returnArray['vote_average'] = tvShow.vote_average
        returnArray['vote_count'] = tvShow.vote_count
        returnArray['imdb_id'] = tvShow.imdb_id
        returnArray['popularity'] = tvShow.popularity
        returnArray['episodesWithFilesCount'] = tvShow.episodes.findAll{it.files}.size()
        returnArray['episodesCount'] = tvShow.episodes.size()
        returnArray['manualInput'] = tvShow.manualInput
        returnArray['poster_image_src'] = tvShow.poster_image?.src
        returnArray['genre'] = tvShow.genre

        return returnArray;
      }
    }


    JSON.createNamedConfig('dashViewingStatus') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(ViewingStatus) { ViewingStatus  viewingStatus ->
        def returnArray = [:]

        returnArray['id'] = viewingStatus.id
        returnArray['dateCreated'] = viewingStatus.dateCreated
        returnArray['lastUpdated'] = viewingStatus.lastUpdated
        returnArray['video'] = viewingStatus.video
        returnArray['currentPlayTime'] = viewingStatus.currentPlayTime
        returnArray['runtime'] = viewingStatus.runtime

        return returnArray;
      }
      cfg.registerObjectMarshaller(Video) { Video  video ->
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

        if(video instanceof Movie){
          returnArray['title'] = video.title
          returnArray['release_date'] = video.release_date
          returnArray['poster_path'] = video.poster_path
          returnArray['mediaType'] = 'movie'
        }
        if(video instanceof GenericVideo){
          returnArray['title'] = video.title
          returnArray['release_date'] = video.release_date
          returnArray['poster_image_src'] = video.poster_image?.src
          returnArray['mediaType'] = 'genericVideo'
        }

        if(video instanceof Episode){
          returnArray['isEpisode'] = true
          returnArray['title'] = video.show?.name
          returnArray['poster_path'] = video.show?.poster_path
          returnArray['episodeString'] = video.episodeString
          returnArray['tvShowId'] = video.show?.id
          returnArray['mediaType'] = 'tvShow'
          returnArray['intro_start'] = video.intro_start
          returnArray['intro_end'] = video.intro_end
          returnArray['outro_start'] = video.outro_start
        }

        return returnArray;
      }
    }



    JSON.createNamedConfig('firstEpisode') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(Episode) { Episode  episode ->
        def returnArray = [:]

        returnArray['id'] = episode.id
        returnArray['name'] = episode.name
        returnArray['dateCreated'] = episode.dateCreated
        returnArray['lastUpdated'] = episode.lastUpdated
        returnArray['overview'] = episode.overview
        returnArray['imdb_id'] = episode.imdb_id
        returnArray['vote_average'] = episode.vote_average
        returnArray['vote_count'] = episode.vote_count
        returnArray['popularity'] = episode.popularity
        returnArray['show'] = episode.show
        returnArray['episodeString'] = episode.episodeString
        returnArray['air_date'] = episode.air_date
        returnArray['still_path'] = episode.still_path

        return returnArray;
      }
      cfg.registerObjectMarshaller(TvShow) { TvShow  tvShow ->
        def returnArray = [:]

        returnArray['id'] = tvShow.id
        returnArray['name'] = tvShow.name
        returnArray['dateCreated'] = tvShow.dateCreated
        returnArray['first_air_date'] = tvShow.first_air_date
        returnArray['lastUpdated'] = tvShow.lastUpdated
        returnArray['overview'] = tvShow.overview
        returnArray['imdb_id'] = tvShow.imdb_id
        returnArray['vote_average'] = tvShow.vote_average
        returnArray['vote_count'] = tvShow.vote_count
        returnArray['popularity'] = tvShow.popularity
        returnArray['backdrop_path'] = tvShow.backdrop_path
        returnArray['poster_path'] = tvShow.poster_path
        returnArray['manualInput'] = tvShow.manualInput
        returnArray['poster_image_src'] = tvShow.poster_image?.src

        return returnArray;
      }
    }

    JSON.createNamedConfig('dashMovies') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(Movie) { Movie  movie ->
        def returnArray = [:]

        returnArray['id'] = movie.id
        returnArray['isMovie'] = true
        returnArray['mediaType'] = 'movie'

        returnArray['dateCreated'] = movie.dateCreated
        returnArray['lastUpdated'] = movie.lastUpdated
        returnArray['overview'] = movie.overview
        returnArray['imdb_id'] = movie.imdb_id
        returnArray['vote_average'] = movie.vote_average
        returnArray['vote_count'] = movie.vote_count
        returnArray['popularity'] = movie.popularity
        returnArray['original_language'] = movie.original_language
        returnArray['title'] = movie.title
        returnArray['release_date'] = movie.release_date
        returnArray['backdrop_path'] = movie.backdrop_path
        returnArray['poster_path'] = movie.poster_path
        returnArray['trailerKey'] = movie.trailerKey
        returnArray['tags'] = movie.tags
        returnArray['genre'] = movie.genre
        returnArray['poster_image_src'] = movie.poster_image?.src

        return returnArray;
      }
    }

    JSON.createNamedConfig('dashTvShow') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(TvShow){ TvShow tvShow ->
        def returnArray = [:]

        returnArray['id'] = tvShow.id
        returnArray['isTvShow'] = true
        returnArray['mediaType'] = 'tvShow'

        returnArray['dateCreated'] = tvShow.dateCreated
        returnArray['lastUpdated'] = tvShow.lastUpdated
        returnArray['poster_path'] = tvShow.poster_path
        returnArray['first_air_date'] = tvShow.first_air_date
        returnArray['name'] = tvShow.name
        returnArray['overview'] = tvShow.overview
        returnArray['apiId'] = tvShow.apiId
        returnArray['imdb_id'] = tvShow.imdb_id
        returnArray['original_language'] = tvShow.original_language
        returnArray['vote_average'] = tvShow.vote_average
        returnArray['vote_count'] = tvShow.vote_count
        returnArray['popularity'] = tvShow.popularity
        returnArray['manualInput'] = tvShow.manualInput
        returnArray['poster_image_src'] = tvShow.poster_image?.src
        returnArray['genre'] = tvShow.genre

        return returnArray;
      }
    }

    JSON.createNamedConfig('dashGenericVideo') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(GenericVideo){ GenericVideo genericVideo ->
        def returnArray = [:]

        returnArray['id'] = genericVideo.id
        returnArray['isGenericVideo'] = true
        returnArray['mediaType'] = 'genericVideo'

        returnArray['dateCreated'] = genericVideo.dateCreated
        returnArray['lastUpdated'] = genericVideo.lastUpdated
        returnArray['overview'] = genericVideo.overview
        returnArray['imdb_id'] = genericVideo.imdb_id
        returnArray['vote_average'] = genericVideo.vote_average
        returnArray['vote_count'] = genericVideo.vote_count
        returnArray['popularity'] = genericVideo.popularity
        returnArray['original_language'] = genericVideo.original_language
        returnArray['overview'] = genericVideo.overview

        returnArray['title'] = genericVideo.title
        returnArray['release_date'] = genericVideo.release_date
        returnArray['poster_image_src'] = genericVideo.poster_image?.src
        returnArray['backdrop_image_src'] = genericVideo.backdrop_image?.src
        returnArray['trailerKey'] = genericVideo.trailerKey

        returnArray['tags'] = genericVideo.tags
        returnArray['genre'] = genericVideo.genre

        return returnArray;
      }
    }


    JSON.createNamedConfig('fullMovie') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(Movie) { Movie  movie ->
        def returnArray = [:]

        returnArray['id'] = movie.id
        returnArray['videoType'] = 'movie'
        returnArray['dateCreated'] = movie.dateCreated
        returnArray['lastUpdated'] = movie.lastUpdated
        returnArray['overview'] = movie.overview
        returnArray['imdb_id'] = movie.imdb_id
        returnArray['vote_average'] = movie.vote_average
        returnArray['vote_count'] = movie.vote_count
        returnArray['popularity'] = movie.popularity
        returnArray['original_language'] = movie.original_language
        returnArray['apiId'] = movie.apiId

        returnArray['title'] = movie.title
        returnArray['release_date'] = movie.release_date
        returnArray['backdrop_path'] = movie.backdrop_path
        returnArray['poster_path'] = movie.poster_path
        returnArray['trailerKey'] = movie.trailerKey


        returnArray['files'] = movie.files.findAll{it.extension != '.srt' && it.extension != '.vtt'}
        returnArray['subtitles'] = movie.files.findAll{it.extension == '.srt' || it.extension == '.vtt'}
        returnArray['poster_image_src'] = movie.poster_image?.src

        if(movie.apiId){
          returnArray['similarMovies'] = movie.similarMovies
        }
        returnArray['tags'] = movie.tags
        returnArray['genre'] = movie.genre


        returnArray['hasFiles'] = movie.hasFiles()
//        returnArray['externalSubtitleUrl'] = movie.externalSubtitleUrl
//        returnArray['externalVideoUrl'] = movie.externalVideoUrl

        return returnArray;
      }
    }


    JSON.createNamedConfig('adminFileManager') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(File) { File  file ->
        def returnArray = [:]

        returnArray['id'] = file.id
        returnArray['name'] = file.name
        returnArray['sha256Hex'] = file.sha256Hex
        returnArray['src'] = file.getSrc()
        returnArray['originalFilename'] = file.originalFilename
        returnArray['extension'] = file.extension
        returnArray['contentType'] = file.contentType
        returnArray['size'] = file.size
        returnArray['dateCreated'] = file.dateCreated
        returnArray['quality'] = file.quality
        returnArray['fileExists'] = file.fileExists
        returnArray['videos'] = file.associatedVideos

        return returnArray;
      }


      cfg.registerObjectMarshaller(Video) { Video  video ->
        def returnArray = [:]

        returnArray['id'] = video.id

        if(video instanceof Movie){
          returnArray['title'] = video.title
          returnArray['release_date'] = video.release_date
          returnArray['poster_path'] = video.poster_path
        }

        if(video instanceof Episode){
          returnArray['isEpisode'] = true
          returnArray['title'] = video.show?.name
          returnArray['poster_path'] = video.show?.poster_path
        }

        return returnArray;
      }
    }


    JSON.createNamedConfig('episodesForTvShow') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(Episode) { Episode  episode ->
        def returnArray = [:]

        returnArray['id'] = episode.id
        returnArray['overview'] = episode.overview
        returnArray['name'] = episode.name
        returnArray['season_number'] = episode.season_number
        returnArray['episode_number'] = episode.episode_number
        returnArray['hasFile'] = episode.files?.size()
        returnArray['still_path'] = episode.still_path
        returnArray['intro_start'] = episode.intro_start
        returnArray['intro_end'] = episode.intro_end
        returnArray['outro_start'] = episode.outro_start
        returnArray['videoType'] = 'episode'

        return returnArray;
      }
    }
    JSON.createNamedConfig('adminEpisodesForTvShow') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(Episode) { Episode  episode ->
        def returnArray = [:]

        returnArray['id'] = episode.id
        returnArray['overview'] = episode.overview
        returnArray['name'] = episode.name
        returnArray['season_number'] = episode.season_number
        returnArray['episode_number'] = episode.episode_number
        returnArray['files'] = episode.files
        returnArray['still_path'] = episode.still_path
        returnArray['intro_start'] = episode.intro_start
        returnArray['intro_end'] = episode.intro_end
        returnArray['outro_start'] = episode.outro_start
        returnArray['air_date'] = episode.air_date
        returnArray['vote_average'] = episode.vote_average
        returnArray['apiId'] = episode.apiId
        returnArray['episodeString'] = episode.episodeString

        return returnArray;
      }
    }

    JSON.createNamedConfig('admin') { DefaultConverterConfiguration<JSON> cfg ->

      cfg.registerObjectMarshaller(GenericVideo) { GenericVideo  genericVideo ->
        def returnArray = [:]

        returnArray['id'] = genericVideo.id
        returnArray['dateCreated'] = genericVideo.dateCreated
        returnArray['lastUpdated'] = genericVideo.lastUpdated
        returnArray['overview'] = genericVideo.overview
        returnArray['imdb_id'] = genericVideo.imdb_id
        returnArray['vote_average'] = genericVideo.vote_average
        returnArray['vote_count'] = genericVideo.vote_count
        returnArray['popularity'] = genericVideo.popularity
        returnArray['original_language'] = genericVideo.original_language

        returnArray['title'] = genericVideo.title
        returnArray['release_date'] = genericVideo.release_date
        returnArray['poster_image_src'] = genericVideo.poster_image?.src
        returnArray['backdrop_image_src'] = genericVideo.backdrop_image?.src
        returnArray['trailerKey'] = genericVideo.trailerKey


        returnArray['files'] = genericVideo.files.findAll{it.extension != '.srt' && it.extension != '.vtt'}
        returnArray['subtitles'] = genericVideo.files.findAll{it.extension == '.srt' || it.extension == '.vtt'}
        returnArray['tags'] = genericVideo.tags
        returnArray['genre'] = genericVideo.genre
        returnArray['hasFiles'] = genericVideo.hasFiles()


        return returnArray;
      }
    }


    JSON.createNamedConfig('player') { DefaultConverterConfiguration<JSON> cfg ->
      cfg.registerObjectMarshaller(Video) {  Video video ->
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

        returnArray['files'] = video.files.findAll{it.extension != '.srt' && it.extension != '.vtt'}
        returnArray['subtitles'] = video.files.findAll{it.extension == '.srt' || it.extension == '.vtt'}

        returnArray['hasFiles'] = video.hasFiles()

        returnArray['viewedStatus'] = ViewingStatus.findByVideoAndUser(video, springSecurityService.currentUser)

        if(video instanceof Episode){
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

          nextEpisode = video.show.episodes?.find{
            return (it.episode_number == video.episode_number+1 && it.season_number == video.season_number)
          }
          if(!nextEpisode){
            video.show.episodes?.find{
              return (it.season_number == video.season_number+1 && it.episode_number == 1)
            }
          }

          if(nextEpisode && nextEpisode.files){
            returnArray['nextEpisode'] = [id: nextEpisode?.id]
          }
        }
        if(video instanceof Movie){
          returnArray['title'] = video.title
          returnArray['release_date'] = video.release_date
          returnArray['backdrop_path'] = video.backdrop_path
          returnArray['poster_path'] = video.poster_path
        }
        if(video instanceof GenericVideo){
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
