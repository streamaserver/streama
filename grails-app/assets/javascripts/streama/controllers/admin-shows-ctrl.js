

angular.module('streama').controller('adminShowsCtrl', ['$scope', 'apiService', '$state', 'modalService', 'mediaListService', function ($scope, apiService, $state, modalService, mediaListService) {

	$scope.loading = true;
  $scope.hasMovieDBKey = true;
  $scope.searchText = "Search Show from collection or TheMovieDB...";

	$scope.createFromFiles = createFromFiles;

  apiService.theMovieDb.hasKey().success(function (data) {
    if (!data.key) {
      $scope.hasMovieDBKey = false;
      $scope.searchText = "Search Show from collection...";
    }
  });


  $scope.tvShow = mediaListService.init(apiService.tvShow.list, {sort: 'name', order: 'ASC'});

  $scope.openShowModal = function () {
		modalService.tvShowModal(null, function (data) {
			$state.go('admin.show', {showId: data.id});
		});
	};

  $scope.doSearch = function (query) {
    $scope.tvShow.search();
    if ($scope.hasMovieDBKey && query) {
      return apiService.theMovieDb.search('tv', query).then(function (data) {
        $scope.suggestedShows = data.data;
      });
    }
  };

  $scope.addFromSuggested = function (show, redirect) {
    var tempShow = angular.copy(show);
    var apiId = tempShow.id;
    delete tempShow.id;
    tempShow.apiId = apiId;

    apiService.tvShow.save(tempShow).success(function (data) {
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
			apiService.tvShow.list().success(function (data) {
				angular.extend($scope.shows, data);
			});
		});
	}

}]);
