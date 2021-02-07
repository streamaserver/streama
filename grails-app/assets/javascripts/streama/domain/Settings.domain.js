
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
      url:  baseUrl + 'updateMultiple.json',
      isArray: true
    },
    "list": {
      method: "GET",
      url: 'settings.json',
      isArray: true
    },
  };


  return $resource(baseUrl, params, actions);
});
