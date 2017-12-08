'use strict';

angular.module('streama').controller('dashCtrl',
	function ($scope, apiService, $state, $rootScope, localStorageService, modalService, $stateParams ) {
  var vm = this;


		vm.fetchFirstEpisodeAndPlay = fetchFirstEpisodeAndPlay;
    vm.showDetails = showDetails;
    vm.markCompleted = markCompleted;
    vm.loadingTvShows = true;
    vm.loadingMovies = true;
    vm.loadingRecommendations = true;
    vm.loadingGenericVideos = true;

    $scope.$on('changedGenre', onChangedGenre);


    init();


    function init() {
      if ($rootScope.currentUser.isAdmin) {
        showInitialSettingsWarning();
      }

      if ($stateParams.mediaModal) {
        modalService.mediaDetailModal({mediaId: $stateParams.mediaModal, mediaType: $stateParams.mediaType, isApiMovie: false});
      }

      vm.dashFilter = initDashFilter();
      apiService.tag.list().success(onTagsLoaded);
      apiService.dash.listNewReleases().success(onNewReleasesLoaded);
      apiService.dash.listContinueWatching().success(onContinueWatchingLoaded);
      apiService.dash.listShows().success(onTvShowsLoaded);
      apiService.dash.listRecommendations().success(onRecommendedLoaded);
      apiService.dash.listGenericVideos().success(onGenericVideosLoaded);
      apiService.dash.listGenres().success(onGenreLoaded);
      vm.movie = initMovies();
    }


    // HOISTED FUNCTIONS BELOW

    function onGenericVideosLoaded(data) {
      vm.genericVideos = data;
      vm.loadingGenericVideos = false;
    }

    function onRecommendedLoaded(data) {
      vm.recommendations = data;
      vm.loadingRecommendations = false;
    }


    /**
     * Create Movie Config for vm, with its own properties for list, isLoading, filter, etc
     * @returns {{list: Array, currentOffset: number, isLoading: boolean, sorter: {}, filter: {tags: Array, genre: Array, title: string, execute: executeFilter}, loadMore: loadMore}}
     */
    function initMovies() {
      var movieConfig = {
        list: [],
        currentOffset: 0,
        isLoading: true,
        sorter: null,
        filter: {
          tags: null,
          genre: null,
          title: null,
          execute: executeFilter
        },
        loadMore: loadMore
      };

      apiService.dash.listMovies().success(onMoviesLoaded);

      return movieConfig;

      function onMoviesLoaded(data) {
        movieConfig.list = data;
        movieConfig.isLoading = false;
      }

      function executeFilter(item) {
        return applyFilter(item, movieConfig.filter);
      }

      function loadMore() {
        //WIP
      }
    }


    function onTvShowsLoaded(data) {
      vm.tvShows = data;
      vm.loadingTvShows = false;
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
        vm.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
      }
    }


    function initDashFilter() {
      return {
        tvShow: {},

        showFilter: function (item) {
          return applyFilter(item, vm.dashFilter.tvShow);
        }
      };
    }

    function showInitialSettingsWarning() {
      apiService.settings.list().success(function (data) {
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
        vm.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
      } else {
        vm.movie.filter.genre = [];
        vm.dashFilter.tvShow.genre = [];
      }
    }


    function fetchFirstEpisodeAndPlay(tvShow) {
      apiService.dash.firstEpisodeForShow(tvShow.id).success(function (data) {
        $state.go('player', {videoId: data.id});
      });
    }
    function showDetails(media) {
      //modalService.mediaDetailModal((media.tvShowId || media.id), media.mediaType); //{videoId: data.id}
      modalService.mediaDetailModal({mediaId: (media.tvShowId || media.id), mediaType: media.mediaType, isApiMovie: false});
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

	});
