//= wrapped


angular.module('streama').config(function ($stateProvider) {

	$stateProvider

		//BASE ROUTES
		.state('dash', {
			url: '/dash?genreId?mediaModal?mediaType',
			templateUrl: '/streama/dash.htm',
			controller: 'dashCtrl as vm',
			reloadOnSearch: false,
			resolve: {
				currentUser: resolveCurrentUser
			}
		})

		.state('player', {
			url: '/player/:videoId?currentTime?sessionId',
			templateUrl: '/streama/player.htm',
			controller: 'playerCtrl',
			resolve: {
				currentUser: resolveCurrentUser
			}
		})
		.state('sub-profiles', {
			url: '/sub-profiles',
			templateUrl: '/streama/sub-profiles.htm',
			controller: 'subProfilesCtrl'
		})

		.state('profile', {
			url: '/profile',
			templateUrl: '/streama/profile.htm',
			controller: 'profileCtrl',
			resolve: {
				currentUser: resolveCurrentUser
			}
		})

		.state('help', {
			url: '/help',
			templateUrl: '/streama/help.htm',
			controller: 'helpCtrl'
		})


		//ADMIN ROUTES
		.state('admin', {
			url: '/admin',
			templateUrl: '/streama/admin.htm',
			controller: 'adminCtrl',
			resolve: {
				currentUser: checkPermission
			}
		})
		.state('admin.fileManager', {
			url: '/fileManager',
			templateUrl: '/streama/admin-fileManager.htm',
			controller: 'adminFileManagerCtrl'
		})
		.state('admin.movies', {
			url: '/movies',
			templateUrl: '/streama/admin-movies.htm',
			controller: 'adminMoviesCtrl as vm'
		})
		.state('admin.movie', {
			url: '/movie/:movieId',
			templateUrl: '/streama/admin-movie.htm',
			controller: 'adminMovieCtrl'
		})
		.state('admin.videos', {
			url: '/videos',
			templateUrl: '/streama/admin-videos.htm',
			controller: 'adminVideosCtrl'
		})
		.state('admin.video', {
			url: '/video/:videoId',
			templateUrl: '/streama/admin-video.htm',
			controller: 'adminVideoCtrl'
		})

		.state('admin.notifications', {
			url: '/notifications',
			templateUrl: '/streama/admin-notifications.htm',
			controller: 'adminNotificationsCtrl',
			resolve: {
				currentUser: checkPermissionAdmin
			}
		})

		.state('admin.newReleases', {
			url: '/newReleases',
			templateUrl: '/streama/admin-new-releases.htm',
			controller: 'adminNewReleasesCtrl'
		})
		.state('admin.shows', {
			url: '/shows',
			templateUrl: '/streama/admin-shows.htm',
			controller: 'adminShowsCtrl'
		})
		.state('admin.show', {
			url: '/show/:showId?episodeId?season',
			templateUrl: '/streama/admin-show.htm',
			controller: 'adminShowCtrl'
		})
    .state('admin.reports', {
      url: '/reports',
      templateUrl: '/streama/admin-reports.htm',
      controller: 'adminReportsCtrl',
      controllerAs: "vm"
    })



		//SETTINGS ROUTES
		.state('settings.users', {
			url: '/users',
			templateUrl: '/streama/settings-users.htm',
			controller: 'settingsUsersCtrl',
			resolve: {
				currentUser: checkPermissionAdmin
			}
		})
		.state('settings.userActivity', {
			url: '/user-activity',
			templateUrl: '/streama/settings-user-activity.htm',
			controller: 'settingsUserActivityCtrl',
      controllerAs: 'vm',
			resolve: {
				currentUser: checkPermissionAdmin
			}
		})
		.state('settings.settings', {
			url: '/settings',
			templateUrl: '/streama/settings-settings.htm',
			controller: 'settingsSettingsCtrl',
			resolve: {
				currentUser: checkPermissionAdmin
			}
		})

		.state('settings', {
			url: '/settings',
			templateUrl: '/streama/settings.htm',
			controller: 'settingsCtrl',
			resolve: {
				currentUser: checkPermission
			}
		});


	function resolveCurrentUser(apiService, $rootScope) {
		return apiService.currentUser().success(function (data) {
			if(!data){
				location.href = '/login/auth'
			}

			if (data) {
				$rootScope.currentUser = data;
				return data;
			}
		}).error(function (err, status) {
      if(status === 401){
        location.href = '/login/auth?sessionExpired=true'
      }
    });
	}

	function checkPermissionAdmin(apiService, $rootScope, $state) {
		return apiService.currentUser().success(function (data) {
			if(!data){
				location.href = '/login/auth'
			}
			if (data.isAdmin) {
				$rootScope.currentUser = data;
				return data;
			} else {
				$state.go('dash');
			}
		});
	}

	function checkPermission(apiService, $rootScope, $state) {
		return apiService.currentUser().success(function (data) {
			if(!data){
				location.href = '/login/auth'
			}
			if (data && data.authorities.length) {
				$rootScope.currentUser = data;
				return data;
			} else {
				$state.go('dash');
			}
		});
	}

});

