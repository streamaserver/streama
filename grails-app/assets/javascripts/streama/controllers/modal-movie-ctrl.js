'use strict';

angular.module('streama').controller('modalMovieCtrl', [
	'$scope', '$uibModalInstance', 'movie', '$state', 'uploadService', 'modalService', 'Genre', 'TheMovieDB', 'Tag', 'Movie',
	function ($scope, $uibModalInstance, movie, $state, uploadService, modalService, Genre, TheMovieDB, Tag, Movie) {
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
		Genre.list().$promise.then(function (data) {
			$scope.genres = data;
		});

		TheMovieDB.hasKey().$promise.then(function (response) {
			if (!response.key) {
				$scope.hasMovieDBKey = false;
				$scope.addManually = true;
			}
		});

		Tag.list().$promise.then(function (response) {
			$scope.tags = response;
		});

		setTimeout(function () {
			$('.name-input').focus();
		}, 200);
	}

	function saveMovie(movie) {
		Movie.save({}, movie).$promise.then(function (response) {
			$uibModalInstance.close(response);
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
		return TheMovieDB.search({type: 'movie', name: query}).$promise.then(function (data) {
			return data;
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
		Tag.save({}, tag);
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
				Tag.delete({id: tag.id}).$promise.then(function () {
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
