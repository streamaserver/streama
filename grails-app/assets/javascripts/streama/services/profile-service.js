'use strict';

angular.module('streama').factory('profileService', function (localStorageService, apiService, $state, $rootScope) {

  function setCurrentProfile(profile) {
    localStorageService.set('currentProfile', profile);
    $rootScope.currentProfile = profile;
    $state.go('dash', {}, {reload: true});
  }

  function getCurrentProfile() {
      return localStorageService.get('currentProfile') || null;
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
