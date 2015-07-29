

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

	$scope.makeUserAdmin = function (user) {
		alertify.confirm('Are you sure you want to make ' + user.username + ' admin?', function (confirmed) {
			if(confirmed){
				apiService.user.makeUserAdmin(user).success(function (data) {
					user.authorities = data.authorities;
				});
			}
		})
	};

	$scope.isAdmin = function (user) {
		return _.find(user.authorities, {authority: 'ROLE_ADMIN'});
	};


}]);