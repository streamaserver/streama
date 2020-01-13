
angular.module('streama').factory('Profile', function ($resource) {

  var baseUrl = 'profile/';

  var params = {};

  var actions = {

    "save": {
      method: "POST",
      url: baseUrl + 'save.json'
    },
    "update": {
      method: "PUT",
      url: baseUrl + 'update.json'
    },
    "delete": {
      method: "DELETE",
      url:  baseUrl + 'delete.json'
    },
    "getUserProfiles": {
      method: "GET",
      isArray: true,
      url: baseUrl + 'getUserProfiles.json'
    }
  };


  return $resource(baseUrl, params, actions);
});
