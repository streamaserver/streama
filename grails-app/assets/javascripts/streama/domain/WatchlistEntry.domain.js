
angular.module('streama').factory('WatchlistEntry', function ($resource) {

  var baseUrl = 'watchlistEntry/';

  return $resource('NO_CRUD', {}, {
    "create": {
      method: "POST",
      url:  'watchlistEntry/create'
    },
    "delete": {
      method: "DELETE",
      url: 'watchlistEntry/delete'
    },
    "list": {
      method: "GET",
      url:  'watchlistEntry/list'
    }
  });
});
