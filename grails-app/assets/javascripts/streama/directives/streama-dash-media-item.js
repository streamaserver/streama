//= wrapped

angular.module('streama').directive('streamaDashMediaItem', function () {
  return {
    restrict: 'E',
    templateUrl: '/streama/directive--streama-dash-media-item.htm',
    scope: {
      entity: '='
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: controller
  }
});

function controller(modalService, $rootScope, $state, $scope, Dash, WatchlistEntry, Video) {
  var vm = this;
  vm.fetchFirstEpisodeAndPlay = fetchFirstEpisodeAndPlay;
  vm.fetchRandomEpisodeAndPlay = fetchRandomEpisodeAndPlay;
  vm.showDetails = showDetails;
  vm.handleWatchlistUpdate = handleWatchlistUpdate;
  vm.markCompleted = markCompleted;

  $scope.$on('video.markAsUnviewed', onVideoMarkAsUnviewed);

  function fetchFirstEpisodeAndPlay(tvShow) {
    Dash.firstEpisodeForShow({id: tvShow.id}).$promise.then(function (response) {
      $state.go('player', {videoId: response.id});
    });
  }


  function fetchRandomEpisodeAndPlay(tvShow) {
    Dash.randomEpisodeForShow({id: tvShow.id}).$promise.then(function (response) {
      $state.go('player', {videoId: response.id});
    });
  }

  function showDetails(media) {
    if(media.mediaType === 'episode'){
      modalService.mediaDetailModal({mediaId: media.tvShowId, mediaType: 'tvShow', isApiMovie: false});
    }else{
      modalService.mediaDetailModal({mediaId: media.id, mediaType: media.mediaType, isApiMovie: false}, function (response) {
        $rootScope.$broadcast('video.updateWatchlist', {response: response, media: media});
      });
    }
  }

  function handleWatchlistUpdate(action, item){
    switch (action) {
      case "added":
        addToWatchlist(item);
        break;
      case "removed":
        removeFromWatchlist(item);
        break;
    }
  }

  function addToWatchlist(item) {
    WatchlistEntry.create({id: item.id, mediaType: item.mediaType}).$promise.then(function (response) {
      $rootScope.$broadcast('video.updateWatchlist', {action: 'added', response: response, media: item});
    });
  }

  function removeFromWatchlist(item) {
    alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
    alertify.confirm("Are you sure you want to remove this video from your watchlist?", function (confirmed) {
      if (confirmed) {
        WatchlistEntry.delete(item).$promise.then(function (response) {
          $rootScope.$broadcast('video.updateWatchlist', {action: 'removed', media: item});
        });
      }
    });
  }

  function markCompleted() {
    alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
    alertify.confirm("Are you sure you want to mark this video as completed?", function (confirmed) {
      if (confirmed) {
        Video.markCompleted({id: vm.entity.id}).$promise.then(function (data) {
          vm.entity.deleted = true;
        });
      }
    })
  }

  function onVideoMarkAsUnviewed(e, data) {
    if(data.id === vm.entity.id){
      vm.entity.status = 'unviewed';
    }
  }
}
