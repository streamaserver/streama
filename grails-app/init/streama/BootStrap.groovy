package streama

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
        migrationService.setTheMovieDBKey()
        migrationService.fixLogoValue()   //2017-03-04
        migrationService.urlvalidationFix()
        migrationService.updateBaseUrlHelp()
        migrationService.migrateMergedSeasonEpisode()
        migrationService.setupBasicSubProfiles()
    }
    def destroy = {
    }
}
