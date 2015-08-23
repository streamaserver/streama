'use strict';

streamaApp.controller('dashCtrl', [
  '$scope', 'apiService', '$state', '$rootScope', 'localStorageService', 'modalService',
  function ($scope, apiService, $state, $rootScope, localStorageService, modalService) {
	$scope.loading = true;

  if($rootScope.baseData.redirected){
    var originUrl = localStorageService.get('originUrl');
    if(originUrl){
      location.href = originUrl;
    }else{
      location.href = location.href.replace('?redirected=true', '');
    }

  }

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
    alertify.confirm("Are you sure you want to mark this video as completed? It will get removed from this list and the lists below. But you can still search for it above.", function (confirmed) {
      if(confirmed){
        apiService.viewingStatus.markCompleted(viewingStatus).success(function (data) {
          _.remove($scope.continueWatching, {'id': data.id});
        });
      }
    })
  };



  apiService.video.dash()
    .success(function (data) {
      $scope.episodes = data.firstEpisodes;
      $scope.continueWatching = data.continueWatching;
      $scope.movies = data.movies;
      $scope.loading = false;
    })
    .error(function () {
      alertify('A server error occured.');
      $scope.loading = false;
    });

}]);
