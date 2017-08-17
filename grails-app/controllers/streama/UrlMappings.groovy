package streama

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }


        "/api/v1/validateDomain"(controller: 'api', action: 'validateDomain')
        "/api/v1/currentUser"(controller: 'api', action: 'currentUser')

        "/api/v1/dash/listContinueWatching"(controller: 'dash', action: 'listContinueWatching')
        "/api/v1/dash/listShows"(controller: 'dash', action: 'listShows')
        "/api/v1/dash/listMovies"(controller: 'dash', action: 'listMovies')
        "/api/v1/dash/listGenericVideos"(controller: 'dash', action: 'listGenericVideos')
        "/api/v1/dash/listNewReleases"(controller: 'dash', action: 'listNewReleases')
        "/api/v1/dash/listRecommendations"(controller: 'dash', action: 'listRecommendations')
        "/api/v1/dash/mediaDetail"(controller: 'dash', action: 'mediaDetail')
        "/api/v1/dash/listEpisodesForShow"(controller: 'dash', action: 'listEpisodesForShow')

        "/api/v1/player/video/$id"(controller: 'player', action: 'video')


        "/"(view: '/index')
        "500"(view: '/error')
//        "404"(view: '/notFound')
    }


}
