

angular.module('streama')
  .controller('adminShowsCtrl',
    ['$scope', '$state', 'modalService', 'mediaListService', '$interval', 'TvShow', 'TheMovieDB',
    function ($scope, $state, modalService, mediaListService, $interval, TvShow, TheMovieDB) {

	$scope.loading = false;
	$scope.bigLoading = false;
  $scope.hasMovieDBKey = true;
  $scope.searchText = "Search Show from collection or TheMovieDB...";

	$scope.createFromFiles = createFromFiles;

  TheMovieDB.hasKey().$promise.then(function (data) {
    if (!data.key) {
      $scope.hasMovieDBKey = false;
      $scope.searchText = "Search Show from collection...";
    }
  });


  $scope.tvShow = mediaListService.init(TvShow.list, {sort: 'name', order: 'ASC'});

  $scope.openShowModal = function () {
		modalService.tvShowModal(null, function (data) {
			$state.go('admin.show', {showId: data.id});
		});
	};

  $scope.doSearch = function (query) {
    $scope.tvShow.search();
    if ($scope.hasMovieDBKey && query) {
      return TheMovieDB.search({type: 'tv', name: query}).$promise.then(function (data) {
        $scope.suggestedShows = data;
      });
    }
  };

  $scope.addFromSuggested = function (show, redirect) {
    var tempShow = angular.copy(show);
    var apiId = tempShow.id;
    delete tempShow.id;
    tempShow.apiId = apiId;

    TvShow.save({}, tempShow).$promise.then(function (response) {
      var data = response;
      if(redirect){
        $state.go('admin.show', {showId: data.id});
      }else{
        $scope.shows.push(data);
      }
    });
  };

  $scope.alreadyAdded = function (show) {
    // console.log('%c show', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', show);
    return show.id && _.find($scope.shows, {apiId: show.id.toString()});
  };

	function createFromFiles() {
		modalService.createFromFilesModal('tvShow').then(function (data) {
			TvShow.list().$promise.then(function (response) {
        var data = response;
				angular.extend($scope.shows, data);
			});
		});
	}

}]);
