
angular.module('streama').factory('Websocket', function ($resource) {

  var baseUrl = 'websocket/';

  var params = {};

  var actions = {
    "triggerPlayerAction": {
      method: "GET",
      url:  baseUrl + 'triggerPlayerAction.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
