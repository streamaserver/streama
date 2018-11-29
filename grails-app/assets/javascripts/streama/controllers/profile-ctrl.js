'use strict';

angular.module('streama').controller('profileCtrl', function ($scope, apiService, $rootScope, userService) {
  $scope.user = angular.copy($rootScope.currentUser);
  $scope.loading = true;
  $scope.passwordData = {};
  $scope.passwordsInvalid = true;
  $scope.languages = true;


  apiService.theMovieDb.availableGenres().success(function (data) {
    $scope.availableGenres = data;
    $scope.loading = false;
  });

  $scope.toggleSelectGenre = function (genre) {
    $scope.user.favoriteGenres = _.xorBy($scope.user.favoriteGenres, [genre], 'apiId');
    $scope.profileForm.$setDirty();
  };

  $scope.isGenreSelected = function (genre) {
    return _.find($scope.user.favoriteGenres, {apiId: genre.apiId});
  };

  $scope.saveProfile = function () {
    $scope.loading = true;
    apiService.user.saveProfile($scope.user)
      .success(function (data) {
        $scope.loading = false;
        userService.setCurrentUser(data);
        alertify.success('Your profile was successfully saved.');
        $scope.profileForm.$setPristine();
      })
      .error(function () {
        $scope.loading = false;
      });
  };

  $scope.toggleChangePassword = function () {
    $scope.changePasswordIsActive = !$scope.changePasswordIsActive;
  };

  $scope.validatePasswords = function () {
    if($scope.passwordData.newPassword != $scope.passwordData.repeatPassword || $scope.passwordData.newPassword.length < 6){
      $scope.passwordsInvalid = true;
    }else{
      $scope.passwordsInvalid = false;
    }
  };

  $scope.saveNewPassword = function () {
    $scope.loading = true;

    apiService.user.changePassword($scope.passwordData)
      .success(function () {
        alertify.success('Password was successfully changed.');
        $scope.passwordData = {};
        $scope.passwordsInvalid = true;
        $scope.toggleChangePassword();
        $scope.loading = false;
      })
      .error(function (data) {
        alertify.error(data.message);
        $scope.loading = false;
      });
  };

});
