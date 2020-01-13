
angular.module('streama').factory('TvShow', function ($resource) {

  var baseUrl = 'tvShow/';

  var params = {};

  var actions = {
    "get": {
      method: "GET",
      url: baseUrl + 'show.json'
    },
    "save": {
      method: "POST",
      url:  baseUrl + 'save.json'
    },
    "delete": {
      method: "DELETE",
      url: baseUrl + 'delete.json'
    },
    "episodesForTvShow": {
      method: "GET",
      url:  baseUrl + 'episodesForTvShow.json'
    },
    "list": {
      method: "GET",
      isArray: true,
      url:  'tvShow.json'
    },
    "adminEpisodesForTvShow": {
      method: "GET",
      url:  baseUrl + 'adminEpisodesForTvShow.json'
    },
    "removeSeason": {
      method: "GET",
      url:  baseUrl + 'removeSeason.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
