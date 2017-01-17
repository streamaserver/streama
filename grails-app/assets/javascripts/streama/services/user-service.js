'use strict';

angular.module('streama').factory('userService', function ($rootScope, $translate) {
	return {
		setCurrentUser: function (data) {
			$rootScope.currentUser = data;
			$translate.use($rootScope.currentUser.language || 'en');
		}
	};
});
