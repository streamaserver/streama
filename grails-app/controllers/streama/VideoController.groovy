package streama

import grails.converters.JSON

import java.nio.file.Files
import java.nio.file.Paths

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class VideoController {

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", delete: "DELETE"]

  def thetvdbService
  def uploadService
  def springSecurityService
  def fileService
  def videoService
  def userActivityService


  def index() {
    respond Video.findAllByDeletedNotEqual(true), [status: OK]
  }

  def dash() {
    User currentUser = springSecurityService.currentUser
    def result = [:]

    def tvShows = TvShow.findAllByDeletedNotEqual(true)

    def continueWatching = ViewingStatus.withCriteria {
      eq("user", currentUser)
      video {
        isNotEmpty("files")
        ne("deleted", true)
      }
      eq("completed", false)
      order("lastUpdated", "desc")
    }
    def movies = Movie.findAllByDeletedNotEqual(true).findAll { Movie movie ->
      return (!continueWatching.find { it.video.id == movie.id } && movie.files)
    }

    result.tvShowsForDash = tvShows.findAll { tvShow ->
      return (!(continueWatching.find {
        (it.video instanceof Episode) && it.video.show?.id == tvShow?.id
      }) && tvShow.hasFiles)
    }

    JSON.use('dashMovies') {
      result.movies = JSON.parse((movies as JSON).toString())
    }

    JSON.use('dashViewingStatus') {
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
    if (!data.id) {
      if (data.image) {
        data.image = thetvdbService.BASE_PATH_GRAPHICS + data.image
      }
      videoInstance = new Video()
    } else {
      videoInstance = Video.get(data.id)
    }

    videoInstance.properties = data

    videoInstance.validate()
    if (videoInstance.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    videoInstance.save flush: true
    respond videoInstance, [status: CREATED]
  }

  def show(Video videoInstance) {
    userActivityService.createActivityEntry(request, 'video', videoInstance)

    JSON.use('player') {
      render(videoInstance as JSON)
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

    if (file != null) {
      file.isDefault = videoService.haveSetByDefault(videoInstance, file)
      videoInstance.addToFiles(file)
      videoInstance.save flush: true, failOnError: true
      respond file
    } else {
      render status: 415
    }


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
    if (!videoService.isFirstSubtitle(video, file)) {
      def subtitle = video.getSubtitles().min { it.id }
      subtitle?.isDefault = true
    }
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

    if (video.videoFiles.size() == 0 && fileService.allowedVideoFormats.contains(file.extension)) {
      file.isDefault = true
    }
    if (videoService.isFirstSubtitle(video, file)) {
      file.isDefault = true
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

    bindData(episode, episode.movieDbMeta, [exclude: 'id'])
    episode.save flush: true, failOnError: true

    respond episode

  }

  // last occurrence of mp4|webm|ogg|srt|vtt
  def videoExtensionRegex = ~/(?:.(?![^a-zA-Z0-9]))(mp4|webm|ogg|srt|vtt)/

  @Transactional
  def addExternalUrl(Video videoInstance) {
    File file = File.findOrCreateByExternalLink(params.externalUrl)
    file.originalFilename = params.externalUrl
    def matcher = params.externalUrl =~ videoExtensionRegex
    if (matcher.getCount()) {
      file.extension = matcher[0][0]
    }
    if (videoInstance.videoFiles.size() == 0 && fileService.allowedVideoFormats.contains(file.extension)) {
      file.isDefault = true
    }
    if (videoService.isFirstSubtitle(videoInstance, file)) {
      file.isDefault = true
    }

    file.save()
    videoInstance.addToFiles(file)
    respond file
  }

  @Transactional
  def addLocalFile(Video videoInstance) {
    def result = videoService.addLocalFile(videoInstance, params)
    if (result instanceof Map && result.error) {
      response.setStatus(result.statusCode)
      respond result
      return
    }
    respond result
  }

  @Transactional
  def markAsUnviewed(Video videoInstance){
    ViewingStatus viewingStatus = videoInstance.getViewingStatus()
    if(!viewingStatus){
      return
    }
    viewingStatus.delete()
    render status: 200
  }

  @Transactional
  def markCompleted(Video videoInstance){
    ViewingStatus viewingStatus = videoInstance.getViewingStatus()
    if(!viewingStatus){
      return
    }
    viewingStatus.completed = true
    viewingStatus.save flush:true
    respond viewingStatus, [status: OK]
  }

}
