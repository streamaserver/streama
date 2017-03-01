package streama

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }


        group "/api/v1", {
            "/validateDomain"(controller: 'api', action: 'validateDomain')
            "/currentUser"(controller: 'api', action: 'currentUser')

            group "/dash", {
                "listContinueWatching"(controller: 'dash', action: 'listContinueWatching')
                "listShows"(controller: 'dash', action: 'listShows')
                "listMovies"(controller: 'dash', action: 'listMovies')
                "listGenericVideos"(controller: 'dash', action: 'listGenericVideos')
                "listNewReleases"(controller: 'dash', action: 'listNewReleases')
                "listRecommendations"(controller: 'dash', action: 'listRecommendations')
                "mediaDetail"(controller: 'dash', action: 'mediaDetail')
            }

            group "/player", {
                "/video/$id"(controller: 'player', action: 'video')
            }
        }

        "/"(view: '/index')
        "500"(view: '/error')
//        "404"(view: '/notFound')
    }


}
