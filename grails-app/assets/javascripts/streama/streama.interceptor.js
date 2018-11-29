//= wrapped

angular.module('streama').config(function ($httpProvider) {
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.interceptors.push('httpInterceptor');
});


angular.module('streama').factory('httpInterceptor', function ($rootScope, $q, localStorageService) {
	return {
		request: function (config) {
			config.params = config.params || {};
			if(config.params.socketSessionId){
				config.params.browserSocketUUID = $rootScope.browserSocketUUID;
			}
			if (localStorageService.get('currentProfile')){
        config.headers.profileId = localStorageService.get('currentProfile').id || 0;
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
});
