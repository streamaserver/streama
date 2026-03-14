package streama

class AudioPlaylistEntry {

  Date dateCreated

  AudioPlaylist playlist
  AudioTrack track
  Integer sortOrder

  static mapping = {
    cache true
  }

  static constraints = {
    playlist nullable: false
    track nullable: false
    sortOrder nullable: true
  }
}
