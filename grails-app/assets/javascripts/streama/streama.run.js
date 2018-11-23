angular.module('streama').run(function ($window, $rootScope, $state, localStorageService, apiService, modalService, userService, profileService) {
	apiService.currentUser().success(function (data) {
		userService.setCurrentUser(data);
	});

   profileService.getUserProfiles().success(
    function(data) {
      $rootScope.usersProfiles = data;
      $rootScope.currentProfile = profileService.getCurrentProfile() || $rootScope.usersProfiles[0];
    });
  $rootScope.setCurrentSubProfile = profileService.setCurrentProfile;

	$rootScope.baseData = {};
	$rootScope.isCurrentState = function (stateName) {
		return ($state.current.name == stateName);
	};

	$rootScope.searchMedia = function (query) {
		return apiService.dash.searchMedia(query).then(function (data) {
			return data.data.movies.concat(data.data.shows);
		});
	};

	apiService.settings.list().success(function (data) {
		$rootScope.settings = data;
	});

	$rootScope.getSetting = function (name) {
		return _.find($rootScope.settings, {name: name}) || _.find($rootScope.settings, {settingsKey: name});
	};

	$rootScope.selectFromSearch = function (item) {
    modalService.mediaDetailModal({mediaId: item.id, mediaType: item.mediaType});
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

	$rootScope.loginUser = function () {
	  $window.location.assign('/login/login');
  };


	$rootScope.$on('$stateChangeSuccess', function (e, toState) {
		$rootScope.toggleGenreMenu(true);
		if(toState.name == "player"){
			localStorageService.set('originUrl', location.href);
		}
	});
});
