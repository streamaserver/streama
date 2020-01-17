'use strict';

angular.module('streama').controller('userSettingsCtrl', function ($scope, $rootScope, userService, User, TheMovieDB) {
  $scope.user = angular.copy($rootScope.currentUser);
  $scope.loading = true;
  $scope.passwordData = {};
  $scope.passwordsInvalid = true;
  $scope.languages = true;


  TheMovieDB.availableGenres().$promise.then(function (response) {
    var data = response;
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
    User.saveProfile({}, $scope.user).$promise.then(function (response) {
      var data = response;
        $scope.loading = false;
        userService.setCurrentUser(data);
        alertify.success('Your profile was successfully saved.');
        $scope.profileForm.$setPristine();
      }, function () {
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

    User.changePassword($scope.passwordData).$promise.then(function () {
        alertify.success('Password was successfully changed.');
        $scope.passwordData = {};
        $scope.passwordsInvalid = true;
        $scope.toggleChangePassword();
        $scope.loading = false;
      }, function (data) {
        alertify.error(data.message);
        $scope.loading = false;
      });
  };

});
