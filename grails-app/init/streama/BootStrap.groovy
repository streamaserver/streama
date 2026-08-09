package streama

class BootStrap {

    def marshallerService
    def defaultDataService
    def migrationService

    def init = { servletContext ->
        marshallerService.init()
        if(!Role.findByAuthority("ROLE_ADMIN")){  //this assumes that first-time init is done
          defaultDataService.createDefaultRoles()
          defaultDataService.createDefaultUsers()
        }

        migrationService.importMovieDbGenres()
        defaultDataService.createDefaultSettings()
        migrationService.setDefaultDeletedFlag()
        migrationService.setTrailerForMovies()
        migrationService.addGenresToMoviesAndShows()
        migrationService.setTheMovieDBKey()
        migrationService.fixLogoValue()   //2017-03-04
        migrationService.urlvalidationFix()
        migrationService.updateBaseUrlHelp()
        migrationService.migrateMergedSeasonEpisode()
        migrationService.setupBasicSubProfiles()
        migrationService.addProfilesToViewingStatusRecords()
        migrationService.migrateContinueWatchingActiveFlag()

        migrationService.dbMigrations()
    }
    def destroy = {
    }
}
