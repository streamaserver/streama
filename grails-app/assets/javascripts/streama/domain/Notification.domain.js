
angular.module('streama').factory('Notification', function ($resource) {

  var baseUrl = 'notificationQueue/';

  var params = {};

  var actions = {
    "delete": {
      method: "DELETE",
      url: baseUrl + 'delete.json'
    },
    "list": {
      method: "GET",
      isArray: true,
      url:  baseUrl + 'index.json'
    },
    "listNewReleases": {
      method: "GET",
      isArray: true,
      url:  baseUrl + 'listNewReleases.json'
    },
    "addMovieToCurrentNotification": {
      method: "GET",
      isArray: true,
      url:  baseUrl + 'addMovieToCurrentNotification.json'
    },
    "addTvShowToCurrentNotification": {
      method: "GET",
      isArray: true,
      url:  baseUrl + 'addTvShowToCurrentNotification.json'
    },
  };

  return $resource(baseUrl, params, actions);
});
