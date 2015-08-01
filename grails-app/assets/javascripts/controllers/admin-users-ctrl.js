

streamaApp.controller('adminUsersCtrl', ['$scope', 'apiService', 'modalService', function ($scope, apiService, modalService) {
	$scope.loading = true;

	apiService.user.list().success(function (data) {
		$scope.users = data;
		$scope.loading = false;

	});

	$scope.openUserModal = function (user) {
		modalService.userModal(user, function (data) {
			if(!_.find($scope.users, {id: data.id})){
				$scope.users.push(data);
			}
		});
	};

	$scope.delete = function (user) {
		alertify.confirm('Are you sure you want to delete ' + user.username + '?', function (confirmed) {
			if(confirmed){
				apiService.user.delete(user.id).success(function (data) {
          _.remove($scope.users, {id: user.id})
				});
			}
		})
	};

	$scope.isAdmin = function (user) {
		return _.find(user.authorities, {authority: 'ROLE_ADMIN'});
	};


}]);
