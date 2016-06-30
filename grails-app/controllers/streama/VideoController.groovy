package streama

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class VideoController {

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", delete: "DELETE"]

  def thetvdbService
  def uploadService
  def springSecurityService
  def mediaService
  def fileService
  def videoService


  def index() {
    respond Video.findAllByDeletedNotEqual(true), [status: OK]
  }

  def dash() {
    User currentUser = springSecurityService.currentUser
    def result = [:]

    def tvShows = TvShow.findAllByDeletedNotEqual(true)

    def continueWatching = ViewingStatus.withCriteria {
      eq("user", currentUser)
      video{
        isNotEmpty("files")
        ne("deleted", true)
      }
      eq("completed", false)
      order("lastUpdated", "desc")
    }
    def movies = Movie.findAllByDeletedNotEqual(true).findAll{ Movie movie ->
      return (!continueWatching.find{it.video.id == movie.id} && movie.files)
    }

    result.tvShowsForDash = tvShows.findAll{tvShow->
      return (!(continueWatching.find{(it.video instanceof Episode) && it.video.show?.id == tvShow?.id}) && tvShow.hasFiles)
    }

    JSON.use('dashMovies'){
      result.movies = JSON.parse((movies as JSON).toString())
    }

    JSON.use ('dashViewingStatus') {
      result.continueWatching = JSON.parse((continueWatching as JSON).toString())
    }

    respond result
  }

  @Transactional
  def save() {

    def data = request.JSON
    Video videoInstance

    if (data == null) {
      render status: NOT_FOUND
      return
    }
    if(!data.id){
      if(data.image){
        data.image = thetvdbService.BASE_PATH_GRAPHICS + data.image
      }
      videoInstance = new Video()
    }else{
      videoInstance = Video.get(data.id)
    }

    videoInstance.properties = data

    videoInstance.validate()
    if (videoInstance.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    videoInstance.save flush:true
    respond videoInstance, [status: CREATED]
  }

  def show(Video videoInstance){
    JSON.use('player') {
      respond videoInstance, [status: OK]
    }
  }


  @Transactional
  def delete(Video videoInstance) {

    if (videoInstance == null) {
      render status: NOT_FOUND
      return
    }
    videoService.deleteVideoAndAssociations(videoInstance)
    render status: NO_CONTENT
  }

  @Transactional
  def uploadFile(Video videoInstance) {

    if (videoInstance == null) {
      render status: NOT_FOUND
      return
    }

    def file = uploadService.upload(request)
    videoInstance.addToFiles(file)
    videoInstance.save flush: true, failOnError: true

    respond file

  }

  @Transactional
  def removeFile() {

    Video video = Video.get(params.getInt('videoId'))
    File file = File.get(params.getInt('fileId'))

    if (!video || !file) {
      render status: NOT_FOUND
      return
    }

    video.removeFromFiles(file)
    video.save flush: true, failOnError: true

    fileService.fullyRemoveFile(file)

    respond status: OK

  }
  @Transactional
  def addFile() {
    Video video = Video.get(params.getInt('videoId'))
    File file = File.get(params.getInt('fileId'))

    if (!video || !file) {
      render status: NOT_FOUND
      return
    }

    video.addToFiles(file)
    video.save flush: true, failOnError: true

    respond status: OK

  }

  @Transactional
  def refetch() {
    Episode episode = Episode.get(params.getInt('videoId'))

    if (!episode) {
      render status: NOT_FOUND
      return
    }

    log.debug(episode.movieDbMeta)
    bindData(episode, episode.movieDbMeta, [exclude: 'id'])
    episode.save flush: true, failOnError: true

    respond episode

  }

  @Transactional
  def addExternalUrl(Video videoInstance){
    File file = File.findOrCreateByExternalLink(params.externalUrl)
    file.originalFilename = params.externalUrl
    def extensionIndex = params.externalUrl.lastIndexOf('.')
    file.extension = params.externalUrl[extensionIndex..-1];
    file.save()
    videoInstance.addToFiles(file)
    respond file
  }
}
