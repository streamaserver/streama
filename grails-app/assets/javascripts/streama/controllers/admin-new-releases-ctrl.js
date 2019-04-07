

angular.module('streama').controller('adminNewReleasesCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {

	$scope.loading = true;

	apiService.notification.listNewReleases().then(function (data) {
		$scope.notifications = data.data;
		$scope.loading = false;
	});


	$scope.delete = function (notification) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete this highlight?', function (confirmed) {
			if(confirmed){
				apiService.notification.delete(notification.id).then(function (data) {
					_.remove($scope.notifications, {id: notification.id})
				});
			}
		})
	};

}]);
