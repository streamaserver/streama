modules = {
    core {
        dependsOn 'jquery, common'
        resource url: '/css/main.css'
        resource url: '/css/errors.css'
        resource url: '/css/main-classes.css'
        resource url: '/js/jquery-2.2.0.min.js'
        resource url: '/js/bootstrap.min.js'
        resource url: '/js/bootstrap-datetimepicker.js'
        resource url: '/js/common.js'
    }

    auth {
        dependsOn 'jquery, common'
        resource url: '/css/bootstrap-social.css'
        resource url: '/css/bootstrap-social.css'
    }

    videojs {
        dependsOn 'jquery'
        resource url: '/js/video.js'
    }

    angular {
        dependsOn 'jquery'
        resource url: '/js/angular.min.js'
        resource url: '/js/angular-animate.min.js'
        resource url: '/js/angular-route.min.js'
        resource url: '/js/angular-cookies.min.js'
        resource url: '/js/angular-resource.min.js'
        resource url: '/js/angular-translate.min.js'
        resource url: '/js/ng-file-upload-shim.min.js'
        resource url: '/js/ng-file-upload.min.js'
        resource url: '/js/ui-bootstrap-tpls.min.js'
        resource url: '/js/pagination.js'
        resource url: '/js/dirPagination.js'
        resource url: '/js/messages_en.js'
        resource url: '/js/messages_de.js'
        resource url: '/js/messages_es.js'
        resource url: '/js/messages_pt.js'
        resource url: '/js/messages_fr.js'
        resource url: '/js/messages_nl.js'
        resource url: '/js/messages_it.js'
        resource url: '/js/angular-ui.min.js'
    }

    app {
        dependsOn 'jquery, common, videojs, angular'
        resource url: '/css/player.css'
        resource url: '/css/video-js.css'
        resource url: '/js/app.js'
        resource url: '/js/services/playerServices.js'
        resource url: '/js/services/authServices.js'
        resource url: '/js/services/showServices.js'
        resource url: '/js/services/resourceServices.js'
        resource url: '/js/services/settingsServices.js'
        resource url: '/js/services/videoServices.js'
        resource url: '/js/services/partyServices.js'
        resource url: '/js/services/adminServices.js'
        resource url: '/js/directives/streamaDirective.js'
        resource url: '/js/directives/playerDirective.js'
    }
}