'use strict';

streamaApp.controller('modalMovieCtrl', [
	'$scope', '$modalInstance', 'apiService', 'movie',
	function ($scope, $modalInstance, apiService, movie) {
	$scope.loading = false;
		
	$scope.movie = movie || {};

	$scope.saveMovie = function (movie) {
		apiService.movie.save(movie).success(function (data) {
			$modalInstance.close(data);
		});
	};

	$scope.toggleAddManually = function () {
		$scope.addManually = !$scope.addManually;
	};


	$scope.selectFromAPI = function ($item) {
		var apiId = $item.id;
		delete $item.id;
		$scope.movie = $item;
		$scope.movie.apiId = apiId;
		
		$scope.formVisible = true;
	};

	$scope.search = function (query) {
		return apiService.theMovieDb.search('movie', query).then(function (data) {
			return data.data;
		});
	};
		
	$scope.deleteMovie = function(movie){
		alertify.confirm("Are you sure, you want to delete this Episode?", function (confirmed) {
			if(confirmed){
				apiService.movie.delete(movie.id).success(function () {
					$modalInstance.close({deleted: true});
				});
			}
		})
		
	};
		
	setTimeout(function () {
		$('.name-input').focus();
	}, 200);

	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);