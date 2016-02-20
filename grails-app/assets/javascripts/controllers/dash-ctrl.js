'use strict';

streamaApp.controller('dashCtrl', [
  '$scope', 'apiService', '$state', '$rootScope', 'localStorageService', 'modalService',
  function ($scope, apiService, $state, $rootScope, localStorageService, modalService) {


  if($rootScope.currentUser.isAdmin){
    apiService.settings.list().success(function (data) {
      var TheMovieDbAPI = _.find(data, {settingsKey: 'TheMovieDB API key'});

      if(!TheMovieDbAPI.value){
        alertify.alert('You need to fill out some required base-settings. You will be redirected to the settings page now.', function () {
          $state.go('admin.settings');
        });
      }
    });
  }
    
  $scope.fetchFirstEpisodeAndPlay = function (tvShow) {
    apiService.dash.firstEpisodeForShow(tvShow.id).success(function (data) {
      console.log('%c data', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', data);
      $state.go('player', {videoId: data.id});
    });
  };

  $scope.showDetails = function (media) {
    modalService.mediaDetailModal(media);
  };


  $scope.markCompleted = function (viewingStatus) {
    alertify.confirm("Are you sure you want to mark this video as completed?", function (confirmed) {
      if(confirmed){
        apiService.viewingStatus.delete(viewingStatus.id).success(function (data) {
          _.remove($scope.continueWatching, {'id': viewingStatus.id});
        });
      }
    })
  };

  apiService.dash.listContinueWatching().success(function (data) {
    $scope.continueWatching = data;
  });

  apiService.dash.listShows().success(function (data) {
    $scope.tvShows = data;
  });

  apiService.dash.listMovies().success(function (data) {
    $scope.movies = data;
  });


}]);
