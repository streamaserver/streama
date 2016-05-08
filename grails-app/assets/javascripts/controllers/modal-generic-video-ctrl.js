'use strict';

streamaApp.controller('modalGenericVideoCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'video', 'uploadService',
	function ($scope, $uibModalInstance, apiService, video, uploadService) {
	$scope.loading = false;

	$scope.video = video || {};

	$scope.saveVideo = function (video) {
		apiService.genericVideo.save(video).success(function (data) {
			$uibModalInstance.close(data);
		});
	};


	$scope.imageUpload = {};

	$scope.uploadImage = function (files, type) {
		uploadService.doUpload($scope.imageUpload, 'file/upload.json', function (data) {
			$scope.imageUpload.percentage = null;
			console.log('%c type', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', type);
			$scope.video[type] = data;
			$scope.video[type+'_src'] = data.src;
		}, files);
	};



	apiService.genres.list().success(function (data) {
		$scope.genres = data;
	});


	$scope.deleteMovie = function(movie){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure, you want to delete this Episode?", function (confirmed) {
			if(confirmed){
				apiService.movie.delete(movie.id).success(function () {
					$uibModalInstance.close({deleted: true});
				});
			}
		})
	};

	$scope.onTagSelect = function (tag) {
		apiService.tag.save(tag);
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
}]);
