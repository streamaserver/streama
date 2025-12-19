'use strict';

angular.module('streama').controller('modalMediaDetailCtrl', [
  '$scope', '$uibModalInstance', '$rootScope', 'config', '$state', 'apiService',
  function ($scope, $uibModalInstance, $rootScope, config, $state, apiService) {
    var action;

    $scope.mediaType = config.mediaType;
    var mediaId = config.mediaId;
    $scope.isEditButtonHidden = config.isEditButtonHidden;

    $scope.listEpisodesForSeason = listEpisodesForSeason;
    $scope.addToWatchlist = addToWatchlist;
    $scope.removeFromWatchlist = removeFromWatchlist;
    $scope.markAsUnviewed = markAsUnviewed;

    if(config.mediaObject) {
      $scope.media = config.mediaObject;
      $scope.isApiMovie = config.isApiMovie;
    }
    else if(mediaId && $scope.mediaType){

      console.log('%c media', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', mediaId);
      apiService[$scope.mediaType].get(mediaId).then(function (response) {
        var data = response.data;
        $scope.media = data;

        if($scope.mediaType == 'tvShow'){
          $scope.currentSeason = 0;
          apiService.tvShow.episodesForTvShow($scope.media.id).then(function (response) {
            var episodes = $scope.episodes = response.data;
            if(episodes.length){
              $scope.seasons = _.chain(episodes).map('season_number').uniq().value();
              $scope.currentSeason = _.min(episodes, 'season_number').season_number;
            }
          });
          apiService.dash.firstEpisodeForShow($scope.media.id).then(function (response) {
            var firstEpisode = response.data;
            $scope.firstEpisode = firstEpisode;
          });
          apiService.dash.randomEpisodeForShow($scope.media.id).then(function (response) {
            var randomEpisode = response.data;
            $scope.randomEpisode = randomEpisode;
          });
        }
      });
    }
    else if(!config.mediaObject && !mediaId && !$scope.mediaType) {
      alertify.error('No data available');
    }
    $scope.cancel = function () {
      $uibModalInstance.close({
        watchlistEntry: $scope.watchlistEntry,
        video: $scope.media,
        action: action
      });
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
			else if(media.title){
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

    function listEpisodesForSeason(seasonNum) {
      return _.filter($scope.episodes, {'season_number': seasonNum});
    }

    function addToWatchlist(item) {
      apiService.watchlistEntry.create(item).then(function (response) {
        var data = response.data;
        $scope.media = data.video ? data.video : data.tvShow;
        $scope.watchlistEntry = data;
        action = 'added'
      });
    }

    function removeFromWatchlist(item) {
      alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
      alertify.confirm("Are you sure you want to remove this video from your watchlist?", function (confirmed) {
        if (confirmed) {
          apiService.watchlistEntry.delete(item).then(function (response) {
            var data = response.data;
            $scope.media = data;
            action = 'removed'
          });
        }
      })
    }

    function markAsUnviewed() {
      apiService.video.markAsUnviewed({id: $scope.media.id}).then(function () {
        $scope.media.status = 'unviewed';
        $rootScope.$broadcast('video.markAsUnviewed', {id: $scope.media.id});
      });
    }
}]);
