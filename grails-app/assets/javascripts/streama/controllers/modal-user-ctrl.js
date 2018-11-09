'use strict';

angular.module('streama').controller('modalUserCtrl', [
	'$scope', '$uibModalInstance', 'apiService', 'user', 'isInvite',
	function ($scope, $uibModalInstance, apiService, user, isInvite) {

		$scope.user = angular.copy(user) || {};
		$scope.loading = false;
		$scope.validPassword = isInvite ? true : false;

		apiService.user.availableRoles().success(function (data) {
      $scope.roles = data;
    });

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.checkAvailability = function (username) {
			$scope.error = null;
			$scope.validUser = false;

			if(username){
				apiService.user.checkAvailability(username).success(function (data) {
					if(data.error){
						$scope.error = 	data.error;
					}else{
						$scope.validUser = true;
					}
				});
			}
    };

		$scope.checkPassword = function (password, passwordRepeat) {
			$scope.validPassword = true;
			$scope.passwordValidationError = null;
			if(!password){
				$scope.passwordValidationError = "PASS_ERROR_EMPTY";
				$scope.validPassword = false;
				return;
			}
			if(password.length < 6){
				$scope.passwordValidationError = "PASS_ERROR_LENGTH";
				$scope.validPassword = false;
				return;
			}
			if(password != passwordRepeat){
				$scope.passwordValidationError = "PASS_ERROR_REPEAT";
				$scope.validPassword = false;
				return;
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
				.error(function (response) {
					$scope.loading = false;
					if(_.get(response, 'errors')){
					  _.forEach(response.errors, function(error){
              alertify.error('Error: ' + error.message);
            });
          }else{
            alertify.error('There was an error saving the user.');
          }
				});
		};

    $scope.saveAndCreateUser = function (user) {
      $scope.loading = true;

      var dateObj = angular.copy(user);
      apiService.user.saveAndCreateUser(dateObj)

        .success(function (data) {
          var basicProfile = {
            profile_name: data.username,
            profile_language: data.language,
            isKid: false,
            user: data
          };
          apiService.profile.save(basicProfile)
            .success(function () {
              alertify.success('Profile Created!');
              $uibModalInstance.close(data);
              $scope.loading = false;
            })
            .error(function (data) {
              alertify.error(data.message);
              $scope.loading = false;
            });
        })
        .error(function () {
          $scope.loading = false;
          alertify.error('There was an error saving the user.');
        });
    };

}]);
