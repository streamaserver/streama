

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
	}

}]);