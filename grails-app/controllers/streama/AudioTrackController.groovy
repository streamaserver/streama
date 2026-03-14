package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class AudioTrackController {

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", delete: "DELETE"]

  def index() {
    def max = params.int('max', 50)
    def offset = params.int('offset', 0)

    def tracks = AudioTrack.findAllByDeletedNotEqual(true, [max: max, offset: offset, sort: 'title', order: 'ASC'])
    def total = AudioTrack.countByDeletedNotEqual(true)

    render([records: tracks.collect { AlbumController.marshalSong(it) }, total: total] as JSON)
  }

  def show() {
    AudioTrack track = AudioTrack.get(params.id)
    if (!track) {
      render status: NOT_FOUND
      return
    }
    render(AlbumController.marshalSong(track) as JSON)
  }

  @Transactional
  def save() {
    def data = request.JSON

    AudioTrack track = data.id ? AudioTrack.get(data.id) : new AudioTrack()
    if (!track) {
      render status: NOT_FOUND
      return
    }

    track.title = data.title
    track.trackNumber = data.trackNumber as Integer
    track.duration = data.duration as Integer

    if (data.artistId) {
      track.artist = Artist.get(data.artistId)
    }
    if (data.albumId) {
      track.album = Album.get(data.albumId)
    }
    if (data.podcastId) {
      track.podcast = Podcast.get(data.podcastId)
    }

    track.deleted = false
    track.validate()

    if (track.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    track.save flush: true
    render(AlbumController.marshalSong(track) as JSON)
  }

  @Transactional
  def addFile() {
    AudioTrack track = AudioTrack.get(params.long('trackId'))
    File file = File.get(params.long('fileId'))

    if (!track || !file) {
      render status: NOT_FOUND
      return
    }

    track.addToFiles(file)
    track.save flush: true
    render(AlbumController.marshalSong(track) as JSON)
  }

  @Transactional
  def removeFile() {
    AudioTrack track = AudioTrack.get(params.long('trackId'))
    File file = File.get(params.long('fileId'))

    if (!track || !file) {
      render status: NOT_FOUND
      return
    }

    track.removeFromFiles(file)
    track.save flush: true
    render(AlbumController.marshalSong(track) as JSON)
  }

  @Transactional
  def addLocalFile() {
    AudioTrack track = AudioTrack.get(params.long('trackId'))
    String localFilePath = params.localFile

    if (!track || !localFilePath) {
      render status: NOT_FOUND
      return
    }

    java.io.File localFile = new java.io.File(localFilePath)
    if (!localFile.exists()) {
      render([message: 'File not found on disk'] as JSON)
      return
    }

    File file = new File()
    file.localFile = localFilePath
    file.originalFilename = localFile.name
    file.extension = '.' + localFile.name.tokenize('.').last()
    file.save flush: true

    track.addToFiles(file)
    track.save flush: true
    render(AlbumController.marshalSong(track) as JSON)
  }

  def uploadService

  @Transactional
  def uploadFile() {
    AudioTrack track = AudioTrack.get(params.long('id'))

    if (!track) {
      render status: NOT_FOUND
      return
    }

    def file = uploadService.upload(request)

    if (file != null) {
      track.addToFiles(file)
      track.save flush: true, failOnError: true
      respond file
    } else {
      render status: 415
    }
  }

  @Transactional
  def delete() {
    AudioTrack track = AudioTrack.get(params.id)
    if (!track) {
      render status: NOT_FOUND
      return
    }

    track.deleted = true
    track.save flush: true
    render status: NO_CONTENT
  }
}
