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
      apiService.dash.listMovies().success(onMoviesLoaded);
      apiService.dash.listRecommendations().success(onRecommendedLoaded);
      apiService.dash.listGenericVideos().success(onGenericVideosLoaded);
      apiService.dash.listGenres().success(onGenreLoaded);
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

    function onMoviesLoaded(data) {
      vm.movies = data;
      vm.loadingMovies = false;
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
        vm.dashFilter.movie.genre = [$rootScope.selectedGenre];
        vm.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
      }
    }


    function initDashFilter() {
      return {
        movie: {},
        tvShow: {},

        movieFilter: function (item) {
          return applyFilter(item, vm.dashFilter.movie);
        },

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
        vm.dashFilter.movie.genre = [$rootScope.selectedGenre];
        vm.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
      } else {
        vm.dashFilter.movie.genre = [];
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
