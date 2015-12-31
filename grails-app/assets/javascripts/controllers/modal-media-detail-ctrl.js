'use strict';

streamaApp.controller('modalMediaDetailCtrl', [
	'$scope', '$modalInstance', '$rootScope', 'media', '$state', 'apiService',
	function ($scope, $modalInstance, $rootScope, media, $state, apiService) {
	$scope.media = media;
	$scope.currentSeason = 0;
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

		if(media.name){
			apiService.tvShow.episodesForTvShow($scope.media.id).success(function (data) {
				if(data.length){
					$scope.seasons = _.groupBy(data, 'season_number');
					$scope.currentSeason = _.min(data, 'season_number').season_number;
				}
			});
		}

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