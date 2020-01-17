

angular.module('streama').controller('adminNewReleasesCtrl', ['$scope', 'modalService', '$state', 'Notification',
  function ($scope, modalService, $state, Notification) {

	$scope.loading = true;

	Notification.listNewReleases().$promise.then(function (data) {
		$scope.notifications = data;
		$scope.loading = false;
	});


	$scope.delete = function (notification) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete this highlight?', function (confirmed) {
			if(confirmed){
				Notification.delete({id: notification.id}).$promise.then(function (data) {
					_.remove($scope.notifications, {id: notification.id})
				});
			}
		})
	};

}]);
