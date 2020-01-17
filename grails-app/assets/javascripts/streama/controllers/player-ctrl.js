'use strict';

angular.module('streama').controller('playerCtrl', [
	'$scope', '$stateParams', 'playerService', '$rootScope', 'Video',
	function ($scope, $stateParams, playerService, $rootScope, Video) {

		Video.get({id: $stateParams.videoId}).$promise.then(function (response) {
			$scope.video = response;

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
