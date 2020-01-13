
angular.module('streama').factory('Report', function ($resource) {

  var baseUrl = 'report/';

  var params = {};

  var actions = {
    "list": {
      method: "GET",
      isArray: true,
      url:  'report.json'
    },
    "reportsById":{
      method:"GET",
      url: baseUrl + 'reportsById.json'
    },
    "save": {
      method: "PUT",
      url:  baseUrl + 'save.json'
    },
    "resolve": {
      method: "POST",
      url:  baseUrl + 'resolve.json'
    },
    "unresolve": {
      method: "POST",
      url:  baseUrl + 'unresolve.json'
    },
    "resolveMultiple": {
      method: "POST",
      url:  baseUrl + 'resolveMultiple.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
