
angular.module('streama').factory('Dash', function ($resource) {

  var baseUrl = 'dash/';

  var params = {};

  var actions = {
    "searchMedia": {
      method: "GET",
      url:  baseUrl + 'searchMedia.json'
    },
    "listContinueWatching": {
      method: "GET",
      url:  baseUrl + 'listContinueWatching.json',
      isArray: true
    },
    "listMovies": {
      method: "GET",
      url:  baseUrl + 'listMovies.json'
    },
    "listShows": {
      method: "GET",
      url:  baseUrl + 'listShows.json'
    },
    "firstEpisodeForShow": {
      method: "GET",
      url:  baseUrl + 'firstEpisodeForShow.json'
    },
    "listGenres": {
      method: "GET",
      url:  baseUrl + 'listGenres.json',
      isArray: true
    },
    "listGenericVideos": {
      method: "GET",
      url:  baseUrl + 'listGenericVideos.json'
    },
    "listNewReleases": {
      method: "GET",
      url:  baseUrl + 'listNewReleases.json',
      isArray: true
    },
    "listRecommendations": {
      method: "GET",
      url:  baseUrl + 'listRecommendations.json',
      isArray: true
    }
  };

  return $resource(baseUrl, params, actions);
});
