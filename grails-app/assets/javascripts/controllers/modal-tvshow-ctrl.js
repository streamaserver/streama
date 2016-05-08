'use strict';

streamaApp.controller('modalTvShowCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'tvShow',
	function ($scope, $uibModalInstance, apiService, tvShow) {

	$scope.toggleAddManually = function () {
		$scope.tvShow.manualInput = !$scope.tvShow.manualInput;
	};


	$scope.loading = false;
	$scope.tvShow = tvShow || {};

	$scope.saveShow = function (video) {
		apiService.tvShow.save(video).success(function (data) {
			$uibModalInstance.close(data);
      alertify.success("TV Show saved.");
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
		$uibModalInstance.dismiss('cancel');
	};
}]);
