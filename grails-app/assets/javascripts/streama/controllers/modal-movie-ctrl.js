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

  apiService.theMovieDb.hasKey().success(function (data) {
    if (!data.key) {
      $scope.hasMovieDBKey = false;
    }
  });

	$scope.saveMovie = function (movie) {
		apiService.movie.save(movie).success(function (data) {
			$uibModalInstance.close(data);
      alertify.success("Movie saved.");
		});
	};

	$scope.toggleAddManually = function () {
		$scope.addManually = !$scope.addManually;
	};


	$scope.selectFromAPI = function ($item) {
		console.log('%c selectFromAPI', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
		var apiId = $item.id;
		delete $item.id;
		$scope.movie = $item;
		$scope.movie.apiId = apiId;
		$scope.addManually = false;
		$scope.hasMovieDBKey = true;

		$scope.formVisible = true;
	};

	$scope.search = function (query) {
		return apiService.theMovieDb.search('movie', query).then(function (data) {
			return data.data;
		});
	};



		$scope.imageUpload = {};
		$scope.uploadImage = function (files, type) {
			uploadService.doUpload($scope.imageUpload, 'file/upload.json', function (data) {
				$scope.imageUpload.percentage = null;
				if(data.error) return

				$scope.movie[type] = data;
				$scope.movie[type+'_src'] = data.src;
			}, function () {}, files);
		};

		$scope.onTagSelect = function (tag) {
			apiService.tag.save(tag);
			apiService.movie.save($scope.movie);
		};

		$scope.tagTransform = function (newTag) {
			var item = {
				name: newTag,
				isNew: true
			};

			return item;
		};

		$scope.deleteTag = function (tag) {
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
			alertify.confirm('Are you sure you want to delete the tag ' + tag.name, function (confirmed) {
				if(confirmed){
					apiService.tag.delete(tag.id).success(function () {
						_.remove($scope.tags, {id: tag.id});
					})
				}
			});
		};

		apiService.tag.list().success(function (data) {
			$scope.tags = data;
		});


		setTimeout(function () {
		$('.name-input').focus();
	}, 200);


	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	function chooseNewBackdrop() {
    modalService.openImageChooser('movie', $scope.movie);
  }
}]);
