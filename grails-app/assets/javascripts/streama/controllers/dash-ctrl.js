'use strict';

angular.module('streama').controller('dashCtrl',
	function ($scope, apiService, $state, $rootScope, localStorageService, modalService, $stateParams ) {
  var vm = this;

    var LIST_MAX = 30;
		vm.fetchFirstEpisodeAndPlay = fetchFirstEpisodeAndPlay;
    vm.showDetails = showDetails;
    vm.markCompleted = markCompleted;
    vm.loadingRecommendations = true;

    $scope.$on('changedGenre', onChangedGenre);


    init();


    function init() {
      if ($rootScope.currentUser.isAdmin) {
        showInitialSettingsWarning();
      }

      if ($stateParams.mediaModal) {
        modalService.mediaDetailModal({mediaId: $stateParams.mediaModal, mediaType: $stateParams.mediaType, isApiMovie: false});
      }

      vm.movie = initMovies();
      vm.tvShow = initTvShows();
      vm.genericVideo = initGenericVideos();

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


    /**
     * Create Movie Config for vm, with its own properties for list, isLoading, filter, etc
     * @returns {{list: Array, currentOffset: number, isLoading: boolean, sorter: {}, filter: {tags: Array, genre: Array, title: string, execute: executeFilter}, loadMore: loadMore}}
     */
    function initMovies() {
      var movieConfig = {
        total: 0,
        currentSort: {sort: 'title', order: 'ASC'},
        list: [],
        currentOffset: 0,
        isLoading: true,
        sorter: _.getterSetter(setSort, getSort),
        filter: {
          tags: null,
          genre: null,
          title: null,
          execute: executeFilter
        },
        fetch: apiService.dash.listMovies,
        loadMore: loadMore,
        getThumbnail: getThumbnail
      };

      fetchData(movieConfig);

      return movieConfig;

      function getSort() {
        return movieConfig.currentSort;
      }

      function setSort(sort) {
        movieConfig.currentSort = sort;
        movieConfig.currentOffset = 0;
        fetchData(movieConfig);
      }

      function executeFilter(item) {
        return applyFilter(item, movieConfig.filter);
      }

      function loadMore() {
        movieConfig.currentOffset += LIST_MAX;
        fetchData(movieConfig);
      }

      function getThumbnail(movie) {
        if(!movie.poster_path && !movie.poster_image_src){
          return $rootScope.basePath + 'assets/poster-not-found.png';
        }
        if(movie.poster_path){
          return 'https://image.tmdb.org/t/p/w300/' + movie.poster_path;
        }

        if(movie.poster_image_src){
          return movie.poster_image_src;
        }

      }
    }

    /**
     * Create TvShow Config for vm, with its own properties for list, isLoading, filter, etc
     * @returns {{list: Array, currentOffset: number, isLoading: boolean, sorter: {}, filter: {tags: Array, genre: Array, name: string, execute: executeFilter}, loadMore: loadMore}}
     */
    function initTvShows() {
      var tvShowConfig = {
        total: 0,
        list: [],
        currentSort: {sort: 'name', order: 'ASC'},
        currentOffset: 0,
        isLoading: true,
        sorter: _.getterSetter(setSort, getSort),
        filter: {
          tags: null,
          genre: null,
          name: null,
          execute: executeFilter
        },
        fetch: apiService.dash.listShows,
        loadMore: loadMore,
        getThumbnail: getThumbnail
      };

      fetchData(tvShowConfig);

      return tvShowConfig;

      function getSort() {
        return tvShowConfig.currentSort;
      }

      function setSort(sort) {
        tvShowConfig.currentSort = sort;
        tvShowConfig.currentOffset = 0;
        fetchData(tvShowConfig);
      }

      function executeFilter(item) {
        return applyFilter(item, tvShowConfig.filter);
      }

      function loadMore() {
        tvShowConfig.currentOffset += LIST_MAX;
        fetchData(tvShowConfig);
      }

      function getThumbnail(tvShow) {
        if(tvShow.poster_path){
          return 'https://image.tmdb.org/t/p/w300/' + tvShow.poster_path;
        }
        if(!tvShow.poster_path && !tvShow.manualInput){
          return $rootScope.basePath + 'assets/poster-not-found.png';
        }

        if(tvShow.manualInput && tvShow.poster_image_src){
          return tvShow.poster_image_src;
        }

      }
    }


    /**
     * Create Movie Config for vm, with its own properties for list, isLoading, filter, etc
     * @returns {{list: Array, currentOffset: number, isLoading: boolean, sorter: {}, filter: {tags: Array, genre: Array, title: string, execute: executeFilter}, loadMore: loadMore}}
     */
    function initGenericVideos() {
      var genericVideoConfig = {
        total: 0,
        currentSort: {sort: 'title', order: 'ASC'},
        list: [],
        currentOffset: 0,
        isLoading: true,
        sorter: _.getterSetter(setSort, getSort),
        filter: {
          tags: null,
          genre: null,
          title: null,
          execute: executeFilter
        },
        fetch: apiService.dash.listGenericVideos,
        loadMore: loadMore,
        getThumbnail: getThumbnail
      };

      fetchData(genericVideoConfig);

      return genericVideoConfig;

      function getSort() {
        return genericVideoConfig.currentSort;
      }

      function setSort(sort) {
        genericVideoConfig.currentSort = sort;
        genericVideoConfig.currentOffset = 0;
        fetchData(genericVideoConfig);
      }

      function executeFilter(item) {
        return applyFilter(item, genericVideoConfig.filter);
      }

      function loadMore() {
        genericVideoConfig.currentOffset += LIST_MAX;
        fetchData(genericVideoConfig);
      }

      function getThumbnail(movie) {
        if(!movie.poster_image_src){
          return $rootScope.basePath + 'assets/poster-not-found.png';
        }

        if(movie.poster_image_src){
          return movie.poster_image_src;
        }

      }
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
