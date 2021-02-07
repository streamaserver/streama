
angular.module('streama').factory('TheMovieDB', function ($resource) {

  var baseUrl = 'theMovieDb/';

  var params = {};

  var actions = {
    "hasKey": {
      method: "GET",
      url:  baseUrl + 'hasKey'
    },
    "search": {
      method: "GET",
      url:  baseUrl + 'search',
      isArray: true
    },
    "seasonNumberForShow": {
      method: "GET",
      url:  baseUrl + 'seasonNumberForShow'
    },
    "seasonForShow": {
      method: "GET",
      url:  baseUrl + 'seasonForShow'
    },
    "availableGenres": {
      method: "GET",
      url:  baseUrl + 'availableGenres',
      isArray: true
    },
    "countNewEpisodesForSeason": {
      method: "GET",
      url:  baseUrl + 'countNewEpisodesForSeason'
    },
    "imagesForMedia": {
      method: "GET",
      url:  baseUrl + 'imagesForMedia'
    },
    "checkAndFixImageIntegrity": {
      method: "POST",
      url:  baseUrl + 'checkAndFixImageIntegrity'
    },
    "pollImageIntegrityFix": {
      method: "GET",
      url:  baseUrl + 'pollImageIntegrityFix'
    },
  };

  return $resource(baseUrl, params, actions);
});
