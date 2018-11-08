'use strict';

angular.module('streama').controller('subProfilesCtrl',
  function ($scope, apiService, $rootScope, userService) {

    $scope.profile = {
      profile_name: '',
      profile_language: 'en',
      isKid: false
    };
    $scope.existingProfiles = [];
    $scope.loading = true;

    apiService.profile.getUserProfiles()
      .success(function (data) {
        $scope.existingProfiles = data;
        console.log('Profiles list:', $scope.existingProfiles);
      });

  });
