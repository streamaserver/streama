package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ArtistController {

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", delete: "DELETE"]

  def index() {
    def max = params.int('max', 50)
    def offset = params.int('offset', 0)
    def sort = params.sort ?: 'name'
    def order = params.order ?: 'ASC'

    def artists = Artist.findAllByDeletedNotEqual(true, [max: max, offset: offset, sort: sort, order: order])
    def total = Artist.countByDeletedNotEqual(true)

    render([records: artists.collect { marshalArtist(it) }, total: total] as JSON)
  }

  def show() {
    Artist artist = Artist.get(params.id)
    if (!artist) {
      render status: NOT_FOUND
      return
    }
    render(marshalArtistFull(artist) as JSON)
  }

  @Transactional
  def save() {
    def data = request.JSON

    Artist artist = data.id ? Artist.get(data.id) : new Artist()
    if (!artist) {
      render status: NOT_FOUND
      return
    }

    artist.name = data.name
    artist.bio = data.bio
    if (data.image) {
      artist.image = File.get(data.image)
    }

    artist.deleted = false
    artist.validate()

    if (artist.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    artist.save flush: true
    render(marshalArtistFull(artist) as JSON)
  }

  @Transactional
  def delete() {
    Artist artist = Artist.get(params.id)
    if (!artist) {
      render status: NOT_FOUND
      return
    }

    artist.deleted = true
    artist.save flush: true
    render status: NO_CONTENT
  }

  static Map marshalArtist(Artist artist) {
    return [
      id: artist.id,
      mediaType: 'artist',
      name: artist.name,
      image_path: artist.imagePath,
      songCount: artist.songCount,
      albumCount: artist.albumCount,
      dateCreated: artist.dateCreated,
      lastUpdated: artist.lastUpdated
    ]
  }

  static Map marshalArtistFull(Artist artist) {
    def albums = Album.findAllByArtistAndDeletedNotEqual(artist, true, [sort: 'year', order: 'DESC'])
    def result = marshalArtist(artist)
    result.bio = artist.bio
    result.albums = albums.collect { AlbumController.marshalAlbum(it) }
    return result
  }
}
