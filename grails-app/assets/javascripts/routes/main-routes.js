//= require systaro/core/systaro.core

'use strict';



angular.module('streamaApp').config(function ($stateProvider) {
	$stateProvider
		.state('dash', {
			url: '/dash?genreId?mediaModal?mediaType',
			templateUrl: 'dash.htm',
			controller: 'dashCtrl',
			reloadOnSearch: false,
			resolve: {
				currentUser: ['apiService', '$rootScope', function (apiService, $rootScope) {
					return apiService.currentUser().success(function (data) {
						if (data) {
							$rootScope.currentUser = data;
							return data;
						}
					});
				}]
			}
		})

		.state('player', {
			url: '/player/:videoId?currentTime?sessionId',
			templateUrl: 'player.htm',
			controller: 'playerCtrl',
			resolve: {
				currentUser: ['apiService', '$rootScope', function (apiService, $rootScope) {
					return apiService.currentUser().success(function (data) {
						if (data) {
							$rootScope.currentUser = data;
							return data;
						}
					});
				}]
			}
		})

		.state('profile', {
			url: '/profile',
			templateUrl: 'profile.htm',
			controller: 'profileCtrl',
			resolve: {
				currentUser: ['apiService', '$rootScope', function (apiService, $rootScope) {
					return apiService.currentUser().success(function (data) {
						if (data) {
							$rootScope.currentUser = data;
							return data;
						}
					});
				}]
			}
		})

		.state('help', {
			url: '/help',
			templateUrl: 'help.htm',
			controller: 'helpCtrl'
		})

});
