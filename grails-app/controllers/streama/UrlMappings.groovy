package streama

class UrlMappings {
    static excludes = ["/dbconsole*"]

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }


        "/api/v1/validateDomain"(controller: 'api', action: 'validateDomain')
        "/api/v1/getInfo"(controller: 'api', action: 'getInfo')
        "/api/v1/currentUser"(controller: 'api', action: 'currentUser')

        "/api/v1/dash/listContinueWatching"(controller: 'dash', action: 'listContinueWatching')
        "/api/v1/dash/listShows"(controller: 'dash', action: 'listShows')
        "/api/v1/dash/listMovies"(controller: 'dash', action: 'listMovies')
        "/api/v1/dash/listGenericVideos"(controller: 'dash', action: 'listGenericVideos')
        "/api/v1/dash/listNewReleases"(controller: 'dash', action: 'listNewReleases')
        "/api/v1/dash/listRecommendations"(controller: 'dash', action: 'listRecommendations')
        "/api/v1/dash/mediaDetail"(controller: 'dash', action: 'mediaDetail')
        "/api/v1/dash/listEpisodesForShow"(controller: 'dash', action: 'listEpisodesForShow')
        "/api/v1/dash/continueWatching"(controller: 'dash', action: 'continueWatching')
        "/api/v1/dash/markAsCompleted"(controller: 'dash', action: 'markAsCompleted')
        "/api/v1/dash/listGenres"(controller: 'dash', action: 'listGenres')

        "/api/v1/player/video/$id"(controller: 'player', action: 'video')
        "/api/v1/player/updateViewingStatus"(controller: 'player', action: 'updateViewingStatus')

        "/"(view: '/index')
        "500"(view: '/error')
//        "404"(view: '/notFound')
    }


}
