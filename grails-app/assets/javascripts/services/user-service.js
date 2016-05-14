'use strict';

streamaApp.factory('userService', function ($rootScope, $translate) {
	return {
		setCurrentUser: function (data) {
			$rootScope.currentUser = data;
			$translate.use($rootScope.currentUser.language || 'en');
		}
	};
});
