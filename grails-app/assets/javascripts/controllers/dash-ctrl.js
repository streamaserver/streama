'use strict';

streamaApp.controller('dashCtrl', [
  '$scope', 'apiService', '$state', '$rootScope', 'localStorageService', 'modalService', '$stateParams',
  function ($scope, apiService, $state, $rootScope, localStorageService, modalService, $stateParams) {

  if($rootScope.currentUser.isAdmin){
    apiService.settings.list().success(function (data) {
      var TheMovieDbAPI = _.find(data, {settingsKey: 'TheMovieDB API key'});

      if(!TheMovieDbAPI.value){
        alertify.alert('You need to fill out some required base-settings. You will be redirected to the settings page now.', function () {
          $state.go('admin.settings');
        });
      }
    });
  }


  $scope.fetchFirstEpisodeAndPlay = function (tvShow) {
    apiService.dash.firstEpisodeForShow(tvShow.id).success(function (data) {
      $state.go('player', {videoId: data.id});
    });
  };

  $scope.showDetails = function (media) {
    modalService.mediaDetailModal(media.id, media.mediaType);
  };


  if($stateParams.mediaModal){
    modalService.mediaDetailModal($stateParams.mediaModal, $stateParams.mediaType);
  }

  apiService.tag.list().success(function (data) {
    $scope.tags = data;
  });

  var applyFilter = function (item, filterObj) {
    var showItemArray = [];

    _.forEach(filterObj, function (filterVal, key) {
      if(_.isArray(filterVal) && filterVal.length){
        var intersection = _.intersectionBy(item[key], filterVal, 'id');
        var isVisible = (intersection.length ? true : false);
        showItemArray.push(isVisible);
      }
      if(_.isString(filterVal) && filterVal.length >= 1){
        var isVisible = (_.includes(item[key].toLowerCase(), filterVal.toLowerCase()) ? true : false);
        showItemArray.push(isVisible);
      }
    });

    return (showItemArray.indexOf(false) < 0);
  };

  $scope.dashFilter = {
    movie: {},
    tvShow: {},

    movieFilter: function (item) {
      return applyFilter(item, $scope.dashFilter.movie);
    },

    showFilter: function (item) {
      return applyFilter(item, $scope.dashFilter.tvShow);
    }
  };


  $scope.markCompleted = function (viewingStatus) {
    alertify.confirm("Are you sure you want to mark this video as completed?", function (confirmed) {
      if(confirmed){
        apiService.viewingStatus.delete(viewingStatus.id).success(function (data) {
          _.remove($scope.continueWatching, {'id': viewingStatus.id});
        });
      }
    })
  };

  apiService.dash.listContinueWatching().success(function (data) {
    $scope.continueWatching = data;
  });

  apiService.dash.listShows().success(function (data) {
    $scope.tvShows = data;
  });

  apiService.dash.listMovies().success(function (data) {
    $scope.movies = data;
  });

  apiService.dash.listGenericVideos().success(function (data) {
    $scope.genericVideos = data;
  });


  apiService.dash.listGenres().success(function (data) {
    $rootScope.genres = data;

    if($stateParams.genreId){
      $rootScope.selectedGenre = _.find(data, {id: parseInt($stateParams.genreId)});
      $scope.dashFilter.movie.genre = [$rootScope.selectedGenre];
      $scope.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
    }
  });


    $scope.$on('changedGenre', function (e, genre) {
      $rootScope.selectedGenre = genre;
      $scope.dashFilter.movie.genre = [$rootScope.selectedGenre];
      $scope.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
    });


}]);
