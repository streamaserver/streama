//= require systaro/core/systaro.core

'use strict';

var streamaApp = angular.module('streamaApp', [
	'ui.router',
	'ui.bootstrap',
	'ngFileUpload',
	'ui.slider',
	'LocalStorageModule',
	'ui.select',
	'ngSanitize',
	'systaro.core'
]);



streamaApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

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
		.state('settings.profile', {
			url: '/profile',
			templateUrl: 'profile.htm',
			controller: 'settingsProfileCtrl',
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
    .state('help', {
      url: '/help',
      templateUrl: 'help.htm',
      controller: 'helpCtrl'
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


	$urlRouterProvider.otherwise('/dash');


	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.interceptors.push('httpInterceptor');

}])

	.factory('httpInterceptor', ['$rootScope', '$q', function ($rootScope, $q) {
		return {
			request: function (config) {
				config.params = config.params || {};
        if(config.params.socketSessionId){
          config.params.browserSocketUUID = $rootScope.browserSocketUUID;
        }
				return config || $q.when(config);
			},
			response: function (response) {
				return response || $q.when(response);
			},
			responseError: function (response) {

        if(response.status == 500){
          alertify.error('An internal Server error occured.');
        }

        if(response.status == 403){
          alertify.error('You do not have the rights to carry out this action.');
        }
        else if(response.status != 404 && response.status != 401 && response.status != 406){
          //alertify.error('A system error occurred');
        }


				return $q.reject(response);
			}
		};
	}]);


streamaApp.run(
  ['$rootScope', '$state', 'localStorageService', 'apiService', 'modalService',
  function ($rootScope, $state, localStorageService, apiService, modalService) {

    $rootScope.baseData = {};
    $rootScope.isCurrentState = function (stateName) {
      return ($state.current.name == stateName);
    };

    $rootScope.searchMedia = function (query) {
      return apiService.dash.searchMedia(query).then(function (data) {
        return data.data.movies.concat(data.data.shows);
      });
    };

    $rootScope.selectFromSearch = function (item) {
			modalService.mediaDetailModal(item.id, item.mediaType);
    };


		$rootScope.toggleGenreMenu = function (close) {
			if(close){
				$rootScope.genreMenuOpen = false;
			}else{
				$rootScope.genreMenuOpen = !$rootScope.genreMenuOpen;
			}
		};


		$rootScope.changeGenre = function (genre) {
			$rootScope.toggleGenreMenu(true);
			$state.go('dash', {genreId: (genre ? genre.id : null)});
			$rootScope.$broadcast('changedGenre', genre);
		};


    $rootScope.$on('$stateChangeSuccess', function (e, toState) {
			$rootScope.toggleGenreMenu(true);
      if(toState.name == "player"){
        localStorageService.set('originUrl', location.href);
      }
    });
}]);
