'use strict';

angular.module('streama').factory('profileService', function (localStorageService, $state, $rootScope, $translate, Profile) {

  function setCurrentProfile(profile) {
    localStorageService.set('currentProfile', profile);
    $rootScope.currentProfile = profile;
    $state.go('dash', {}, {reload: true});
    $translate.use(_.get($rootScope, 'currentProfile.profileLanguage') || _.get($rootScope, 'currentUser.language') || 'en');
  }

  function getCurrentProfile() {
      return localStorageService.get('currentProfile') || null;
  }

  function getUserProfiles() {
    return Profile.getUserProfiles().$promise;
  }

  return {
    setCurrentProfile: setCurrentProfile,
    getCurrentProfile: getCurrentProfile,
    getUserProfiles: getUserProfiles
  };

});
