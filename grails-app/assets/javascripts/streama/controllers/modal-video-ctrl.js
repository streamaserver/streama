'use strict';

angular.module('streama').controller('modalVideoCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'video', 'isManual', 'tvShow', 'uploadService',
	function ($scope, $uibModalInstance, apiService, video, isManual, tvShow, uploadService) {
	$scope.loading = false;
	$scope.addManually = isManual;

	$scope.episode = video || {};

	$scope.saveEpisode = function (episode) {
		if(tvShow)
			episode.show = tvShow.id;

		delete episode.dateCreated;
		delete episode.lastUpdated;

		apiService.episode.save(episode).then(function (data) {
				$uibModalInstance.close(data);
        alertify.success("Video saved.");
			}, function () {
				alertify.error("An error occured.");
			});
	};

  $scope.imageUpload = {};
  $scope.uploadImage = function (files, type) {
    uploadService.doUpload($scope.imageUpload, 'file/upload.json', function (data) {
      $scope.imageUpload.percentage = null;
      if(data.error) return

      $scope.episode[type] = data;
      $scope.episode[type+'_src'] = data.src;
    }, function () {}, files);
  };


    $scope.deleteVideo = function(video){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to delete this Episode?", function (confirmed) {
			if(confirmed){
				apiService.video.delete(video.id).then(function () {
					$uibModalInstance.close({deleted: true});
				});
			}
		})

	};

	$scope.refetch = function(video){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to re-fetch the meta-data from TheMovieDb? " +
				"All your changes except for the added files will be overridden.", function (confirmed) {
			if(confirmed){
				apiService.video.refetch(video.id).then(function (result) {
					_.assign(video, result.data);
					alertify.success('Fetch successful');
				});
			}
		})

	};

	setTimeout(function () {
		$('.name-input').focus();
	}, 200);


	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}]);
