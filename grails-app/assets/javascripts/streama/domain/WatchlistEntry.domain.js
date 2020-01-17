
angular.module('streama').factory('WatchlistEntry', function ($resource) {

  var baseUrl = 'watchlistEntry/';

  var params = {};

  var actions = {
    "create": {
      method: "POST",
      url:  baseUrl + 'save.json'
    },
    "delete": {
      method: "DELETE",
      url: baseUrl + 'delete.json'
    },
    "list": {
      method: "GET",
      url:  baseUrl + 'list.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
