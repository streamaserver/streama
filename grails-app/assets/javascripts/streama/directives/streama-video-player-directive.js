'use strict';

angular.module('streama').directive('streamaVideoPlayer', [
  'uploadService', 'localStorageService', '$timeout', 'playerService', '$http',
  function (uploadService, localStorageService, $timeout, playerService, $http) {

    return {
      restrict: 'AE',
      templateUrl: '/streama/streama-video-player.htm',
      scope: {
        options: '='
      },

      link: function ($scope, $elem, $attrs) {
				var video;
        var controlDisplayTimeout;
        var overlayTimeout;
        var volumeChangeTimeout;
        var currentTimeChangeTimeout;
				var currEpisode = null;
        var skippingDuration = 20;  //Skipping duration for holding an arrow key to left or right.
        var longSkippingDuration = 60; //Skipping duration for holding ctrl + arrow key.
        var skipIntro = true;         //Userflag intro should be skipped
        var minimizeOnOutro = true;   //Userflag skip to next episode on outro
				var videoSrc = $scope.options.videoSrc.toString();

				$scope.showControls = showControls;
				$scope.toggleSelectEpisodes = toggleSelectEpisodes;
				$scope.createNewPlayerSession = createNewPlayerSession;
        $scope.toggleTextTrack = toggleTextTrack;
        $scope.playerVolumeToggle = playerVolumeToggle;
				$scope.play = play;
				$scope.pause = pause;
				$scope.closeVideo = closeVideo;
				$scope.clickVideo = clickVideo;
				$scope.fullScreen = toggleFullScreen;
				$scope.next = $scope.options.onNext;
				$scope.isInitialized = false;
				$scope.loading = true;
				$scope.initialPlay = false;

				if(!$scope.options.isExternalLink){
					$http.head(videoSrc)
						.success(function(){
							initDirective();
						})
						.error(function(data, status) {
							if(status == 406){
								$scope.options.onError('FILE_IN_FS_NOT_FOUND');
							}
						});
				}else{
					initDirective();
				}

				function initDirective() {
					$scope.isInitialized = true;

					$elem.addClass('nocursor');

					initMouseWheel();
					initMousetrap();
					initExternalTriggers();
					initIsMobile();
					$scope.volumeLevel = localStorageService.get('volumeLevel') || 5;
					$scope.$on('$destroy', onDirectiveDestroy);
					$scope.$on('$stateChangeSuccess', onStateChangeSuccess);

					$timeout(function () {
						var $video = $elem.find('video');
						$video.bind("contextmenu",function(){return false;});
						video = $video[0];
						video.oncanplay = oncanplay;
						video.onwaiting = onwaiting;
						video.onplaying = onplaying;
						video.onerror = onerror;
						video.ontimeupdate = ontimeupdate;
						video.addEventListener('ended', onVideoEnded);
						$scope.scrubberOptions = generateScrupperOoptions();
						$scope.volumeScrubberOptions = generateVolumeScrubberOptions();
					});
				}

        //$scope.controlsVisible = true;
        function showControls() {
          $elem.removeClass('nocursor');
          $timeout.cancel(controlDisplayTimeout);
          $timeout.cancel(overlayTimeout);
          $scope.controlsVisible = true;
          $scope.overlayVisible = false;


          controlDisplayTimeout = $timeout(function(){
            $scope.controlsVisible = false;

            if(!$scope.playing){
              overlayTimeout = $timeout(function () {
                if(!$scope.playing){
                  $scope.overlayVisible = true;
                }
              }, 5000);
            }else{
              $elem.addClass('nocursor');
            }

          }, 1000);
        }

				function generateScrupperOoptions() {
					return {
						orientation: 'horizontal',
						min: 0,
						max: 255,
						range: 'min',
						change: function (e, slider) {
							angular.element('#playerDurationSlider .ui-slider-handle').blur();
						},
						stop: function (e, slider) {
							angular.element('#playerDurationSlider .ui-slider-handle').blur();
							video.currentTime = slider.value;
							$scope.currentTime = slider.value;
							$scope.options.onTimeChange(slider, $scope.videoDuration);

						}
					};
				}

				function generateVolumeScrubberOptions() {
					return {
						orientation: 'vertical',
						range: 'min',
						change: function (e, slider) {
							setVolume(slider);
							angular.element('#playerVolumeSlider .ui-slider-handle').blur();
						},
						slide: function (e, slider) {
							setVolume(slider);
							angular.element('#playerVolumeSlider .ui-slider-handle').blur();
						}
					};
				}

				function closeVideo() {

					//If full screen is enabled, it will be canceled.
					if ($scope.isFullScreen == true) {
						$scope.fullScreen();
					}

					$scope.options.onClose();
				}

				function clickVideo() {
					$scope.options.onVideoClick();
				}

				function toggleFullScreen() {
					var docElm;
					var docElmClose = document;
					if($scope.isMobile){
						docElm = video;
					}else{
						docElm = document.documentElement;
					}
					var isFullScreen = window.innerHeight == screen.height;
					if( !isFullScreen) {
						$scope.isFullScreen = true;
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
						$scope.isFullScreen = false;
						if (docElmClose.exitFullscreen) {
							docElmClose.exitFullscreen();
						}
						else if (docElmClose.mozCancelFullScreen) {
							docElmClose.mozCancelFullScreen();
						}
						else if (docElmClose.webkitExitFullscreen) {
							docElmClose.webkitExitFullscreen();
						}
						else if (docElmClose.msExitFullscreen) {
							docElmClose.msExitFullscreen();
						}
					}
				}

				function setVolume(slider) {
					var volume = slider.value / 10;
					video.volume = volume;
					if($scope.options.rememberVolumeSetting){
						localStorageService.set('volumeLevel', $scope.volumeLevel);
					}
				}

				function playerVolumeToggle() {
					if($scope.volumeLevel == 0){
						$scope.volumeLevel = 5;
					}else{
						$scope.volumeLevel = 0;
					}
				}

        function initExternalTriggers() {
					$scope.$on('triggerVideoPlay', function (e, data) {
						$scope.play(data);
					});
					$scope.$on('triggerVideoPause', function (e, data) {
						$scope.pause(data);
					});
					$scope.$on('triggerVideoToggle', function (e, data) {
						if ($scope.playing) {
							$scope.pause(data);
						} else {
							$scope.play(data);
						}
					});
					$scope.$on('triggerVideoTimeChange', function (e, data) {
						video.currentTime = data.currentPlayerTime;
						$scope.currentTime = data.currentPlayerTime;
					});
				}

				function onStateChangeSuccess(e, toState) {
					if(toState.name != "player"){
						//If full screen is enabled, it will be canceled.
						if ($scope.isFullScreen = true) {
							$scope.fullScreen();
						}
					}
				}

				function onDirectiveDestroy() {

					//Disable these shortcut keys for other pages. They are re-initialized when the user opens the player again.
					Mousetrap.reset();

					console.log("destroy");
					video.pause();
					video.src = '';
					$elem.find('video').children('source').prop('src', '');
					$elem.find('video').remove().length = 0;
				}

				function ontimeupdate(event){
					$scope.currentTime = video.currentTime;
					$scope.$apply();
					if(skipIntro)
					{
						if(currEpisode == null)
						{
							currEpisode = playerService.getVideoOptions().currentEpisode;
						}
						if(currEpisode.intro_start < this.currentTime && this.currentTime < currEpisode.intro_end)
						{
							video.currentTime = currEpisode.intro_end;
						}
					}
				}

				function onVideoEnded() {
					if($scope.options.showNextButton){
						$scope.options.onNext();
					}
				}

				function onerror(){
					if(!video.duration && !$scope.initialPlay){
						$scope.options.onError();
					}
				}

				function onplaying() {
					$scope.loading = false;
				}

				function oncanplay() {
					if(!$scope.initialPlay){
						$scope.canplay = true;
						console.log('%c oncanplay', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
						$scope.loading = false;
						if(!$scope.isMobile){
							$scope.play();
						}else{
							$scope.pause();
						}
						$scope.videoDuration = video.duration;
						video.currentTime = $scope.options.customStartingTime || 0;
						$scope.currentTime = video.currentTime;
						$scope.initialPlay = true;
						if($scope.options.videoTrack){
							video.textTracks[0].mode = "hidden";
						}
					}
				}

				function onwaiting() {
					$scope.loading = true;
				}

				function toggleSelectEpisodes(episodes) {
					$scope.options.selectedEpisodes = episodes;
				}

				function pause(socketData) {
					video.pause();
					$scope.playing = false;
					$scope.options.onPause(video, socketData);
				}

				function play(socketData) {
					video.play();
					$scope.playing = true;
					$scope.options.onPlay(video, socketData);
					$scope.overlayVisible = false;
				}

				function createNewPlayerSession() {
					$scope.options.onSocketSessionCreate();
				}

				function toggleTextTrack() {
					$scope.isTextTrackVisible = !$scope.isTextTrackVisible;

					if($scope.isTextTrackVisible){
						video.textTracks[0].mode = "showing";
					}else{
						video.textTracks[0].mode = "hidden";
					}
				}

				//Changes the video player's volume. Takes the changing amount as a parameter.
				function changeVolume(amount) {
					$scope.volumeChanged = true;
					$timeout.cancel(volumeChangeTimeout);
					//console.log('%c event', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', event);
					$scope.volumeLevel += amount;
					//console.log('%c event', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', event.deltaY, $scope.volumeLevel);
					$scope.volumeLevel = $scope.volumeLevel.clamp(0, 10);
					$scope.$apply();

					volumeChangeTimeout = $timeout(function () {
						$scope.volumeChanged = false;
					}, 1500);
				}

				function initIsMobile() {
					$scope.isMobile = false; //initiate as false
					// device detection
					if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
						|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
						$scope.isMobile = true;
					}
				}
				//Shows the video's current time and duration on the upper right corner of the screen for a limited time.
				function skipActivated(){

					$scope.currentTimeChanged = true;
					$scope.options.onTimeChange(video.currentTime, $scope.videoDuration);
					$timeout.cancel(currentTimeChangeTimeout);
					$scope.$apply();

					currentTimeChangeTimeout = $timeout(function () {
						$scope.currentTimeChanged = false;
					}, 10000);
				}


				function initMouseWheel() {
					jQuery($elem).mousewheel(function (event) {
						if (event.deltaY > 0) {
							changeVolume(1);
						} else if (event.deltaY < 0) {
							changeVolume(-1);
						}
						$scope.showControls();
					});
				}

				function initMousetrap() {
          //Shortcuts:
					Mousetrap.bind('left', function (event) {
						event.preventDefault();
						skipActivated();
						video.currentTime -= skippingDuration;
					}, 'keyup');

					Mousetrap.bind('right', function (event) {
						event.preventDefault();
						skipActivated();
						video.currentTime += skippingDuration;
					}, 'keyup');

					Mousetrap.bind('ctrl+right', function (event) {
						event.preventDefault();
						skipActivated();
						video.currentTime += longSkippingDuration;
					}, 'keyup');

					Mousetrap.bind('ctrl+left', function (event) {
						event.preventDefault();
						skipActivated();
						video.currentTime -= longSkippingDuration;
					}, 'keyup');

					Mousetrap.bind('alt+enter', function (event) {
						event.preventDefault();
						$scope.fullScreen();
					});

					Mousetrap.bind(['backspace', 'del'], function (event) {
						event.preventDefault();
						$scope.closeVideo();
					});

					Mousetrap.bind('s', function (event) {
						event.preventDefault();
						$scope.toggleTextTrack();
					});

					Mousetrap.bind('up', function (event) {
						event.preventDefault();
						changeVolume(1);
					});

					Mousetrap.bind('down', function (event) {
						event.preventDefault();
						changeVolume(-1);
					});

					Mousetrap.bind('m', function (event) {
						event.preventDefault();
						$scope.playerVolumeToggle();
						$scope.showControls();
					});

					Mousetrap.bind('e', function (event) {
						event.preventDefault();
						$scope.toggleSelectEpisodes();
						$scope.showControls();
					});

					Mousetrap.bind('space', function () {
						if ($scope.playing) {
							$scope.pause();
						} else {
							$scope.play();
						}
						$scope.$apply();
					});
				}


			}
    }
  }]);
