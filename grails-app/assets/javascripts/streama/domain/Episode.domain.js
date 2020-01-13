
angular.module('streama').factory('Episode', function ($resource) {

  var baseUrl = 'episode/';

  var params = {};

  var actions = {
    "get": {
      method: "GET",
      url:  baseUrl + 'show.json'
    },
    "save": {
      method: "POST",
      url:  baseUrl + 'save.json'
    },
    "delete": {
      method: "DELETE",
      url: baseUrl + 'delete.json'
    },
    "list": {
      method: "GET",
      isArray: true,
      url:  'episode.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
