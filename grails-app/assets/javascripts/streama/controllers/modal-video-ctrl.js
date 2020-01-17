'use strict';

angular.module('streama').controller('modalVideoCtrl', [
	'$scope', '$uibModalInstance', 'video', 'isManual', 'tvShow', 'uploadService', 'Episode', 'Video',
	function ($scope, $uibModalInstance, video, isManual, tvShow, uploadService, Episode, Video) {
	$scope.loading = false;
	$scope.addManually = isManual;

	$scope.episode = video || {};

	$scope.saveEpisode = function (episode) {
		if(tvShow)
			episode.show = tvShow.id;

		delete episode.dateCreated;
		delete episode.lastUpdated;

		Episode.save({}, episode).$promise.then(function (data) {
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
				Video.delete({id: video.id}).$promise.then(function () {
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
				Video.refetch({id: video.id}).$promise.then(function (result) {
					_.assign(video, result);
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
