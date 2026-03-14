package streama

class Album {

  Date dateCreated
  Date lastUpdated

  String title
  String overview
  String year
  Boolean deleted = false

  Artist artist
  File cover_image

  static hasMany = [songs: AudioTrack, genre: Genre]

  static mapping = {
    cache true
    songs cache: true
    overview type: 'text'
  }

  static constraints = {
    title nullable: false, blank: false
    artist nullable: false
    overview nullable: true, size: 0..5000
    year nullable: true
    cover_image nullable: true
  }

  def getCoverPath() {
    if (this.cover_image) {
      return this.cover_image.src
    }
    return null
  }

  def getSongCount() {
    return AudioTrack.countByAlbumAndDeletedNotEqual(this, true)
  }

  def getTotalDuration() {
    def tracks = AudioTrack.findAllByAlbumAndDeletedNotEqual(this, true)
    return tracks.sum { it.duration ?: 0 } ?: 0
  }
}
