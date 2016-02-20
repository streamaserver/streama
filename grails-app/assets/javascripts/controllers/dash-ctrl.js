'use strict';

streamaApp.controller('dashCtrl', [
  '$scope', 'apiService', '$state', '$rootScope', 'localStorageService', 'modalService',
  function ($scope, apiService, $state, $rootScope, localStorageService, modalService) {


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
      console.log('%c data', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', data);
      $state.go('player', {videoId: data.id});
    });
  };

  $scope.showDetails = function (media) {
    modalService.mediaDetailModal(media);
  };


  apiService.tag.list().success(function (data) {
    $scope.tags = data;
  });

  var applyFilter = function (item, filterObj) {
    var showItem = true;

    _.forEach(filterObj, function (filterVal, key) {
      if(_.isArray(filterVal) && filterVal.length){
        var intersection = _.intersectionBy(item[key], filterVal, 'id');
        showItem = intersection.length;
      }
      if(_.isString(filterVal) && filterVal.length >= 1){
        showItem = _.includes(item[key].toLowerCase(), filterVal.toLowerCase());
      }
    });

    return showItem;
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


}]);
