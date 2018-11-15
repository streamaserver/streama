'use strict';

angular.module('streama').controller('dashCtrl',
	function ($scope, apiService, $state, $rootScope, localStorageService, modalService, $stateParams, mediaListService, currentUser ) {
  var vm = this;

    var LIST_MAX = 30;
		vm.fetchFirstEpisodeAndPlay = fetchFirstEpisodeAndPlay;
    vm.showDetails = showDetails;
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
        apiService.profile.getUserProfiles().success(function(data) {
            localStorageService.set('currentProfile', data[0]);
          }
        ).error(function (data) {
          alertify.error(data.message);
        });
      }

      vm.movie = mediaListService.init(apiService.dash.listMovies, {sort: 'title', order: 'ASC'}, currentUser.data);
      vm.tvShow = mediaListService.init(apiService.dash.listShows, {sort: 'name', order: 'ASC'}, currentUser.data);
      vm.genericVideo = mediaListService.init(apiService.dash.listGenericVideos, {sort: 'title', order: 'ASC'}, currentUser.data);

      apiService.tag.list().success(onTagsLoaded);
      apiService.dash.listNewReleases().success(onNewReleasesLoaded);
      apiService.dash.listContinueWatching().success(onContinueWatchingLoaded);
      apiService.dash.listRecommendations().success(onRecommendedLoaded);
      apiService.dash.listGenres().success(onGenreLoaded);
    }


    // HOISTED FUNCTIONS BELOW


    function onRecommendedLoaded(data) {
      vm.recommendations = data;
      vm.loadingRecommendations = false;
    }


    function fetchData(mediaConfig) {
      mediaConfig.fetch({max: LIST_MAX, offset: mediaConfig.currentOffset, sort: mediaConfig.currentSort.sort, order: mediaConfig.currentSort.order}).success(function (response) {
        mediaConfig.total = response.total;
        if(mediaConfig.currentOffset > 0){
          mediaConfig.list = _.unionBy(mediaConfig.list, response.list, 'id');
        }else{
          mediaConfig.list = response.list;
        }
        mediaConfig.isLoading = false;
      });
    }

    function onContinueWatchingLoaded(data) {
      vm.continueWatching = data;
    }

    function onNewReleasesLoaded(data) {
      vm.newReleases = data;
    }
    function onTagsLoaded(data) {
      vm.tags = data;
    }

    function onGenreLoaded(data) {
      $rootScope.genres = data;

      if ($stateParams.genreId) {
        $rootScope.selectedGenre = _.find(data, {id: parseInt($stateParams.genreId)});
        vm.movie.filter.genre = [$rootScope.selectedGenre];
        vm.tvShow.filter.genre = [$rootScope.selectedGenre];
      }
    }

    function showInitialSettingsWarning() {
      apiService.settings.list().success(function (data) {
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
      apiService.dash.firstEpisodeForShow(tvShow.id).success(function (data) {
        $state.go('player', {videoId: data.id});
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
          apiService.viewingStatus.delete(viewingStatus.id).success(function (data) {
            _.remove(vm.continueWatching, {'id': viewingStatus.id});
          });
        }
      })
    }

    function isDashSectionHidden(sectionName) {
      var hiddenDashSectionSetting = _.find($scope.settings, {name: 'hidden_dash_sections'});
      if(hiddenDashSectionSetting.value){
        var hiddenDashSections = hiddenDashSectionSetting.value.split(',');
        return (hiddenDashSections.indexOf(sectionName) > -1);
      }

    }

	});
