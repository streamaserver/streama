'use strict';

angular.module('streama').controller('dashCtrl',
	function ($scope, apiService, $state, $rootScope, localStorageService, modalService, $stateParams, mediaListService, currentUser ) {
  var vm = this;

    var LIST_MAX = 30;
		vm.fetchFirstEpisodeAndPlay = fetchFirstEpisodeAndPlay;
    vm.showDetails = showDetails;
    vm.addToWatchlist = addToWatchlist;
    vm.removeFromWatchlist = removeFromWatchlist;
    vm.markCompleted = markCompleted;
    vm.loadingRecommendations = true;
    vm.isDashSectionHidden = isDashSectionHidden;

    $scope.$on('changedGenre', onChangedGenre);

    init();

    function init() {
      if ($rootScope.currentUser.isAdmin) {
        showInitialSettingsWarning();
      }

      if ($stateParams.mediaModal) {
        modalService.mediaDetailModal({mediaId: $stateParams.mediaModal, mediaType: $stateParams.mediaType, isApiMovie: false});
      }

      if(!localStorageService.get('currentProfile')){
        apiService.profile.getUserProfiles().then(function(response) {
            var data = response.data;
            localStorageService.set('currentProfile', data[0]);
            initMedia();
          }
        , function (data) {
          alertify.error(data.message);
        });
      } else {
        initMedia();
      }


    }

    function initMedia() {
      vm.movie = mediaListService.init(apiService.dash.listMovies, {sort: 'title', order: 'ASC'}, currentUser.data);
      vm.tvShow = mediaListService.init(apiService.dash.listShows, {sort: 'name', order: 'ASC'}, currentUser.data);
      vm.genericVideo = mediaListService.init(apiService.dash.listGenericVideos, {sort: 'title', order: 'ASC'}, currentUser.data);
      vm.watchlistEntry = mediaListService.init(apiService.dash.listWatchlistEntries, {sort: 'id', order: 'DESC'}, currentUser.data);

      apiService.tag.list().then(onTagsLoaded);
      apiService.dash.listNewReleases().then(onNewReleasesLoaded);
      apiService.dash.listContinueWatching().then(onContinueWatchingLoaded);
      apiService.dash.listRecommendations().then(onRecommendedLoaded);
      apiService.dash.listGenres().then(onGenreLoaded);

    }

    // HOISTED FUNCTIONS BELOW

    function onRecommendedLoaded(response) {
      var data = response.data;
      vm.recommendations = data;
      vm.loadingRecommendations = false;
    }

    function fetchData(mediaConfig) {
      mediaConfig.fetch({max: LIST_MAX, offset: mediaConfig.currentOffset, sort: mediaConfig.currentSort.sort, order: mediaConfig.currentSort.order}).then(function (response) {
        var data = response.data;
        mediaConfig.total = data.total;
        if(mediaConfig.currentOffset > 0){
          mediaConfig.list = _.unionBy(mediaConfig.list, data.list, 'id');
        }else{
          mediaConfig.list = data.list;
        }
        mediaConfig.isLoading = false;
      });
    }

    function onContinueWatchingLoaded(response) {
      var data = response.data;
      vm.continueWatching = data;
    }

    function onNewReleasesLoaded(response) {
      var data = response.data;
      vm.newReleases = data;
    }

    function onTagsLoaded(response) {
      var data = response.data;
      vm.tags = data;
    }

    function onGenreLoaded(response) {
      var data = response.data;
      $rootScope.genres = data;

      if ($stateParams.genreId) {
        $rootScope.selectedGenre = _.find(data, {id: parseInt($stateParams.genreId)});
        vm.movie.filter.genre = [$rootScope.selectedGenre];
        vm.tvShow.filter.genre = [$rootScope.selectedGenre];
      }
    }

    function showInitialSettingsWarning() {
      apiService.settings.list().then(function (response) {
        var data = response.data;
        $scope.settings = data;
        var TheMovieDbAPI = _.find(data, {settingsKey: 'Upload Directory'});

        if (!TheMovieDbAPI.value) {
          alertify.alert('You need to fill out some required base-settings. You will be redirected to the settings page now.', function () {
            $state.go('settings.settings');
          });
        }
      });
    }

    function onChangedGenre(e, genre) {
      $rootScope.selectedGenre = genre;
      if ($rootScope.selectedGenre) {
        vm.movie.filter.genre = [$rootScope.selectedGenre];
        vm.tvShow.filter.genre = [$rootScope.selectedGenre];
      } else {
        vm.movie.filter.genre = [];
        vm.tvShow.filter.genre = [];
      }
    }

    function fetchFirstEpisodeAndPlay(tvShow) {
      apiService.dash.firstEpisodeForShow(tvShow.id).then(function (response) {
        $state.go('player', {videoId: response.data.id});
      });
    }

    function showDetails(media) {
      //modalService.mediaDetailModal((media.tvShowId || media.id), media.mediaType); //{videoId: data.id}
      if(media.mediaType === 'episode'){
        modalService.mediaDetailModal({mediaId: media.tvShowId, mediaType: 'tvShow', isApiMovie: false});
      }else{
        modalService.mediaDetailModal({mediaId: media.id, mediaType: media.mediaType, isApiMovie: false});
      }
    }

    function addToWatchlist(item) {
      apiService.watchlistEntry.create(item).then(function (response) {
        var type = handleVideoListsUpdate(item);
        if(vm.watchlistEntry.list){
          vm.watchlistEntry.list.push(response.data);
        }else{
          vm.watchlistEntry.list = [];
          vm.watchlistEntry.list.push(response.data);
        }
        alertify.success('The '+type+' was added to your watchlist.');
      });
    }

    function removeFromWatchlist(item) {
      alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
      alertify.confirm("Are you sure you want to remove this video from your watchlist?", function (confirmed) {
        if (confirmed) {
          apiService.watchlistEntry.delete(item).then(function (response) {
            var type = handleVideoListsUpdate(item);
            _.remove(vm.watchlistEntry.list, function (watchlistEntry) {
              return (watchlistEntry.video ? watchlistEntry.video.id : watchlistEntry.tvShow.id) === item.id
            });
            alertify.success('The '+type+' was removed from your watchlist.');
          });
        }
      })
    }

    function handleVideoListsUpdate(item){
      var type = item.mediaType;
      var index = -1;
      switch (type) {
        case "tvShow":
          index = _.indexOf(vm.tvShow.list.map(function(element){return element.id}), item.id);
          vm.tvShow.list[index].inWatchlist = !vm.tvShow.list[index].inWatchlist;
          type = "show";
          break;
        case "movie":
          index = _.indexOf(vm.movie.list.map(function(element){return element.id}), item.id);
          vm.movie.list[index].inWatchlist = !vm.movie.list[index].inWatchlist;
          type = 'movie';
          break;
        case "genericVideo":
          index = _.indexOf(vm.genericVideo.list.map(function(element){return element.id}), item.id);
          vm.genericVideo.list[index].inWatchlist = !vm.genericVideo.list[index].inWatchlist;
          type = 'video';
          break;
        default:
          break;
      }
      return type
    }

    function applyFilter(item, filterObj) {
      var showItemArray = [];

      _.forEach(filterObj, function (filterVal, key) {
        if (_.isArray(filterVal) && filterVal.length) {
          var intersection = _.intersectionBy(item[key], filterVal, 'id');
          var isVisible = (intersection.length ? true : false);
          showItemArray.push(isVisible);
        }
        if (_.isString(filterVal) && filterVal.length >= 1) {
          var isVisible = (_.includes(item[key].toLowerCase(), filterVal.toLowerCase()) ? true : false);
          showItemArray.push(isVisible);
        }
      });

      return (showItemArray.indexOf(false) < 0);
    }

    function markCompleted(viewingStatus) {
      alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
      alertify.confirm("Are you sure you want to mark this video as completed?", function (confirmed) {
        if (confirmed) {
          apiService.viewingStatus.delete(viewingStatus.id).then(function (data) {
            _.remove(vm.continueWatching, {'id': viewingStatus.id});
          });
        }
      })
    }

    function isDashSectionHidden(sectionName) {
      var hiddenDashSectionSetting = _.find($scope.settings, {name: 'hidden_dash_sections'});
      if(_.get(hiddenDashSectionSetting, 'value')){
        var hiddenDashSections = hiddenDashSectionSetting.value.split(',');
        return (hiddenDashSections.indexOf(sectionName) > -1);
      }

    }

	});
