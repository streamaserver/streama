//= require systaro/core/systaro.core

'use strict';



angular.module('streamaApp').config(function ($stateProvider) {

		$stateProvider
			.state('admin', {
				url: '/admin',
				templateUrl: 'admin.htm',
				controller: 'adminCtrl',
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
			})
			.state('admin.fileManager', {
				url: '/fileManager',
				templateUrl: 'admin-fileManager.htm',
				controller: 'adminFileManagerCtrl'
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
			.state('admin.videos', {
				url: '/videos',
				templateUrl: 'admin-videos.htm',
				controller: 'adminVideosCtrl'
			})
			.state('admin.video', {
				url: '/video/:videoId',
				templateUrl: 'admin-video.htm',
				controller: 'adminVideoCtrl'
			})

			.state('admin.notifications', {
				url: '/notifications',
				templateUrl: 'admin-notifications.htm',
				controller: 'adminNotificationsCtrl',
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

			.state('admin.newReleases', {
				url: '/newReleases',
				templateUrl: 'admin-new-releases.htm',
				controller: 'adminNewReleasesCtrl'
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
			})

});
