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

  $scope.showDetails = function (media) {
    modalService.mediaDetailModal(media);
  };


  $scope.markCompleted = function (viewingStatus) {
    alertify.confirm("Are you sure you want to mark this video as completed?", function (confirmed) {
      if(confirmed){
        apiService.viewingStatus.delete(viewingStatus).success(function (data) {
          _.remove($scope.continueWatching, {'id': data.id});
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
