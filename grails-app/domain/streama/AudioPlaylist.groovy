package streama

class AudioPlaylist {

  Date dateCreated
  Date lastUpdated

  String title
  String description
  Boolean isGlobal = false
  Boolean deleted = false

  User user
  File cover_image

  static hasMany = [entries: AudioPlaylistEntry]

  static mapping = {
    cache true
    entries cache: true
    description type: 'text'
  }

  static constraints = {
    title nullable: false, blank: false
    description nullable: true, size: 0..5000
    cover_image nullable: true
    user nullable: true // null for global playlists
  }

  def getCoverPath() {
    if (this.cover_image) {
      return this.cover_image.src
    }
    return null
  }

  def getTrackCount() {
    return AudioPlaylistEntry.countByPlaylist(this)
  }
}
