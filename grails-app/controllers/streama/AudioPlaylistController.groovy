package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class AudioPlaylistController {

  def springSecurityService

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", delete: "DELETE"]

  def index() {
    User currentUser = springSecurityService.currentUser

    // Return user's own playlists + all global playlists
    def userPlaylists = AudioPlaylist.findAllByUserAndDeletedNotEqual(currentUser, true, [sort: 'lastUpdated', order: 'DESC'])
    def globalPlaylists = AudioPlaylist.findAllByIsGlobalAndDeletedNotEqual(true, true, [sort: 'title', order: 'ASC'])

    // Merge without duplicates
    def allPlaylists = (globalPlaylists + userPlaylists).unique { it.id }

    render(allPlaylists.collect { marshalPlaylist(it) } as JSON)
  }

  def show() {
    AudioPlaylist playlist = AudioPlaylist.get(params.id)
    if (!playlist) {
      render status: NOT_FOUND
      return
    }
    render(marshalPlaylistFull(playlist) as JSON)
  }

  @Transactional
  def save() {
    def data = request.JSON
    User currentUser = springSecurityService.currentUser

    AudioPlaylist playlist = data.id ? AudioPlaylist.get(data.id) : new AudioPlaylist()
    if (!playlist) {
      render status: NOT_FOUND
      return
    }

    // New playlists: set owner. Global playlists only by content managers.
    if (!data.id) {
      if (data.isGlobal && currentUser.authorities.find { it.authority == 'ROLE_CONTENT_MANAGER' }) {
        playlist.isGlobal = true
        playlist.user = null
      } else {
        playlist.user = currentUser
        playlist.isGlobal = false
      }
    }

    playlist.title = data.title
    playlist.description = data.description
    if (data.cover_image) {
      playlist.cover_image = File.get(data.cover_image)
    }
    if (data.containsKey('isGlobal') && currentUser.authorities.find { it.authority == 'ROLE_CONTENT_MANAGER' }) {
      playlist.isGlobal = data.isGlobal
      if (playlist.isGlobal) playlist.user = null
    }

    playlist.validate()

    if (playlist.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    playlist.save flush: true
    render(marshalPlaylistFull(playlist) as JSON)
  }

  @Transactional
  def addTrack() {
    AudioPlaylist playlist = AudioPlaylist.get(params.long('playlistId'))
    AudioTrack track = AudioTrack.get(params.long('trackId'))

    if (!playlist || !track) {
      render status: NOT_FOUND
      return
    }

    def maxOrder = AudioPlaylistEntry.createCriteria().get {
      eq('playlist', playlist)
      projections { max('sortOrder') }
    } ?: 0

    def entry = new AudioPlaylistEntry(playlist: playlist, track: track, sortOrder: (maxOrder as Integer) + 1)
    entry.save flush: true

    render(marshalPlaylistFull(playlist) as JSON)
  }

  @Transactional
  def removeTrack() {
    AudioPlaylistEntry entry = AudioPlaylistEntry.get(params.long('entryId'))
    if (!entry) {
      render status: NOT_FOUND
      return
    }

    def playlist = entry.playlist
    entry.delete flush: true

    render(marshalPlaylistFull(playlist) as JSON)
  }

  @Transactional
  def reorder() {
    def data = request.JSON
    data.entries?.eachWithIndex { entryId, index ->
      AudioPlaylistEntry entry = AudioPlaylistEntry.get(entryId as Long)
      if (entry) {
        entry.sortOrder = index
        entry.save flush: true
      }
    }

    render([success: true] as JSON)
  }

  @Transactional
  def delete() {
    AudioPlaylist playlist = AudioPlaylist.get(params.id)
    if (!playlist) {
      render status: NOT_FOUND
      return
    }

    playlist.deleted = true
    playlist.save flush: true
    render status: NO_CONTENT
  }

  private Map marshalPlaylist(AudioPlaylist playlist) {
    return [
      id: playlist.id,
      title: playlist.title,
      description: playlist.description,
      cover_path: playlist.coverPath,
      trackCount: playlist.trackCount,
      isGlobal: playlist.isGlobal,
      dateCreated: playlist.dateCreated,
      lastUpdated: playlist.lastUpdated
    ]
  }

  private Map marshalPlaylistFull(AudioPlaylist playlist) {
    def entries = AudioPlaylistEntry.findAllByPlaylist(playlist, [sort: 'sortOrder', order: 'ASC'])
    def result = marshalPlaylist(playlist)
    result.tracks = entries.collect { entry ->
      def song = entry.track
      [
        entryId: entry.id,
        id: song.id,
        title: song.title,
        artist: song.artist ? [id: song.artist.id, name: song.artist.name] : null,
        trackNumber: song.trackNumber,
        duration: song.duration,
        durationDisplay: song.durationDisplay,
        hasFiles: song.hasFiles(),
        files: song.files?.collect { [id: it.id, src: it.src, originalFilename: it.originalFilename, extension: it.extension] },
        album: song.album ? [id: song.album.id, title: song.album.title, cover_path: song.album.coverPath] : null,
        dateAdded: entry.dateCreated
      ]
    }
    return result
  }
}
