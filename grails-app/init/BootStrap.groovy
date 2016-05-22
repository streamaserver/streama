class BootStrap {

    def marshallerService
    def defaultDataService
    def migrationService

    def init = { servletContext ->
        marshallerService.init()
        defaultDataService.createDefaultRoles()
        defaultDataService.createDefaultUsers()
        defaultDataService.createDefaultSettings()
        migrationService.setDefaultDeletedFlag()
        migrationService.setTrailerForMovies()
        migrationService.importMovieDbGenres()
        migrationService.addGenresToMoviesAndShows()
    }
    def destroy = {
    }
}
