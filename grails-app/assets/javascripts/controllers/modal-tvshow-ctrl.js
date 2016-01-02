'use strict';

streamaApp.controller('modalTvShowCtrl', [
	'$scope', '$modalInstance', 'apiService', 'tvShow',
	function ($scope, $modalInstance, apiService, tvShow) {

	$scope.toggleAddManually = function () {
		$scope.tvShow.manualInput = !$scope.tvShow.manualInput;
	};


	$scope.loading = false;
	$scope.tvShow = tvShow || {};

	$scope.saveShow = function (video) {
		apiService.tvShow.save(video).success(function (data) {
			$modalInstance.close(data);
		});
	};

	$scope.selectFromAPI = function ($item) {
		var apiId = $item.id;
		delete $item.id;
		$scope.tvShow = $item;
		$scope.tvShow.apiId = apiId;
	};


	$scope.search = function (query) {
		return apiService.theMovieDb.search('tv', query).then(function (data) {
			return data.data;
		});
	};


	setTimeout(function () {
		$('.name-input').focus();
	}, 200);


	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
