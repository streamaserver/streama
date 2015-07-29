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
			url: '/player/:videoId?currentTime',
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
	//$httpProvider.interceptors.push('httpInterceptor');

}]);


streamaApp.run(['$rootScope', '$state', function ($rootScope, $state) {
	$rootScope.isCurrentState = function (stateName) {
		return ($state.current.name == stateName);
	};
}]);