
angular.module('streama').factory('Tag', function ($resource) {

  var baseUrl = 'tag/';

  var params = {};

  var actions = {
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
      url:  'tag.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
