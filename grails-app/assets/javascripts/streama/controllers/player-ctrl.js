'use strict';

angular.module('streama').controller('playerCtrl', [
	'$scope', 'apiService', '$stateParams', 'playerService', '$rootScope',
	function ($scope, apiService, $stateParams, playerService, $rootScope) {

		apiService.video.get($stateParams.videoId).then(function (response) {
			$scope.video = response.data;

			var missingFileError = playerService.handleMissingFileError($scope.video);

			if(!missingFileError){
				$scope.videoOptions = playerService.setVideoOptions($scope.video, $rootScope.settings);
			}

			playerService.registerSocketListener();

		});

		$rootScope.$on('$stateChangeStart', function(e, toState){
			if(toState.name != 'player'){
				playerService.destroyPlayer();
			}
		});

		$scope.$on('playerSession', function (e, data) {
			playerService.handleSocketEvent(data);
		});
	}]);
