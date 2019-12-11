angular.module('streama')
  .run(function ($window, $rootScope, $state, localStorageService, apiService, modalService,
                 userService, profileService, $translate) {

	$rootScope.baseData = {};
	$rootScope.isCurrentState = isCurrentState;
	$rootScope.searchMedia = searchMedia;
	$rootScope.getSetting = getSetting;
	$rootScope.selectFromSearch = selectFromSearch;
	$rootScope.toggleGenreMenu = toggleGenreMenu;
	$rootScope.changeGenre = changeGenre;
	$rootScope.changeDashType = changeDashType;
	$rootScope.isDashType = isDashType;
	$rootScope.loginUser = loginUser;


	$rootScope.$on('streama.profiles.onChange', loadAndInitProfiles);
	$rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);

	init();

	function init() {
		apiService.currentUser().then(onCurrentUserLoaded);
		loadAndInitProfiles();
	}

	function onCurrentUserLoaded(data) {
		userService.setCurrentUser(data);

		apiService.settings.list().then(function (response) {
			$rootScope.settings = response.data;
			$rootScope.isDownloadButtonVisible = getSetting('player_showDownloadButton').parsedValue && ($rootScope.currentUser.isTrustedUser || getSetting('player_downloadForAllUsers').parsedValue);
		});
	}

	function getSetting(name) {
		return _.find($rootScope.settings, {name: name}) || _.find($rootScope.settings, {settingsKey: name});
	}

	function searchMedia(query) {
		return apiService.dash.searchMedia(query).then(function (data) {
			return data.data.movies.concat(data.data.shows);
		});
	}

	function selectFromSearch(item) {
		modalService.mediaDetailModal({mediaId: item.id, mediaType: item.mediaType});
	}

	function toggleGenreMenu(close) {
		if(close){
			$rootScope.genreMenuOpen = false;
		}else{
			$rootScope.genreMenuOpen = !$rootScope.genreMenuOpen;
		}
	}

	function isCurrentState(stateName) {
		return ($state.current.name == stateName);
	}

	function changeGenre(genre) {
		$rootScope.toggleGenreMenu(true);
		$state.go('dash', {genreId: (genre ? genre.id : null)});
		$rootScope.$broadcast('changedGenre', genre);
	}

	function changeDashType(dashType) {
    $state.go('dash', {dashType: dashType}, {reload: true});
  }

  function isDashType(dashType) {
    return _.get($state.params, 'dashType') === dashType;
  }

	function loginUser() {
		$window.location.assign('/login/login');
	}

	function onStateChangeSuccess(e, toState) {
		$rootScope.toggleGenreMenu(true);
		if(toState.name == "player"){
			localStorageService.set('originUrl', location.href);
		}
	}


	function loadAndInitProfiles() {
    profileService.getUserProfiles().then(
      function(data) {
        var savedProfile = profileService.getCurrentProfile();
        if(!savedProfile){
          $state.go('sub-profiles');
        }
        $rootScope.usersProfiles = data.data;
        $rootScope.currentProfile = savedProfile || $rootScope.usersProfiles[0];
        $translate.use(_.get($rootScope, 'currentProfile.profileLanguage') || _.get($rootScope, 'currentUser.language') || 'en')
      });
    $rootScope.setCurrentSubProfile = profileService.setCurrentProfile;
  }
});
