'use strict';

angular.module('streama').controller('modalTvShowCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'tvShow',
	function ($scope, $uibModalInstance, apiService, tvShow) {

  $scope.loading = false;
  $scope.tvShow = tvShow || {};
  $scope.hasMovieDBKey = true;

  apiService.theMovieDb.hasKey().success(function (data) {
    if (!data.key) {
      $scope.tvShow.manualInput = true;
      $scope.hasMovieDBKey = false;
    }
  });

	$scope.toggleAddManually = function () {
		$scope.tvShow.manualInput = !$scope.tvShow.manualInput;
  };

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
		$scope.hasMovieDBKey = true;
		$scope.tvShow.manualInput = false;
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
