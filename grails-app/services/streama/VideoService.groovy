package streama

import grails.transaction.Transactional
import grails.web.servlet.mvc.GrailsParameterMap

import java.nio.file.Files
import java.nio.file.Paths

import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE

@Transactional
class VideoService {

  def fileService
  def uploadService
  def grailsApplication
  def settingsService

  def deleteVideoAndAssociations(Video video) {
    video.setDeleted(true)
    ViewingStatus.findAllByVideo(video)*.delete(flush: true)
    video.files?.each{ fileService.fullyRemoveFile(it) }
    video.save failOnError: true, flush: true
  }


  public static List<ViewingStatus> listContinueWatching(User currentUser, Profile profile) {
    List<ViewingStatus> continueWatching = ViewingStatus.withCriteria {
      eq("user", currentUser)
      eq("profile", profile)
      video {
        isNotEmpty("files")
        ne("deleted", true)
      }
//      eq("completed", false)
      order("lastUpdated", "desc")
    }

    return reduceContinueWatchingEps(continueWatching)
  }

  private static List<ViewingStatus> reduceContinueWatchingEps(List<ViewingStatus> continueWatching) {
    def result = []
    continueWatching.each { continueWatchingItem ->
      if (continueWatchingItem.video instanceof Episode) {
        def previousShowEntry = result.find { it.video instanceof Episode && it.video.show?.id == continueWatchingItem.video.show?.id }

        if (!previousShowEntry) {
          if(!continueWatchingItem.hasVideoEnded()){
            result.add(continueWatchingItem)
          }else{
            continueWatchingItem.completed = true
            continueWatchingItem.save()
            ViewingStatus newViewingStatus = ViewingStatusService.createNewForNextEpisode(continueWatchingItem)
            if(newViewingStatus){
              result.add(newViewingStatus)
            }
          }
        }
      } else{
        if(!continueWatchingItem.hasVideoEnded()){
          result.add(continueWatchingItem)
        }else{
          continueWatchingItem.completed = true
          continueWatchingItem.save()
        }
      }
    }

    return result
  }




  @Transactional
  def addLocalFile(Video videoInstance, params){
    def result = [:]

    // The local path is configured?
    if (!uploadService.localPath) {
      result.message = "The Local Video Files setting is not configured."
      result.error = true
      result.statusCode = NOT_ACCEPTABLE.value
      return result
    }

    // The local path is configured?
    if (!params.localFile) {
      result.message = "No LocalFile has been submitted for this request."
      result.error = true
      result.statusCode = NOT_ACCEPTABLE.value
      return result
    }

    // Check that the given file path is contained in the local files directory
    def localPath = Paths.get(uploadService.localPath)
    def givenPath = Paths.get(params.localFile).toAbsolutePath()
    if (!givenPath.startsWith(localPath)) {
      result.message = "The video file must be contained in the Local Video Files setting."
      result.error = true
      result.statusCode = NOT_ACCEPTABLE.value
      return result
    }

    // Create the file in database
    File file = File.findOrCreateByLocalFile(params.localFile)
    file.localFile = params.localFile
    file.originalFilename = givenPath.getFileName().toString()
    file.contentType = Files.probeContentType(givenPath)
    file.size = Files.size(givenPath)
    def extensionIndex = params.localFile.lastIndexOf('.')
    file.extension = params.localFile[extensionIndex..-1];

	// Subtitle label guessing (by Norwelian)
	if(settingsService.getValueForName('guess_subtitle_label')){
	    def regexConfig = grailsApplication.config.streama?.regex
		def subtitleNameRegex = regexConfig?.subtitles
	    def matcher = file.localFile =~ subtitleNameRegex
		if (matcher.getCount()) {
			file.subtitleLabel = matcher[0][1].toUpperCase()
		}
	}

    if(videoInstance.videoFiles.size() == 0){
      file.isDefault = true
    }

    file.save(failOnError: true, flush: true)
    videoInstance.addToFiles(file)
    videoInstance.save(failOnError: true, flush: true)
    return file
  }


  def listMovies(GrailsParameterMap params, Map options){
    Profile currentProfile = User.getProfileFromRequest()
    Integer max = params.int('max', 50)
    Integer offset = params.int('offset', 0)
    String sort = params.sort
    String order = params.order
    Long genreId = params.long('genreId')
    List<Long> genreList = params.list('genre')*.toLong() ?: []

    if(currentProfile?.isChild){
      genreList += Genre.findAllByNameInList(['Kids', 'Family'])*.id
    }

    def movieQuery = Movie.where {
      deleted != true
      if(!options.includeEmpty){
        isNotEmpty("files")
      }
      if(params.title){
        title =~ "%${params.title}%"
      }
      if(genreId){
        genre{
          id == genreId
        }
      }

      if(genreList){
        genre{
          id in genreList
        }
      }
    }
    def movies =  movieQuery.list(max: max, offset: offset, sort: sort, order: order)
    def totalMovieCount = movieQuery.count()

    def result = [total: totalMovieCount, list: movies]

    return result
  }


  def listShows(GrailsParameterMap params, Map options){
    Profile currentProfile = User.getProfileFromRequest()
    def max = params.int('max', 50)
    def offset = params.int('offset', 0)
    def sort = params.sort
    def order = params.order
    def genreId = params.long('genreId')
    def genreList = params.list('genre')*.toLong() ?: []

    if(currentProfile?.isChild){
      genreList += Genre.findAllByNameInList(['Kids', 'Family'])*.id
    }

    def tvShowQuery = TvShow.where{
      def tv1 = TvShow
      deleted != true

      if(!options.includeEmpty) {
        exists Episode.where {
          def ep = Episode
          def tv2 = show
          tv1.id == tv2.id
          isNotEmpty("files")
        }.id()
      }

      if(params.name){
        name =~ "%${params.name}%"
      }

      if(genreId){
        genre{
          id == genreId
        }
      }

      if(genreList){
        genre{
          id in genreList
        }
      }
    }

    def tvShows = tvShowQuery.list(max: max, offset: offset, sort: sort, order: order)
    def totalTvShowsCount = tvShowQuery.count()

    def result = [total: totalTvShowsCount, list: tvShows]

    return result
  }


}
