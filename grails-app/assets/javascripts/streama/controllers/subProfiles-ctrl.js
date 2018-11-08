'use strict';

angular.module('streama').controller('subProfilesCtrl',
  function ($scope, apiService, $rootScope, userService) {

    $scope.profile = {
      profile_name: '',
      profile_language: 'en',
      isKid: false
    };
    $scope.mycolor = '002300';
    $scope.currentSelectedColor = 'ba1c56';
    $scope.existingProfiles = [];
    $scope.loading = true;
    $scope.isManageProfiles = false;
    $scope.isEditProfile = false;
    $scope.isCreateProfile = false;

    apiService.profile.getUserProfiles()
      .success(function (data) {
        $scope.existingProfiles = data;
        console.log('Profiles list:', $scope.existingProfiles);
      });


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
        profile_name: '',
        profile_language: 'en',
        isKid: false
      }
    };

    $scope.deleteProfile = function(){
      if($scope.existingProfiles.length == 1){
        alertify.error("You must have at least ONE profile!");
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
      if (!$scope.profile.profile_name) {
        return;
      }
      if ($scope.profile.id) {
        apiService.profile.update($scope.profile)
          .success(function () {
            alertify.success('Profile Updated!');
            $scope.getAllProfiles();
            $scope.loading = false;
          })
          .error(function (data) {
            alertify.error(data.message);
            $scope.loading = false;
          });
        return;
      }
      apiService.profile.save($scope.profile)
        .success(function () {
          alertify.success('Profile Created!');
          $scope.getAllProfiles();
          $scope.loading = false;
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
  });
