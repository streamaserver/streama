

streamaApp.controller('adminNotificationsCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {

	$scope.loading = true;

	apiService.notification.list().success(function (data) {
		$scope.notifications = data;
		$scope.loading = false;
	});


	$scope.sendCurrentNotifcation = function () {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to send all of the open Notifications in the queue?", function (confirmed) {
			if(confirmed){
				apiService.notification.sendCurrentNotifcation()
					.success(function () {
						_.forEach($scope.notifications, function (notification) {
							notification.isCompleted = true;
						});

						alertify.success('The notification was sent for ' + $scope.openNotificationAmount() + ' entries.');
					})
					.error(function (err) {
						alertify.error('There were no open notifications to send.');
					});
			}
		})
	};

	$scope.openNotificationAmount = function () {
		console.log('%c open', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;',_.filter($scope.notifications, 'isCompleted') );
		return _.reject($scope.notifications, 'isCompleted').length;
	};

	$scope.openMovieModal = function () {
		modalService.movieModal(null, function (data) {
			$state.go('admin.movie', {movieId: data.id});
		});
	}

	$scope.delete = function (notification) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete this notification?', function (confirmed) {
			if(confirmed){
				apiService.notification.delete(notification.id).success(function (data) {
					_.remove($scope.notifications, {id: notification.id})
				});
			}
		})
	};

}]);
