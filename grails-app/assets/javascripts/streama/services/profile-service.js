'use strict';

angular.module('streama').factory('profileService', function (localStorageService, apiService, $state, $rootScope) {

  function setCurrentProfile(profile) {
    localStorageService.set('currentProfile', profile);
    $rootScope.currentProfile = profile;
    $state.go('dash', {}, {reload: true});
  }

  function getCurrentProfile() {
    if (localStorageService.get('currentProfile')) {
      return localStorageService.get('currentProfile');
    }
    return null;
  }

  function getUserProfiles() {
    return apiService.profile.getUserProfiles();
  }

  return {
    setCurrentProfile: setCurrentProfile,
    getCurrentProfile: getCurrentProfile,
    getUserProfiles: getUserProfiles
  };

});
