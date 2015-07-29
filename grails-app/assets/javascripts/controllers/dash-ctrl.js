'use strict';

streamaApp.controller('dashCtrl', ['$scope', 'apiService', function ($scope, apiService) {
	$scope.loading = true;
	
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