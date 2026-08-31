'use strict';

angular.module('streama').controller('MovieDetailCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  '$stateParams',
  'apiService',
  function ($scope, $state, $rootScope, $stateParams, apiService) {

    $scope.currentMovie = null;
    $scope.relatedActors = [];
    $scope.loading = false;

    $scope.init = function () {
      if ($stateParams.id) {
        $scope.loading = true;
        apiService.movie.getMovie($stateParams.id).then(function (response) {
          $scope.currentMovie = response.data;
          $scope.fetchRelatedActors($stateParams.id);
          $scope.loading = false;
        }, function (error) {
          $scope.loading = false;
          console.error('Error loading movie:', error);
        });
      }
    };

    $scope.fetchRelatedActors = function (movieId) {
      apiService.movie.getRelatedActors(movieId).then(function (response) {
        $scope.relatedActors = response.data || [];
      }, function (error) {
        console.error('Error fetching related actors:', error);
        $scope.relatedActors = [];
      });
    };

    $scope.playMovie = function (movie) {
      $state.go('player', { videoId: movie.id });
    };

    $scope.markWatched = function (movie) {
      apiService.video.markWatched(movie.id).then(function () {
        movie.watched = true;
      });
    };

    $scope.init();
  }
]);
