'use strict';

streamaApp.controller('playerCtrl', [
	'$scope', 'apiService', '$stateParams', '$timeout', '$rootScope', '$state', '$interval', '$sce', 'socketService',
	function ($scope, apiService, $stateParams, $timeout, $rootScope, $state, $interval, $sce, socketService) {
		$scope.loading = true;
		var video = $('#video')[0];
		var controlDisplayTimeout;
		var overlayTimeout;
		var timeCheckInterval;
		var viewingStatusSaveInterval;

		$scope.volumeLevel = 5;

		apiService.video.get($stateParams.videoId).success(function (data) {
			$scope.video = data;
			 
			if(data.show){
				apiService.tvShow.episodesForTvShow(data.show.id).success(function (episodes) {
					$scope.groupedEpisodes = _.groupBy(episodes, 'season_number');
					$scope.selectedEpisodes = $scope.groupedEpisodes[$scope.video.season_number];
				});
			}

			$timeout(function () {
				$scope.loading = false;
				$scope.play();
				$scope.videoDuration = video.duration;
				
				if($stateParams.currentTime){
					$scope.currentTime = $stateParams.currentTime;
				}
				else if(data.viewedStatus){
					$scope.currentTime = data.viewedStatus.currentPlayTime;
				}else{
					$scope.currentTime = 0;
				}
				video.currentTime = $scope.currentTime;
			}, 3000);
		});

		
		
		$scope.toggleSelectEpisodes = function (episodes) {
			$scope.selectedEpisodes = episodes;
		};
		
		$scope.createNewPlayerSession = function () {
			alertify.confirm('By creating a new session you will be redirected back to this player, but this time you will ' +
			'have a unique session ID in the url. Share this with your friends to have a syncronized watching experience with them!', function (confirmed) {
				if(confirmed){
					$stateParams.sessionId = socketService.getUUID();
					$state.go($state.current, $stateParams, {reload: true});
				}
			});
		};
		
		
		if($stateParams.sessionId){
			socketService.registerPlayerSessonListener($stateParams.sessionId);

			$scope.$on('playerSession', function (e, data) {
				if(data.browserSocketUUID != socketService.browserSocketUUID){
					if(data.playerAction == 'play'){
						$scope.play(true);
					}else if(data.playerAction == 'pause'){
						$scope.pause(true);
					}
				}

			});
		}

		
		
		Mousetrap.bind('space', function() {
			if($scope.playing){
				$scope.pause();
			}else{
				$scope.play();
			}
		});

		$scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		};
		
		//$scope.controlsVisible = true;
		$scope.showControls = function () {
			$timeout.cancel(controlDisplayTimeout);
			$timeout.cancel(overlayTimeout);
			$scope.controlsVisible = true;
			$scope.overlayVisible = false;


			controlDisplayTimeout = $timeout(function(){
				$scope.controlsVisible = false;

				if(!$scope.playing)
					overlayTimeout = $timeout(function () {
						if(!$scope.playing){
							$scope.overlayVisible = true;
						}
					}, 5000);
			}, 3000);
		};
		
		$scope.playerVolumeToggle = function () {
			if($scope.volumeLevel == 0){
				$scope.volumeLevel = 6;	
			}else{
				$scope.volumeLevel = 0;
			}
		};
		
		$scope.scrubberOptions = {
			orientation: 'horizontal',
			min: 0,
			max: 255,
			range: 'min',
			change: function (e, slider) {
				//console.log('%c slider.value', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', slider.value);
				//video.currentTime = slider.value;
			},
			stop: function (e, slider) {
				video.currentTime = slider.value;

				var params = {videoId: $scope.video.id, currentTime: slider.value, runtime: $scope.videoDuration};
				apiService.viewingStatus.save(params);
			}
		};
		
		$scope.volumeScrubberOptions = {
			orientation: 'vertical', 
			range: 'min',
			change: function (e, slider) {
				var volume = slider.value / 10;
				video.volume = volume;
			},
			slide: function (e, slider) {
				var volume = slider.value / 10;
				video.volume = volume;
			}
		};



		$scope.backToDash = function () {
			destroyPlayer();
			$state.go('dash');
		};

		$scope.nextEpisode = function () {
			destroyPlayer();
			$state.go('player', {videoId: $scope.video.nextEpisode.id});
		};

		$scope.play = function (excludeSocket) {
			video.play();
			$scope.playing = true;

			timeCheckInterval = $interval(function() {
				$scope.currentTime = video.currentTime;
			}, 1000);

			viewingStatusSaveInterval = $interval(function() {
				var params = {videoId: $scope.video.id, currentTime: $scope.currentTime, runtime: $scope.videoDuration};
				apiService.viewingStatus.save(params);
			}, 5000);
			
			
			if($stateParams.sessionId && !excludeSocket){
				apiService.websocket.triggerPlayerAction($stateParams.sessionId, 'play');
			}
		};


		$scope.pause = function (excludeSocket) {
			video.pause();
			$scope.playing = false;
			$interval.cancel(viewingStatusSaveInterval);
			$interval.cancel(timeCheckInterval);

			
			if($stateParams.sessionId && !excludeSocket){
				apiService.websocket.triggerPlayerAction($stateParams.sessionId, 'pause');
			}
		};
		
		$scope.getStyleProgress = function (attribute) { 
			var percentage = video.currentTime /  video.duration * 100;
			var returnObj = {};
			returnObj[attribute] = percentage+'%';
			return returnObj;
		};
		
		$scope.fullScreen = function () {
			$scope.isFullScreen = !$scope.isFullScreen;
			
			if($scope.isFullScreen){
				var docElm = document.documentElement;
				if (docElm.requestFullscreen) {
					docElm.requestFullscreen();
				}
				else if (docElm.mozRequestFullScreen) {
					docElm.mozRequestFullScreen();
				}
				else if (docElm.webkitRequestFullScreen) {
					docElm.webkitRequestFullScreen();
				}
				else if (docElm.msRequestFullscreen) {
					docElm.msRequestFullscreen();
				}				
			}
			
			else{
				if (document.exitFullscreen) {
					document.exitFullscreen();
				}
				else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				}
				else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				}
				else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			}
		};


		var destroyPlayer = function () {
			video.pause();
			video.src = '';
			$(video).children('source').prop('src', '');
			$(video).remove().length = 0;
			$interval.cancel(viewingStatusSaveInterval);
			$interval.cancel(timeCheckInterval);
		};

		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
			if(toState.name != 'player'){
				destroyPlayer();
			}
		});
		
		
}]);