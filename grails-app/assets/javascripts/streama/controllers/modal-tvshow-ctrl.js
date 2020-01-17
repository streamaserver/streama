'use strict';

angular.module('streama').controller('modalTvShowCtrl', [
	'$scope', '$uibModalInstance', 'tvShow', 'Genre', 'TvShow', 'TheMovieDB',
	function ($scope, $uibModalInstance, tvShow, Genre, TvShow, TheMovieDB) {

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
    Genre.list().$promise.then(function (data) {
      $scope.genres = data;
    });

		TheMovieDB.hasKey().$promise.then(function (data) {
			if (!data.key) {
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
		TvShow.save({}, video).$promise.then(function (data) {
			$uibModalInstance.close(data);
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
		return TheMovieDB.search( {type: 'tv', name: query}).$promise.then(function (data) {
			return data;
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

}]);
