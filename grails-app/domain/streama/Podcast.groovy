package streama

class Podcast {

  transient springSecurityService

  Date dateCreated
  Date lastUpdated

  String title
  String host
  String overview
  String cover_image_src
  Boolean deleted = false

  File cover_image

  static hasMany = [episodes: AudioTrack, genre: Genre]

  static mapping = {
    cache true
    episodes cache: true
    overview type: 'text'
  }

  static constraints = {
    title nullable: false, blank: false
    host nullable: true
    overview nullable: true, size: 0..5000
    cover_image nullable: true
    cover_image_src nullable: true
  }

  def getCoverPath() {
    if (this.cover_image) {
      return this.cover_image.src
    }
    return this.cover_image_src
  }

  def getEpisodeCount() {
    return AudioTrack.countByPodcastAndDeletedNotEqual(this, true)
  }
}
