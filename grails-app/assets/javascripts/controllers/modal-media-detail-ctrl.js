'use strict';

streamaApp.controller('modalMediaDetailCtrl', [
	'$scope', '$modalInstance', '$rootScope', 'mediaId', '$state', 'apiService', 'mediaType',
	function ($scope, $modalInstance, $rootScope, mediaId, $state, apiService, mediaType) {

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
			}
		});


	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.setCurrentSeason = function (index) {
		$scope.currentSeason = index;
	};

	$scope.editMedia = function (media) {
		if($rootScope.currentUser.isContentManager){
			if(media.title){
				$state.go('admin.movie', {movieId: media.id});
			}
			else if(media.name){
				$state.go('admin.show', {showId: media.id});
			}
			$modalInstance.dismiss('cancel');
		}
	};
		
		$scope.$on('$stateChangeStart', function () {
			$modalInstance.dismiss('cancel');
		})
}]);