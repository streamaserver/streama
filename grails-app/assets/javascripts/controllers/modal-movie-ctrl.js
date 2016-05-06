'use strict';

streamaApp.controller('modalMovieCtrl', [
	'$scope', '$modalInstance', 'apiService', 'movie', '$state', 'uploadService',
	function ($scope, $modalInstance, apiService, movie, $state, uploadService) {
	$scope.loading = false;

	$scope.movie = movie || {};

	$scope.saveMovie = function (movie) {
		apiService.movie.save(movie).success(function (data) {
			$modalInstance.close(data);
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

		$scope.formVisible = true;
	};

	$scope.search = function (query) {
		return apiService.theMovieDb.search('movie', query).then(function (data) {
			return data.data;
		});
	};

	$scope.deleteMovie = function(movie){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure, you want to delete this Movie?", function (confirmed) {
			if(confirmed){
				apiService.movie.delete(movie.id).success(function () {
					$state.go('admin.movies');
					$modalInstance.dismiss('cancel');
				});
			}
		})

	};

		$scope.imageUpload = {};
		$scope.uploadImage = function (files, type) {
			uploadService.doUpload($scope.imageUpload, 'file/upload.json', function (data) {
				$scope.imageUpload.percentage = null;
				$scope.movie[type] = data;
				$scope.movie[type+'_src'] = data.src;
			}, files);
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
		$modalInstance.dismiss('cancel');
	};
}]);
