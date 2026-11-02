'use strict';

angular.module('streama').controller('dashCtrl',
	function ($scope, apiService, $state, $rootScope, localStorageService, modalService, $stateParams, mediaListService, currentUser ) {
  var vm = this;

    vm.showDetails = showDetails;
    vm.handleWatchlistUpdate = handleWatchlistUpdate;
    vm.loadingRecommendations = true;
    vm.isDashSectionHidden = isDashSectionHidden;
    vm.isDashType = isDashType;
    vm.getNewReleaseBackdrop = getNewReleaseBackdrop;

    $scope.$on('changedGenre', onChangedGenre);
    $scope.$on('video.updateWatchlist', onVideoUpdateWatchlist);

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
          },
          function (data) {
          alertify.error(data.message);
        });
      } else {
        initMedia();
      }
    }

    function initMedia() {
      if(isDashType('home') || isDashType('discover-movies')){
        vm.movie = mediaListService.init(apiService.dash.listMovies, {sort: 'release_date', order: 'DESC'}, currentUser);
      }
      if(isDashType('home') || isDashType('discover-shows')){
        vm.tvShow = mediaListService.init(apiService.dash.listShows, {sort: 'first_air_date', order: 'DESC'}, currentUser);
      }
      if(isDashType('home') || isDashType('continue-watching')){
        vm.continueWatching = mediaListService.init(apiService.dash.listContinueWatching, {sort: 'lastUpdated', order: 'DESC'}, currentUser);
      }
      if(isDashType('home') || isDashType('watchlist')){
        vm.watchlistEntry = mediaListService.init(apiService.watchlistEntry.list, {sort: 'id', order: 'DESC'}, currentUser);
      }
      if(isDashType('home')){
        vm.genericVideo = mediaListService.init(apiService.dash.listGenericVideos, {sort: 'title', order: 'ASC'}, currentUser);
        apiService.dash.listNewReleases().then(onNewReleasesLoaded);
        apiService.dash.listRecommendations().then(onRecommendedLoaded);
      }

      apiService.dash.listGenres().then(onGenreLoaded);
      apiService.tag.list().then(onTagsLoaded);
    }


    function isDashType(type) {
      return ($state.params.dashType === type || (type === 'home' && !$state.params.dashType));
    }
    // HOISTED FUNCTIONS BELOW

    function onRecommendedLoaded(response) {
      var data = response.data;
      vm.recommendations = data;
      vm.loadingRecommendations = false;
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
      var settingsPromise = apiService.settings.list();
      settingsPromise.then(function (response) {
        var data = response.data;
        $scope.settings = data;
        var TheMovieDbAPI = _.find(data, {settingsKey: 'Upload Directory'});

        if (!TheMovieDbAPI.value) {
          alertify.alert('You need to fill out some required base-settings. You will be redirected to the settings page now.', function () {
            $state.go('settings.settings');
          });
        }
      });
      return settingsPromise;
    }

    function onChangedGenre(e, genre) {
      $rootScope.selectedGenre = genre;
      var genreFilter;
      if ($rootScope.selectedGenre) {
        genreFilter = [$rootScope.selectedGenre.id];
      } else {
        genreFilter = [];
      }
      vm.movie.filter.genre = genreFilter;
      vm.tvShow.filter.genre = genreFilter;
      vm.movie.setFilter();
      vm.tvShow.setFilter();
    }

    function showDetails(media) {
      if(media.mediaType === 'episode'){
        modalService.mediaDetailModal({mediaId: media.tvShowId, mediaType: 'tvShow', isApiMovie: false});
      }else{
        modalService.mediaDetailModal({mediaId: media.id, mediaType: media.mediaType, isApiMovie: false}, function (response) {
          updateWatchlist(response.action, _.get(vm.watchlistEntry, 'list'), media, response.watchlistEntry);
        });
      }
    }

    function handleWatchlistUpdate(action, item){
      switch (action) {
        case 'added':
          addToWatchlist(item);
          break;
        case 'removed':
          removeFromWatchlist(item);
          break;
      }
    }

    function addToWatchlist(item) {
      apiService.watchlistEntry.create(item).then(function (response) {
        vm.watchlistEntry.list = vm.watchlistEntry.list ? vm.watchlistEntry.list : [];
        updateWatchlist('added', _.get(vm.watchlistEntry, 'list'), item, response.data);
      });
    }

    function removeFromWatchlist(item) {
      vm.watchlistEntry.list = vm.watchlistEntry.list ? vm.watchlistEntry.list : [];
      alertify.set({buttonReverse: true, labels: {ok: 'Yes', cancel: 'Cancel'}});
      alertify.confirm('Are you sure you want to remove this video from your watchlist?', function (confirmed) {
        if (confirmed) {
          apiService.watchlistEntry.delete(item).then(function (response) {
            updateWatchlist('removed', _.get(vm.watchlistEntry, 'list'), item);
          });
        }
      });
    }

    function updateWatchlist(action, list, media, watchlistEntry) {
      var type = handleVideoListsUpdate(media);
      if(action === 'added'){
        list.push(watchlistEntry);
        alertify.success('The '+type+' was added to your watchlist.');
      }else if (action === 'removed'){
        removeMediaFromList(list, media);
        alertify.success('The '+type+' was removed from your watchlist.');
      }
      list.sort(function(a,b) { return (a.id < b.id) ? 1 : ((a.id > b.id) ? -1 : 0);});
    }

    function removeMediaFromList(list, media){
      _.remove(list, function (watchlistEntry) {
        return (watchlistEntry.video ? watchlistEntry.video.id : watchlistEntry.tvShow.id) === media.id;
      });
    }

    function handleVideoListsUpdate(media){
      var type = media.mediaType;
      switch (type) {
        case 'tvShow':
          watchlistStatusHandler(vm.tvShow.list, media);
          type = 'show';
          break;
        case 'movie':
          watchlistStatusHandler(vm.movie.list, media);
          type = 'movie';
          break;
        case 'genericVideo':
          watchlistStatusHandler(vm.genericVideo.list, media);
          type = 'video';
          break;
        default:
          break;
      }
      watchlistStatusHandler(vm.newReleases, media);
      watchlistStatusHandler(vm.continueWatching, media);
      return type;
    }

    function watchlistStatusHandler(mediaList, item){
      var index = _.findIndex(mediaList, function(element) { return item.id === element.id;});
      if(index > 0){
        mediaList[index].inWatchlist = !mediaList[index].inWatchlist;
      }
    }

    function isDashSectionHidden(sectionName) {
      var hiddenDashSectionSetting = _.find($scope.settings, {name: 'hidden_dash_sections'});
      if(_.get(hiddenDashSectionSetting, 'parsedValue')){
        var hiddenDashSections = hiddenDashSectionSetting.parsedValue.split(',');
        return (hiddenDashSections.indexOf(sectionName) > -1);
      }
    }

    function onVideoUpdateWatchlist(e, data) {
      vm.watchlistEntry.list = vm.watchlistEntry.list ? vm.watchlistEntry.list : [];
      updateWatchlist(data.action, _.get(vm.watchlistEntry, 'list'), data.media, _.get(data.response, 'data'));
    }

    function getNewReleaseBackdrop(media){
      if(media.backdrop_path){
        return 'https://image.tmdb.org/t/p/original' + media.backdrop_path;
      }else if(media.backdrop_image_src){
        return media.backdrop_image_src;
      }
    }

	});
