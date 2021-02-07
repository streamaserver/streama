'use strict';

angular.module('streama').controller('modalMediaDetailCtrl', [
  '$scope', '$uibModalInstance', '$rootScope', 'config', '$state', 'TvShow', 'Movie', 'GenericVideo', 'Episode', 'Video', 'Dash', 'WatchlistEntry',
  function ($scope, $uibModalInstance, $rootScope, config, $state, TvShow, Movie, GenericVideo, Episode, Video, Dash, WatchlistEntry) {
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
      switch ($scope.mediaType) {
        case "tvShow":
          $scope.currentSeason = 0;
          TvShow.episodesForTvShow({id: $scope.media.id}).$promise.then(function (response) {
            var episodes = $scope.episodes = response;
            if(episodes.length){
              $scope.seasons = _.chain(episodes).map('season_number').uniq().value();
              $scope.currentSeason = _.min(episodes, 'season_number').season_number;
            }
          });
          Dash.firstEpisodeForShow({id: $scope.media.id}).$promise.then(function (response) {
            var firstEpisode = response;
            $scope.firstEpisode = firstEpisode;
          });

          Dash.randomEpisodeForShow($scope.media.id).$promise.then(function (response) {
            var randomEpisode = response;
            $scope.randomEpisode = randomEpisode;
          });
          break;
        case "movie":
          Movie.get({id: mediaId}).$promise.then(showMediaDetail);
          break;
        case "episode":
          Episode.get({id: mediaId}).$promise.then(showMediaDetail);
          break;
        case "video":
          Video.get({id: mediaId}).$promise.then(showMediaDetail);
          break;
        case "genericVideo":
          GenericVideo.get({id: mediaId}).$promise.then(showMediaDetail);
          break;
        default:
          console.log($scope.mediaType + ' has no request configured through $resources');
      }
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

		function showMediaDetail(response) {
      var data = response;
      $scope.media = data;
    }

    function listEpisodesForSeason(seasonNum) {
      return _.filter($scope.episodes, {'season_number': seasonNum});
    }

    function addToWatchlist(item) {
      WatchlistEntry.create({}, item).$promise.then(function (response) {
        var data = response;
        $scope.media = data.video ? data.video : data.tvShow;
        $scope.watchlistEntry = data;
        action = 'added'
      });
    }

    function removeFromWatchlist(item) {
      alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
      alertify.confirm("Are you sure you want to remove this video from your watchlist?", function (confirmed) {
        if (confirmed) {
          WatchlistEntry.delete({}, item).$promise.then(function (response) {
            var data = response;
            $scope.media = data;
            action = 'removed'
          });
        }
      })
    }

    function markAsUnviewed() {
      Video.markAsUnviewed({id: $scope.media.id}).then(function () {
        $scope.media.status = 'unviewed';
        $rootScope.$broadcast('video.markAsUnviewed', {id: $scope.media.id});
      });
    }
}]);
