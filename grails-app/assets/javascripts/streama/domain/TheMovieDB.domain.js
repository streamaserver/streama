
angular.module('streama').factory('TheMovieDB', function ($resource) {

  var baseUrl = 'theMovieDb/';

  var params = {};

  var actions = {
    "hasKey": {
      method: "GET",
      url:  baseUrl + 'hasKey.json'
    },
    "search": {
      method: "GET",
      url:  baseUrl + 'search.json',
      isArray: true
    },
    "seasonNumberForShow": {
      method: "GET",
      url:  baseUrl + 'seasonNumberForShow.json'
    },
    "seasonForShow": {
      method: "GET",
      url:  baseUrl + 'seasonForShow.json'
    },
    "availableGenres": {
      method: "GET",
      url:  baseUrl + 'availableGenres.json',
      isArray: true
    },
    "countNewEpisodesForSeason": {
      method: "GET",
      url:  baseUrl + 'countNewEpisodesForSeason.json'
    },
    "imagesForMedia": {
      method: "GET",
      url:  baseUrl + 'imagesForMedia.json'
    },
  };

  return $resource(baseUrl, params, actions);
});
