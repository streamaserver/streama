package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class AudioDashController {

  def springSecurityService

  static responseFormats = ['json', 'xml']

  def index() {
    def artists = Artist.findAllByDeletedNotEqual(true, [max: 20, sort: 'name', order: 'ASC'])
    def albums = Album.findAllByDeletedNotEqual(true, [max: 20, sort: 'lastUpdated', order: 'DESC'])
    def podcasts = Podcast.findAllByDeletedNotEqual(true, [max: 20, sort: 'lastUpdated', order: 'DESC'])

    User currentUser = springSecurityService.currentUser
    def userPlaylists = AudioPlaylist.findAllByUserAndDeletedNotEqual(currentUser, true, [max: 20, sort: 'lastUpdated', order: 'DESC'])
    def globalPlaylists = AudioPlaylist.findAllByIsGlobalAndDeletedNotEqual(true, true, [max: 20, sort: 'title', order: 'ASC'])
    def allPlaylists = (globalPlaylists + userPlaylists).unique { it.id }

    def recentSongs = AudioTrack.findAllByDeletedNotEqual(true, [max: 10, sort: 'dateCreated', order: 'DESC'])

    render([
      artists: artists.collect { ArtistController.marshalArtist(it) },
      albums: albums.collect { AlbumController.marshalAlbum(it) },
      podcasts: podcasts.collect { marshalPodcast(it) },
      playlists: allPlaylists.collect { marshalPlaylist(it) },
      recentSongs: recentSongs.collect { AlbumController.marshalSong(it) }
    ] as JSON)
  }

  def search() {
    String query = params.query
    if (!query) {
      render([] as JSON)
      return
    }

    def artists = Artist.findAllByNameIlikeAndDeletedNotEqual("%${query}%", true, [max: 10])
    def albums = Album.findAllByTitleIlikeAndDeletedNotEqual("%${query}%", true, [max: 10])
    def podcasts = Podcast.findAllByTitleIlikeAndDeletedNotEqual("%${query}%", true, [max: 10])
    def songs = AudioTrack.findAllByTitleIlikeAndDeletedNotEqual("%${query}%", true, [max: 20])

    render([
      artists: artists.collect { ArtistController.marshalArtist(it) },
      albums: albums.collect { AlbumController.marshalAlbum(it) },
      podcasts: podcasts.collect { marshalPodcast(it) },
      songs: songs.collect { AlbumController.marshalSong(it) }
    ] as JSON)
  }

  private Map marshalPodcast(Podcast podcast) {
    return [
      id: podcast.id,
      mediaType: 'podcast',
      title: podcast.title,
      host: podcast.host,
      cover_path: podcast.coverPath,
      genre: podcast.genre,
      episodeCount: podcast.episodeCount,
      dateCreated: podcast.dateCreated
    ]
  }

  private Map marshalPlaylist(AudioPlaylist playlist) {
    return [
      id: playlist.id,
      title: playlist.title,
      cover_path: playlist.coverPath,
      trackCount: playlist.trackCount,
      isGlobal: playlist.isGlobal,
      dateCreated: playlist.dateCreated
    ]
  }
}
