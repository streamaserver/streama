

streamaApp.controller('adminMoviesCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {

	$scope.loading = true;


	apiService.movie.list().success(function (data) {
		$scope.movies = data;
		$scope.loading = false;
	});

	$scope.openMovieModal = function () {
		modalService.movieModal(null, function (data) {
			$state.go('admin.movie', {movieId: data.id});
		});
	};

	$scope.doSearch = function (query) {
		return apiService.theMovieDb.search('movie', query).then(function (data) {
			$scope.suggestedMovies = data.data;
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