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
