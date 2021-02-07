
angular.module('streama').factory('Dash', function ($resource) {

  var baseUrl = 'dash/';

  var params = {};

  var actions = {
    "searchMedia": {
      method: "GET",
      url:  baseUrl + 'searchMedia'
    },
    "listContinueWatching": {
      method: "GET",
      url:  baseUrl + 'listContinueWatching',
      isArray: true
    },
    "listMovies": {
      method: "GET",
      url:  baseUrl + 'listMovies'
    },
    "listShows": {
      method: "GET",
      url:  baseUrl + 'listShows'
    },
    "firstEpisodeForShow": {
      method: "GET",
      url:  baseUrl + 'firstEpisodeForShow'
    },
    "randomEpisodeForShow": {
      method: "GET",
      url:  baseUrl + 'randomEpisodeForShow'
    },
    "listGenres": {
      method: "GET",
      url:  baseUrl + 'listGenres',
      isArray: true
    },
    "listGenericVideos": {
      method: "GET",
      url:  baseUrl + 'listGenericVideos'
    },
    "listNewReleases": {
      method: "GET",
      url:  baseUrl + 'listNewReleases',
      isArray: true
    },
    "listRecommendations": {
      method: "GET",
      url:  baseUrl + 'listRecommendations',
      isArray: true
    }
  };

  return $resource(baseUrl, params, actions);
});
