
streamaApp.controller('adminShowsCtrl', ['$scope', 'apiService', '$state', 'modalService', function ($scope, apiService, $state, modalService) {
	
	$scope.loading = true;

	apiService.tvShow.list().success(function (data) {
		$scope.shows = data;
		$scope.loading = false;
	});


	$scope.openShowModal = function () {
		modalService.tvShowModal(null, function (data) {
			$state.go('admin.show', {showId: data.id});
		});
	};
}]);
