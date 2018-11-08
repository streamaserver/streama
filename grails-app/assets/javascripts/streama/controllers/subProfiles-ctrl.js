'use strict';

angular.module('streama').controller('subProfilesCtrl',
  function ($scope, apiService, $rootScope, userService) {

    $scope.profile = {
      profile_name: '',
      profile_language: 'en',
      isKid: false
    };
    $scope.mycolor = '002300';
    $scope.existingProfiles = [];
    $scope.loading = true;
    $scope.isManageProfiles = true;
    $scope.isEditOrCreateProfile = false;

    apiService.profile.getUserProfiles()
      .success(function (data) {
        $scope.existingProfiles = data;
        console.log('Profiles list:', $scope.existingProfiles);
      });


    $scope.toggleManageProfiles = function(){
      $scope.isManageProfiles = !$scope.isManageProfiles;
    };

    $scope.editProfile = function(profile){
      $scope.isEditOrCreateProfile = !$scope.isEditOrCreateProfile;

    };

    $scope.createProfile = function(){
      $scope.isEditOrCreateProfile = !$scope.isEditOrCreateProfile;
    };
  });
