'use strict';

angular.module('streama').controller('modalTvShowCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'tvShow',
	function ($scope, $uibModalInstance, apiService, tvShow) {

  $scope.loading = false;
  $scope.tvShow = tvShow || {};
  $scope.hasMovieDBKey = true;

	$scope.cancel = cancel;
	$scope.saveShow = saveShow;
	$scope.selectFromAPI = selectFromAPI;
	$scope.search = search;
	$scope.toggleAddManually = toggleAddManually;

	init();

  function init(){
    apiService.genres.list().then(function (data) {
      $scope.genres = data.data;
    });

		apiService.theMovieDb.hasKey().then(function (data) {
			if (!data.data.key) {
				$scope.tvShow.manualInput = true;
				$scope.hasMovieDBKey = false;
			}
		});

		setTimeout(function () {
			$('.name-input').focus();
		}, 200);
	}

	function toggleAddManually() {
		$scope.tvShow.manualInput = !$scope.tvShow.manualInput;
	}

	function saveShow(video) {
		apiService.tvShow.save(video).then(function (data) {
			$uibModalInstance.close(data.data);
			alertify.success("TV Show saved.");
		});
	}

	function selectFromAPI($item) {
		var apiId = $item.id;
		delete $item.id;
		$scope.tvShow = $item;
		$scope.tvShow.apiId = apiId;
		$scope.hasMovieDBKey = true;
		$scope.tvShow.manualInput = false;
	}

	function search(query) {
		return apiService.theMovieDb.search('tv', query).then(function (data) {
			return data.data;
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}]);
