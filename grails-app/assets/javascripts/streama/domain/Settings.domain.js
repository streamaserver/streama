
angular.module('streama').factory('Settings', function ($resource) {

  var baseUrl = 'settings/';

  var params = {};

  var actions = {
    "validateSettings": {
      method: "POST",
      url: baseUrl + 'validateSettings.json'
    },
    "updateMultiple": {
      method: "POST",
      url:  baseUrl + 'updateMultiple.json'
    },
    "list": {
      method: "GET",
      url: 'settings.json'
    },
  };


  return $resource(baseUrl, params, actions);
});
