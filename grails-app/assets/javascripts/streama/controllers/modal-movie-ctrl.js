'use strict';

angular.module('streama').controller('modalMovieCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'movie', '$state', 'uploadService', 'modalService',
	function ($scope, $uibModalInstance, apiService, movie, $state, uploadService, modalService) {
	$scope.loading = false;

	$scope.movie = movie || {};
	$scope.movieDB = true;
	$scope.hasMovieDBKey = true;
  $scope.addManually = ($scope.movie.id && !$scope.movie.apiId);
	$scope.chooseNewBackdrop = chooseNewBackdrop;

	$scope.imageUpload = {};
	$scope.uploadImage = uploadImage;
	$scope.saveMovie = saveMovie;
	$scope.toggleAddManually = toggleAddManually;
	$scope.selectFromAPI = selectFromAPI;
	$scope.search = search;
	$scope.onTagSelect = onTagSelect;
	$scope.tagTransform = tagTransform;
	$scope.deleteTag = deleteTag;
	$scope.cancel = cancel;

	init();

	function init() {
		apiService.genres.list().then(function (data) {
			$scope.genres = data.data;
		});

		apiService.theMovieDb.hasKey().then(function (response) {
			if (!response.data.key) {
				$scope.hasMovieDBKey = false;
				$scope.addManually = true;
			}
		});

		apiService.tag.list().then(function (response) {
			$scope.tags = response.data;
		});

		setTimeout(function () {
			$('.name-input').focus();
		}, 200);
	}

	function saveMovie(movie) {
		apiService.movie.save(movie).then(function (response) {
			$uibModalInstance.close(response.data);
			alertify.success("Movie saved.");
		});
	}

	function toggleAddManually() {
		$scope.addManually = !$scope.addManually;
	}
	function selectFromAPI($item) {
		console.log('%c selectFromAPI', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
		var apiId = $item.id;
		delete $item.id;
		$scope.movie = $item;
		$scope.movie.apiId = apiId;
		$scope.addManually = false;
		$scope.hasMovieDBKey = true;

		$scope.formVisible = true;
	}
	function search(query) {
		return apiService.theMovieDb.search('movie', query).then(function (data) {
			return data.data;
		});
	}

	function uploadImage(files, type) {
		uploadService.doUpload($scope.imageUpload, 'file/upload.json', function (data) {
			$scope.imageUpload.percentage = null;
			if(data.error) return

			$scope.movie[type] = data;
			$scope.movie[type+'_src'] = data.src;
		}, function () {}, files);
	}

	function onTagSelect(tag) {
		apiService.tag.save(tag);
	}

	function tagTransform(newTag) {
		var item = {
			name: newTag,
			isNew: true
		};

		return item;
	}

	function deleteTag(tag) {
		alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete the tag ' + tag.name, function (confirmed) {
			if(confirmed){
				apiService.tag.delete(tag.id).then(function () {
					_.remove($scope.tags, {id: tag.id});
				})
			}
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	function chooseNewBackdrop() {
    modalService.openImageChooser('movie', $scope.movie);
  }
}]);
