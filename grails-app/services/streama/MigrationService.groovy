package streama

import grails.transaction.Transactional

@Transactional
class MigrationService {

  def theMovieDbService

  def setTheMovieDBKey() {
    def setting = Settings.list()

    setting.each {
      if (it.id == 2) {
        it.required = false
        it.save(failOnError: true)
      }
    }
  }

  def setDefaultDeletedFlag() {
    def videos = Video.findAllByDeletedIsNull()

    videos.each{
      it.deleted = false
      it.save(failOnError: true)
    }
  }

  def setTrailerForMovies() {
    def movies = Movie.findAllByTrailerKeyIsNull()

    movies.each{
      def trailer
      try{
        trailer = theMovieDbService.getTrailerForMovie(it.apiId)
      }catch (e){}
      it.trailerKey = trailer?.key
      it.save(failOnError: true)
    }
  }


  def importMovieDbGenres(){
    def movieGenres = theMovieDbService.getMovieGenres()
    def tvGenres = theMovieDbService.getTvGenres()
    def genres = movieGenres + tvGenres

    genres.each{
      if(Genre.findByApiId(it.apiId)){
        return
      }

      Genre genre = new Genre()
      genre.name = it.name
      genre.apiId = it.apiId
      genre.save(failOnError: true)
    }

    return genres
  }


  def addGenresToMoviesAndShows(){
    def movies = Movie.list()

    movies.each{ movie ->
      if(movie.genre){
        return
      }

      def metaData = movie.fullMovieMeta
      if(!metaData?.genres){
        return
      }

      metaData?.genres.each{ metaGenre ->
        log.info("genre: " + metaGenre.name + " for movie " + movie.title)
        Genre genre = Genre.findByApiId(metaGenre.id)
        if(!genre){
          log.error("Genre missing!: " + metaGenre.name)
          return
        }
        movie.addToGenre(genre)
      }

      movie.save(failOnError: true)
    }

    def tvShows = TvShow.list()

    tvShows.each{ tvShow ->
      if(tvShow.genre || !tvShow.apiId){
        return
      }
      def metaData = tvShow.fullTvShowMeta
      if(!metaData?.genres){
        return
      }

      metaData?.genres.each{ metaGenre ->
        log.info("genre: " + metaGenre.name + " for tvShow " + tvShow.name)
        Genre genre = Genre.findByApiId(metaGenre.id)

        if(!genre){
          log.error("Genre missing!: " + metaGenre.name)
          return
        }

        tvShow.addToGenre(genre)
      }

      tvShow.save(failOnError: true)
    }
  }

  def fixLogoValue(){
    Settings setting = Settings.findByName('logo')
    if(!setting.value){
      setting.value = '/assets/logo.png'
      setting.save()
    }

    if(!setting.defaultValue){
      setting.defaultValue = '/assets/logo.png'
      setting.save()
    }
  }
  def urlvalidationFix(){
    Settings setting = Settings.findBySettingsKey('Base URL')
    if(setting.validationRequired){
        setting.validationRequired = false
        setting.save()
    }
  }
  def updateBaseUrlHelp(){
    def newval = 'The Base-URL is used for the link in the invitation-email.'
    Settings setting = Settings.findBySettingsKey('Base URL')
    if(setting.description!=newval){
      setting.description = newval;
      setting.save()
    }
  }

  def migrateMergedSeasonEpisode(){
    List episodes = Episode.where{
      seasonEpisodeMerged == null
    }.list()

    episodes.each{ Episode episode ->
      episode.createMergedSeasonEpisode()
      episode.save(flush: true)
    }
  }

  def setupBasicSubProfiles() {
    List<User> users = User.where {
      def currentUser = User
      not{
        exists Profile.where {
          def profile = Profile
          def profileUser = user
          currentUser.id == profileUser.id
        }.id()
      }
    }.list()

    users.each { User user ->
      Profile p = new Profile(
        user: user,
        profileName: user.username,
        profileLanguage: user.language,
        isChild: false
      )
      p.save()
    }
  }

  def addProfilesToViewingStatusRecords() {
    List<User> users = User.where{
      def currentUser = User
      exists ViewingStatus.where {
        def viewingStatus = ViewingStatus
        def viewingStatusUser = user
        currentUser.id == viewingStatusUser.id
      }.id()
    }.list()

    users.each { User user ->
      List<ViewingStatus> views = ViewingStatus.findAllByUser(user)
      if(views.size() == 0) {
        return
      }

      views.each { ViewingStatus vs ->
        if(vs.profile){
          return
        }
        vs.profile = Profile.findByUser(user)
        vs.save()
      }
    }
  }


}
