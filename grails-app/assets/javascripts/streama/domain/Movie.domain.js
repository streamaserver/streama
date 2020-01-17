
angular.module('streama').factory('Movie', function ($resource) {

  var baseUrl = 'movie/';

  var params = {};

  var actions = {
    "get": {
      method: "GET",
      url:  baseUrl + 'show.json'
    },
    "getsimilar": {
      method: "GET",
      url:  baseUrl + 'getsimilar.json'
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
      url:  'movie.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
