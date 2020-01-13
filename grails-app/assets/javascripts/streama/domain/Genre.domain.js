
angular.module('streama').factory('Genre', function ($resource) {

  var baseUrl = 'genre/';

  var params = {};

  var actions = {
    "get": {
      method: "POST",
      url:  baseUrl + 'show.json'
    },
    "list": {
      method: "GET",
      isArray: true,
      url:  'genre.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
