angular.module('streama').run(function ($rootScope, $state, localStorageService, apiService, modalService, userService) {
	apiService.currentUser().success(function (data) {
		userService.setCurrentUser(data);
	});

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
});