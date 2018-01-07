'use strict';

angular.module('streama').controller('modalMediaDetailCtrl', [
  '$scope', '$uibModalInstance', '$rootScope', 'config', '$state', 'apiService',
  function ($scope, $uibModalInstance, $rootScope, config, $state, apiService) {

    $scope.mediaType = config.mediaType;
    var mediaId = config.mediaId;
    $scope.isEditButtonHidden = config.isEditButtonHidden;

    if(config.mediaObject) {
      $scope.media = config.mediaObject;
      $scope.isApiMovie = config.isApiMovie;
    }
    else if(mediaId && $scope.mediaType){

      console.log('%c media', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', mediaId);
      apiService[$scope.mediaType].get(mediaId).success(function (data) {
        $scope.media = data;

        if($scope.mediaType == 'tvShow'){
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
    }
    else if(!config.mediaObject && !mediaId && !$scope.mediaType) {
      alertify.error('No data available');
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
      if($state.current.name === 'dash'){
        $state.go('dash', {mediaModal: null, mediaType: null});

      }
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
		});
}]);
