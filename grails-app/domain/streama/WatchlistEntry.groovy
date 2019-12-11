package streama

class WatchlistEntry {
  Date dateCreated
  Date lastUpdated
  boolean isDeleted = false

  User user
  Profile profile
  Video video
  TvShow tvShow

    static constraints = {
      dateCreated nullable: true
      lastUpdated nullable: true
      isDeleted nullable: false
      user nullable: false
      profile nullable: false
    }
}
