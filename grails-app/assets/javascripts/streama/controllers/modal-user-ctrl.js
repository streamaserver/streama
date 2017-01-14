'use strict';

angular.module('streama').controller('modalUserCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'user',
	function ($scope, $uibModalInstance, apiService, user) {

		$scope.user = angular.copy(user);
		$scope.loading = false;

		apiService.user.availableRoles().success(function (data) {
      $scope.roles = data;
    });

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.checkAvailability = function (isInvite, username, password) {
			$scope.error = null;
            $scope.error2 = null;
			$scope.valid = false;
            $scope.validUser = false;
            $scope.validPassword = password;

			if(username){
				apiService.user.checkAvailability(username).success(function (data) {
					if(data.error){
						$scope.error = 	data.error;
					}else{
                      if(password || isInvite){
                        $scope.valid = true;
                      }
                      $scope.validUser = true;
					}
				});
			}
            if(!password){
				$scope.error2 = "Password can not be empty!"
            }
    };

	$scope.checkAuthorities = function (id) {
	  return _.some($scope.user.authorities, {id: id});
	};

	$scope.toggleAuthorities = function (value) {
	  $scope.user.authorities = _.xorBy($scope.user.authorities, [value], "id");
	};

    $scope.toggleSelection = function (value, array) {
      if(array.indexOf(value) > -1){
        array.splice(array.indexOf(value), 1);
      }else{
        array.push(value);
      }
    };


		$scope.saveAndInviteUser = function (user) {
			$scope.loading = true;

			var dateObj = angular.copy(user);
			apiService.user.saveAndInviteUser(dateObj)

				.success(function (data) {
					$uibModalInstance.close(data);
					$scope.loading = false;
				})
				.error(function () {
					$scope.loading = false;
					alertify.error('There was an error saving the user.');
				});
		};

    $scope.saveAndCreateUser = function (user) {
      $scope.loading = true;

      var dateObj = angular.copy(user);
      apiService.user.saveAndCreateUser(dateObj)

        .success(function (data) {
          $uibModalInstance.close(data);
          $scope.loading = false;
        })
        .error(function () {
          $scope.loading = false;
          alertify.error('There was an error saving the user.');
        });
    };

}]);
