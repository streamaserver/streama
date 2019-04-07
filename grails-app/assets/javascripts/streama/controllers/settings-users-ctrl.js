

angular.module('streama').controller('settingsUsersCtrl', ['$scope', 'apiService', 'modalService', '$rootScope', function ($scope, apiService, modalService, $rootScope) {
	$scope.loading = true;

	apiService.user.list().then(function (response) {
    var data = response.data;
		$scope.users = data;
		$scope.loading = false;

	});

  $scope.openUserEditModal = function (user) {
    modalService.openUserEditModal(user, function (data) {
      if(!_.find($scope.users, {id: data.id})){
        $scope.users.push(data);
      }else{

        var index = $scope.users.indexOf(user);
        $scope.users[index] = data;

        if(data.id != $rootScope.currentUser.id){
          alertify.alert('If you made any changes to the roles, please make sure to inform the user that he has to log out of the application and log back in for the changes to take effect.');
        }else{
          alertify.alert('If you made any changes to the roles, please log out of the application and log back in for the changes to take effect.');
        }
      }
    });
  };

  $scope.openUserCreateModal = function (user) {
    if(user==null){
      user = {}
      user.language = "en";
    }
    modalService.userCreateModal(user, function (data) {
      if(!_.find($scope.users, {id: data.id})){
        $scope.users.push(data);
      }else{

        var index = $scope.users.indexOf(user);
        $scope.users[index] = data;

        if(data.id != $rootScope.currentUser.id){
          alertify.alert('If you made any changes to the roles, please make sure to inform the user that he has to log out of the application and log back in for the changes to take effect.');
        }else{
          alertify.alert('If you made any changes to the roles, please log out of the application and log back in for the changes to take effect.');
        }
      }
    });
  };

	$scope.openUserInviteModal = function (user) {
		modalService.userInviteModal(user, function (data) {
			if(!_.find($scope.users, {id: data.id})){
				$scope.users.push(data);
			}else{

        var index = $scope.users.indexOf(user);
        $scope.users[index] = data;

        if(data.id != $rootScope.currentUser.id){
          alertify.alert('If you made any changes to the roles, please make sure to inform the user that he has to log out of the application and log back in for the changes to take effect.');
        }else{
          alertify.alert('If you made any changes to the roles, please log out of the application and log back in for the changes to take effect.');
        }
      }
		});
	};

	$scope.delete = function (user) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to delete ' + user.username + '?', function (confirmed) {
			if(confirmed){
				apiService.user.delete(user.id).then(function (data) {
          _.remove($scope.users, {id: user.id})
				});
			}
		})
	};

	$scope.isAdmin = function (user) {
		return _.find(user.authorities, {authority: 'ROLE_ADMIN'});
	};

	$scope.isContentManager = function (user) {
		return _.find(user.authorities, {authority: 'ROLE_CONTENT_MANAGER'});
	};

  $scope.isTrustedUser = function (user) {
    return _.find(user.authorities, {authority: 'ROLE_TRUSTED_USER'});
  };

}]);
