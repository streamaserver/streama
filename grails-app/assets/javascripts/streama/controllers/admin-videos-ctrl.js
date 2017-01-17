

angular.module('streama').controller('adminVideosCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {

	$scope.loading = true;


	apiService.genericVideo.list().success(function (data) {
		$scope.videos = data;
		$scope.loading = false;
	});

	$scope.openGenericVideoModal = function () {
		modalService.genericVideoModal(null, function (data) {
			$state.go('admin.video', {videoId: data.id});
		});
	};

	$scope.addFromSuggested = function (movie, redirect) {
		var tempMovie = angular.copy(movie);
		var apiId = tempMovie.id;
		delete tempMovie.id;
		tempMovie.apiId = apiId;

		apiService.movie.save(tempMovie).success(function (data) {
			if(redirect){
				$state.go('admin.movie', {movieId: data.id});
			}else{
				$scope.movies.push(data);
			}
		});
	};

	$scope.alreadyAdded = function (movie) {
		console.log('%c movie', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', movie);
		return movie.id && _.find($scope.movies, {apiId: movie.id.toString()});
	};

}]);