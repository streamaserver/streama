package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class AlbumController {

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", delete: "DELETE"]

  def index() {
    def max = params.int('max', 50)
    def offset = params.int('offset', 0)
    def sort = params.sort ?: 'title'
    def order = params.order ?: 'ASC'

    def albums = Album.findAllByDeletedNotEqual(true, [max: max, offset: offset, sort: sort, order: order])
    def total = Album.countByDeletedNotEqual(true)

    render([records: albums.collect { marshalAlbum(it) }, total: total] as JSON)
  }

  def show() {
    Album album = Album.get(params.id)
    if (!album) {
      render status: NOT_FOUND
      return
    }
    render(marshalAlbumFull(album) as JSON)
  }

  @Transactional
  def save() {
    def data = request.JSON

    Album album = data.id ? Album.get(data.id) : new Album()
    if (!album) {
      render status: NOT_FOUND
      return
    }

    album.title = data.title
    album.overview = data.overview
    album.year = data.year

    if (data.artistId) {
      album.artist = Artist.get(data.artistId)
    }
    if (data.cover_image) {
      album.cover_image = File.get(data.cover_image)
    }
    if (data.genre) {
      album.genre?.clear()
      data.genre.each { g ->
        def genre = Genre.get(g.id ?: g)
        if (genre) album.addToGenre(genre)
      }
    }

    album.deleted = false
    album.validate()

    if (album.hasErrors()) {
      response.setStatus(NOT_ACCEPTABLE.value())
      render(album.errors as JSON)
      return
    }

    album.save flush: true
    render(marshalAlbumFull(album) as JSON)
  }

  @Transactional
  def delete() {
    Album album = Album.get(params.id)
    if (!album) {
      render status: NOT_FOUND
      return
    }

    album.deleted = true
    album.save flush: true

    album.songs?.each { song ->
      song.deleted = true
      song.save flush: true
    }

    render status: NO_CONTENT
  }

  static Map marshalAlbum(Album album) {
    return [
      id: album.id,
      mediaType: 'album',
      title: album.title,
      artist: album.artist ? [id: album.artist.id, name: album.artist.name, image_path: album.artist.imagePath] : null,
      year: album.year,
      cover_path: album.coverPath,
      genre: album.genre,
      songCount: album.songCount,
      totalDuration: album.totalDuration,
      dateCreated: album.dateCreated,
      lastUpdated: album.lastUpdated
    ]
  }

  static Map marshalAlbumFull(Album album) {
    def songs = AudioTrack.findAllByAlbumAndDeletedNotEqual(album, true, [sort: 'trackNumber', order: 'ASC'])
    def result = marshalAlbum(album)
    result.overview = album.overview
    result.songs = songs.collect { marshalSong(it) }
    return result
  }

  static Map marshalSong(AudioTrack song) {
    return [
      id: song.id,
      title: song.title,
      artist: song.artist ? [id: song.artist.id, name: song.artist.name] : null,
      trackNumber: song.trackNumber,
      duration: song.duration,
      durationDisplay: song.durationDisplay,
      hasFiles: song.hasFiles(),
      files: song.files?.collect { [id: it.id, src: it.src, originalFilename: it.originalFilename, extension: it.extension] },
      album: song.album ? [id: song.album.id, title: song.album.title, cover_path: song.album.coverPath] : null,
      podcast: song.podcast ? [id: song.podcast.id, title: song.podcast.title, cover_path: song.podcast.coverPath] : null,
      dateCreated: song.dateCreated
    ]
  }
}
