'use strict';

angular.module('streama').controller('modalGenericVideoCtrl', [
	'$scope', '$uibModalInstance', 'video', 'uploadService', 'GenericVideo', 'Genre', 'Movie', 'Tag',
	function ($scope, $uibModalInstance, video, uploadService, GenericVideo, Genre, Movie, Tag) {
	$scope.loading = false;

	$scope.video = video || {};

	$scope.saveVideo = function (video) {
		GenericVideo.save({}, video).$promise.then(function (response) {
			$uibModalInstance.close(response);
		});
	};


	$scope.imageUpload = {};

	$scope.uploadImage = function (files, type) {
		uploadService.doUpload($scope.imageUpload, 'file/upload.json', function (data) {
			$scope.imageUpload.percentage = null;

			if(data.error) return

			console.log('%c type', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', type);
			$scope.video[type] = data;
			$scope.video[type+'_src'] = data.src;
		}, function () {}, files);
	};



	Genre.list().$promise.then(function (data) {
		$scope.genres = data;
	});


	$scope.deleteMovie = function(movie){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure, you want to delete this Episode?", function (confirmed) {
			if(confirmed){
				Movie.delete({id: movie.id}).$promise.then(function () {
					$uibModalInstance.close({deleted: true});
				});
			}
		})
	};

	$scope.onTagSelect = function (tag) {
		Tag.save({}, tag);
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
				Tag.delete({id: tag.id}).$promise.then(function () {
					_.remove($scope.tags, {id: tag.id});
				})
			}
		});
	};

	Tag.list().$promise.then(function (response) {
		$scope.tags = response;
	});


	setTimeout(function () {
		$('.name-input').focus();
	}, 200);


	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);
