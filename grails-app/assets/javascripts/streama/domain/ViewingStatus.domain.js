
angular.module('streama').factory('ViewingStatus', function ($resource) {

  var baseUrl = 'viewingStatus/';

  var params = {};

  var actions = {
    "save": {
      method: "GET",
      url:  baseUrl + 'save.json'
    },
    "markCompleted": {
      method: "GET",
      url: baseUrl + 'markCompleted.json'
    },
    "delete": {
      method: "DELETE",
      url: baseUrl + 'delete.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
