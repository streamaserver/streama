//= wrapped

/*
    NOTE: This file is used by the create-ng-domain action.
    You can modify or extend the DomainServiceFactory but it is recommended that you not delete it.
*/

angular
    .module("streama.core")
    .factory("DomainServiceFactory", DomainServiceFactory);

function DomainServiceFactory($resource) {
    return function(url, paramDefaults, actions, options) {
        var resourceActions = {"update": {method: "PUT"}, "list": {method: "GET", isArray: true}};
        angular.extend(resourceActions, actions);

        return $resource(
            url,
            paramDefaults || null,
            resourceActions,
            options || {}
        );
    }
}

