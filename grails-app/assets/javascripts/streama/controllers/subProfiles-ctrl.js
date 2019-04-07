'use strict';

angular.module('streama').controller('subProfilesCtrl',
  function ($scope, apiService, $rootScope, userService, localStorageService, $state, profileService) {

    $scope.profile = {
      profileName: '',
      profileLanguage: 'en',
      isChild: false,
      avatarColor: '0b74b2'
    };
    $scope.standardColor = '0b74b2';
    $scope.existingProfiles = [];
    $scope.loading = true;
    $scope.isManageProfiles = false;
    $scope.isEditProfile = false;
    $scope.isCreateProfile = false;
    $scope.availableColors = [
      '0b74b2','ba1c56','099166','d1b805','c03da7',
      '488f16','d36e10','4b4b4b','3a328b','b81f1f'
    ];

    profileService.getUserProfiles().then(
      function(data) {
        $scope.existingProfiles = data;
      }
    );
    $scope.setCurrentProfile = profileService.setCurrentProfile;

    $scope.setProfileColor = function(color){
      $scope.profile.avatarColor = color;
    };

    $scope.toggleManageProfiles = function(){
      $scope.isManageProfiles = !$scope.isManageProfiles;
    };

    $scope.goToEditProfile = function(profile){
      $scope.isEditProfile = !$scope.isEditProfile;
      $scope.profile = profile;
    };

    $scope.goToCreateProfile = function(){
      $scope.isCreateProfile = !$scope.isCreateProfile;
      $scope.profile = {
        profileName: '',
        profileLanguage: 'en',
        isChild: false,
        avatarColor: '0b74b2'
      }
    };

    $scope.deleteProfile = function(){
      if($scope.existingProfiles.length === 1){
        alertify.error("You must have at least ONE profile!");
        return;
      }
      if($scope.profile.id === profileService.getCurrentProfile().id){
        alertify.error("You currently use this profile! Change profile first");
        return;
      }
      if(!$scope.profile.id){
        return;
      }
      apiService.profile.delete($scope.profile.id)
        .success(function () {
          alertify.success('Profile Deleted!');
          $scope.getAllProfiles();
          $scope.loading = false;
          $scope.refreshStates();
        })
        .error(function (data) {
          alertify.error(data.message);
          $scope.loading = false;
        });
    };

    $scope.refreshStates = function(){
      $scope.isEditProfile = false;
      $scope.isCreateProfile = false;
    };

    $scope.saveProfile = function(){
      if (!$scope.profile.profileName) {
        return;
      }
      var saveProfileEndpoint;
      if ($scope.profile.id) {
        saveProfileEndpoint = apiService.profile.update;
      }else {
        saveProfileEndpoint = apiService.profile.save;
      }
      saveProfileEndpoint($scope.profile)
        .success(function () {
          alertify.success($scope.profile.id ? 'Profile Updated!' : 'Profile Created!');
          $scope.getAllProfiles();
          $scope.loading = false;
          $rootScope.$broadcast('streama.profiles.onChange');
        })
        .error(function (data) {
          alertify.error(data.message);
          $scope.loading = false;
        });
    };

    $scope.getAllProfiles = function () {
      apiService.profile.getUserProfiles()
        .success(function (data) {
          $scope.existingProfiles = data;
          $scope.refreshStates();
        })
        .error(function (data) {
          alertify.error(data.message);
          $scope.loading = false;
        });
    };

    $scope.showPreviewProfiles = function() {
      return !$scope.isManageProfiles && !($scope.isEditProfile || $scope.isCreateProfile);
    };

    $scope.showEditProfiles = function() {
      return $scope.isManageProfiles && !($scope.isEditProfile || $scope.isCreateProfile);
    }
  });
