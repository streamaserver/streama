'use strict';

streamaApp.controller('dashCtrl', ['$scope', 'apiService', '$state', '$rootScope', function ($scope, apiService, $state, $rootScope) {
	$scope.loading = true;



  apiService.settings.list().success(function (data) {
    var TheMovieDbAPI = _.find(data, {settingsKey: 'TheMovieDB API key'});

    if(!TheMovieDbAPI.value){
      alertify.alert('You need to fill out some required base-settings. You will be redirected to the settings page now.', function () {
        $state.go('admin.settings');
      });
    }
  });

  //if($rootScope.currentUser.isAdmin){ }


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
