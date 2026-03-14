package streama

class Artist {

  Date dateCreated
  Date lastUpdated

  String name
  String bio
  Boolean deleted = false

  File image

  static hasMany = [albums: Album, songs: AudioTrack]

  static mapping = {
    cache true
    albums cache: true
    songs cache: true
    bio type: 'text'
  }

  static constraints = {
    name nullable: false, blank: false
    bio nullable: true, size: 0..5000
    image nullable: true
  }

  def getImagePath() {
    if (this.image) {
      return this.image.src
    }
    return null
  }

  def getSongCount() {
    return AudioTrack.countByArtistAndDeletedNotEqual(this, true)
  }

  def getAlbumCount() {
    return Album.countByArtistAndDeletedNotEqual(this, true)
  }
}
