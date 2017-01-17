
angular.module('streama').controller('adminShowsCtrl', ['$scope', 'apiService', '$state', 'modalService', function ($scope, apiService, $state, modalService) {

	$scope.loading = true;
  $scope.searchText = "Search Show from collection or TheMovieDB...";

	apiService.tvShow.list().success(function (data) {
		$scope.shows = data;
		$scope.loading = false;
	});


  apiService.theMovieDb.hasKey().success(function (data) {
    if (!data.key) {
      $scope.searchText = "Search Show from collection...";
    }
  });

	$scope.openShowModal = function () {
		modalService.tvShowModal(null, function (data) {
			$state.go('admin.show', {showId: data.id});
		});
	};
}]);
