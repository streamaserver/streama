'use strict';

streamaApp.controller('modalVideoCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'video', 'isManual', 'tvShow',
	function ($scope, $uibModalInstance, apiService, video, isManual, tvShow) {
	$scope.loading = false;
	$scope.addManually = isManual;

	$scope.episode = video || {};

	$scope.saveEpisode = function (episode) {
		if(tvShow)
			episode.show = tvShow.id;

		delete episode.dateCreated;
		delete episode.lastUpdated;

		apiService.episode.save(episode)
			.success(function (data) {
				$uibModalInstance.close(data);
        alertify.success("Video saved.");
			})
			.error(function () {
				alertify.error("An error occured.");
			});
	};

	$scope.deleteVideo = function(video){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to delete this Episode?", function (confirmed) {
			if(confirmed){
				apiService.video.delete(video.id).success(function () {
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
				apiService.video.refetch(video.id).success(function (result) {
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
