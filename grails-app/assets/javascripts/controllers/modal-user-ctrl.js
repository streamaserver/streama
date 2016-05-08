'use strict';

streamaApp.controller('modalUserCtrl', [
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

		$scope.checkAvailability = function (username) {
			$scope.error = null;
			$scope.valid = false;

			if(username){
				apiService.user.checkAvailability(username).success(function (data) {
					if(data.error){
						$scope.error = 	data.error;
					}else{
						$scope.valid = true;
					}
				});
			}
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

}]);
