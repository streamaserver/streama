//= require systaro/core/systaro.core

'use strict';

var streamaApp = angular.module('streamaApp', [
	'ui.router',
	'ui.bootstrap',
	'ngFileUpload',
	'ui.slider',
	'pascalprecht.translate',
	'LocalStorageModule',
	'ui.select',
	'ngSanitize',
	'systaro.core'
]);



streamaApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$translateProvider',
	function ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {

	$translateProvider.preferredLanguage('en');
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
