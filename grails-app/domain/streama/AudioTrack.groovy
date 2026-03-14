package streama

class AudioTrack {

  Date dateCreated
  Date lastUpdated

  String title
  Integer trackNumber
  Integer duration // in seconds
  Boolean deleted = false

  Artist artist
  Album album
  Podcast podcast

  static hasMany = [files: File]

  static mapping = {
    cache true
    files cache: true
  }

  static constraints = {
    title nullable: false, blank: false
    artist nullable: true
    trackNumber nullable: true
    duration nullable: true
    album nullable: true
    podcast nullable: true
  }

  def hasFiles() {
    return files?.size() > 0
  }

  def getAudioFile() {
    return files?.find { it.extension?.toLowerCase() in ['.mp3', '.m4a', '.aac', '.ogg', '.flac', '.wav', '.wma'] }
  }

  String getDurationDisplay() {
    if (!duration) return '--:--'
    int minutes = (int) (duration / 60)
    int seconds = duration % 60
    return "${minutes}:${String.format('%02d', seconds)}"
  }
}
