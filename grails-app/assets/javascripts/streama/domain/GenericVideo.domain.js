
angular.module('streama').factory('GenericVideo', function ($resource) {

  var baseUrl = 'genericVideo/';

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
      url:  'genericVideo.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
