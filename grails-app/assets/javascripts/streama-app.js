'use strict';

var streamaApp = angular.module('streamaApp', [
	'ui.router', 'ui.bootstrap', 'ngFileUpload', 'ui.slider'
]);



streamaApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

	$stateProvider
		.state('dash', {
			url: '/',
			templateUrl: 'dash.htm',
			controller: 'dashCtrl'
		})
		.state('player', {
			url: '/player/:videoId?currentTime?sessionId',
			templateUrl: 'player.htm',
			controller: 'playerCtrl'
		})
		.state('admin', {
			url: '/admin',
			templateUrl: 'admin.htm',
			controller: 'adminCtrl'
		})
		.state('admin.movies', {
			url: '/movies',
			templateUrl: 'admin-movies.htm',
			controller: 'adminMoviesCtrl'
		})
		.state('admin.movie', {
			url: '/movie/:movieId',
			templateUrl: 'admin-movie.htm',
			controller: 'adminMovieCtrl'
		})
		.state('admin.users', {
			url: '/users',
			templateUrl: 'admin-users.htm',
			controller: 'adminUsersCtrl'
		})
		.state('admin.settings', {
			url: '/settings',
			templateUrl: 'admin-settings.htm',
			controller: 'adminSettingsCtrl'
		})
		.state('admin.shows', {
			url: '/shows',
			templateUrl: 'admin-shows.htm',
			controller: 'adminShowsCtrl'
		})
		.state('admin.show', {
			url: '/show/:showId',
			templateUrl: 'admin-show.htm',
			controller: 'adminShowCtrl'
		});


	$urlRouterProvider.otherwise('/');


	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.interceptors.push('httpInterceptor');

}])

	.factory('httpInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {
		return {
			request: function (config) {
				config.params = config.params || {};
				config.params.browserSocketUUID = $rootScope.browserSocketUUID;
				return config || $q.when(config);
			},
			response: function (response) {
				return response || $q.when(response);
			},
			responseError: function (response) {

        if(response.status != 404 && response.status != 401){
          alertify.error('A system error occurred');
        }

				return $q.reject(response);
			}
		};
	}]);


streamaApp.run(['$rootScope', '$state', 'apiService', function ($rootScope, $state, apiService) {
	$rootScope.isCurrentState = function (stateName) {
		return ($state.current.name == stateName);
	};

  apiService.currentUser().success(function (data) {
    $rootScope.currentUser = data;
  });
}]);
