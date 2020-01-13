
angular.module('streama').factory('User', function ($resource) {

  var baseUrl = 'user/';

  var params = {};

  var actions = {
    "currentUser": {
      method: "GET",
      url: 'user/current.json',
      isArray: false
    },
    "save": {
      method: "POST",
      url: baseUrl + 'save.json'
    },
    "delete": {
      method: "DELETE",
      url:  baseUrl + 'delete.json'
    },
    "list": {
      method: "GET",
      isArray: true,
      url: 'user.json'
    },
    "checkAvailability": {
      method: "GET",
      url: baseUrl + 'checkAvailability.json'
    },
    "saveAndCreateUser": {
      method: "POST",
      url:  baseUrl + 'saveAndCreateUser.json'
    },
    "saveAndInviteUser": {
      method: "POST",
      url:  baseUrl + 'saveAndInviteUser.json'
    },
    "saveProfile": {
      method: "POST",
      url:  baseUrl + 'saveProfile.json'
    },
    "availableRoles": {
      method: "GET",
      url:  baseUrl + 'availableRoles.json'
    },
    "changePassword": {
      method: "POST",
      url:  baseUrl + 'changePassword.json'
    },
    "userActivity": {
      method: "GET",
      url:  'userActivity.json'
    }

  };


  return $resource(baseUrl, params, actions);
});
