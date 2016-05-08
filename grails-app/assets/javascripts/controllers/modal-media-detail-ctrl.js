'use strict';

streamaApp.controller('modalMediaDetailCtrl', [
	'$scope', '$uibModalInstance', '$rootScope', 'mediaId', '$state', 'apiService', 'mediaType',
	function ($scope, $uibModalInstance, $rootScope, mediaId, $state, apiService, mediaType) {

	console.log('%c media', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', mediaId);

		apiService[mediaType].get(mediaId).success(function (data) {
			$scope.media = data;

			if(mediaType == 'tvShow'){
				$scope.currentSeason = 0;

				apiService.tvShow.episodesForTvShow($scope.media.id).success(function (data) {
					if(data.length){
						$scope.seasons = _.groupBy(data, 'season_number');
						$scope.currentSeason = _.min(data, 'season_number').season_number;
					}
				});

				apiService.dash.firstEpisodeForShow($scope.media.id).success(function (data) {
					$scope.firstEpisode = data;
				});
			}
		});



	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
		$state.go('dash', {mediaModal: null, mediaType: null});
	};

	$scope.setCurrentSeason = function (index) {
		$scope.currentSeason = index;
	};

	$scope.editMedia = function (media) {
		if($rootScope.currentUser.isContentManager){
			console.log('%c media', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', media);
			if(media.isGenericVideo){
				$state.go('admin.video', {videoId: media.id});
			}
			if(media.title){
				$state.go('admin.movie', {movieId: media.id});
			}
			else if(media.name){
				$state.go('admin.show', {showId: media.id});
			}
			$uibModalInstance.dismiss('cancel');
		}
	};

		$scope.$on('$stateChangeStart', function () {
			$uibModalInstance.dismiss('cancel');
		})
}]);
