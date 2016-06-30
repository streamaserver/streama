//= require systaro/core/systaro.core

'use strict';



angular.module('streamaApp').config(function ($stateProvider) {

		$stateProvider

		.state('settings.users', {
			url: '/users',
			templateUrl: 'settings-users.htm',
			controller: 'settingsUsersCtrl',
      resolve: {
        currentUser: ['apiService', '$rootScope', '$state', function (apiService, $rootScope, $state) {
          return apiService.currentUser().success(function (data) {
            if (data && data.isAdmin) {
              $rootScope.currentUser = data;
              return data;
            } else {
              $state.go('dash');
            }
          });
        }]
      }
		})
		.state('settings.settings', {
			url: '/settings',
			templateUrl: 'settings-settings.htm',
			controller: 'settingsSettingsCtrl',
      resolve: {
        currentUser: ['apiService', '$rootScope', '$state', function (apiService, $rootScope, $state) {
          return apiService.currentUser().success(function (data) {
            if (data.isAdmin) {
              $rootScope.currentUser = data;
              return data;
            } else {
              $state.go('dash');
            }
          });
        }]
      }
		})

    .state('settings', {
      url: '/settings',
      templateUrl: 'settings.htm',
      controller: 'settingsCtrl',
      resolve: {
        currentUser: ['apiService', '$rootScope', '$state', function (apiService, $rootScope, $state) {
          return apiService.currentUser().success(function (data) {
            if (data && data.authorities.length) {
              $rootScope.currentUser = data;
              return data;
            } else {
              $state.go('dash');
            }
          });
        }]
      }
    });

});
