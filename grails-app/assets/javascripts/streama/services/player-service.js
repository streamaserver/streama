'use strict';

angular.module('streama').factory('playerService',
  function ($stateParams, $sce, $state, $rootScope, socketService, apiService, $interval, $filter, contextPath) {

    var videoData = null;
    var videoOptions;
    var defaultVideoOptions = {
      customStartingTime: 0,
      rememberVolumeSetting: true,
      videoMetaTitle: '',
      videoMetaSubtitle: '',
      videoMetaDescription: '',
      videoSrc: '',
      videoType: '',
      videoTrack: '',
      videoOverlayEnabled: true,
      showEpisodeBrowser: false,
      showNextButton: false,
      showSocketSession: true,
      episodeList: [],
      selectedEpisodes: [],
      currentEpisode: {},
      onSocketSessionCreate: angular.noop,
      onTimeChange: angular.noop,
      onError: angular.noop,
      onPlay: angular.noop,
      onPause: angular.noop,
      onClose: angular.noop,
      onNext: angular.noop,
      onVideoClick: angular.noop
    };

    return {
      getVideoOptions: function()
      {
        return videoOptions;
      },
      setVideoOptions: function (video) {
        videoOptions = angular.copy(defaultVideoOptions);
        videoData = video;
        videoOptions.videoSrc = $sce.trustAsResourceUrl(video.files[0].src || video.files[0].externalLink);
        videoOptions.videoType = video.files[0].contentType;

        if(video.subtitles && video.subtitles.length){
          videoOptions.videoTrack = $sce.trustAsResourceUrl(video.subtitles[0].src);
        }

        videoOptions.isExternalLink = video.files[0].externalLink;
        videoOptions.videoMetaTitle = (video.show ? video.show.name : video.title);
        videoOptions.videoMetaSubtitle = (video.show ? video.episodeString + ' - ' + video.name : (video.release_date ? video.release_date.substring(0, 4) : ''));
        videoOptions.videoMetaDescription = video.overview;

        if(videoData.nextEpisode){
          console.log('%c showNextButton', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          videoOptions.showNextButton = true;
        }

        if(videoData.show){
          videoOptions.showEpisodeBrowser = true;

          apiService.tvShow.episodesForTvShow(videoData.show.id).success(function (episodes) {
            videoOptions.episodeList = _.groupBy(episodes, 'season_number');
            videoOptions.selectedEpisodes = videoOptions.episodeList[videoData.season_number];
            videoOptions.currentEpisode = {
              episode: videoData.episode_number,
              season: videoData.season_number,
              intro_start: videoData.intro_start,
              intro_end: videoData.intro_end,
              outro_start: videoData.outro_start
            };
          });
        }

        if($stateParams.currentTime){
          videoOptions.customStartingTime = $stateParams.currentTime;
        }
        else if(video.viewedStatus){
          videoOptions.customStartingTime = video.viewedStatus.currentPlayTime;
        }else{
          videoOptions.customStartingTime = 0;
        }

        videoOptions.onPlay = this.onVideoPlay.bind(videoOptions);
        videoOptions.onPause = this.onVideoPause.bind(videoOptions);
        videoOptions.onError = this.onVideoError.bind(videoOptions);
        videoOptions.onTimeChange = this.onVideoTimeChange.bind(videoOptions);
        videoOptions.onClose = this.onVideoClose.bind(videoOptions);
        videoOptions.onNext = this.onNext.bind(videoOptions);
        videoOptions.onVideoClick = this.onVideoClick.bind(videoOptions);
        videoOptions.onSocketSessionCreate = this.onSocketSessionCreate.bind(videoOptions);

        return videoOptions;
      },

      viewingStatusSaveInterval: null,

      onVideoPlay: function (videoElement, socketData) {
        var that = this;
        console.log('%c onVideoPlay', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');

        that.viewingStatusSaveInterval = $interval(function() {
          var params = {videoId: videoData.id, currentTime: videoElement.currentTime, runtime: videoElement.duration};

          if(params.runtime && params.videoId){
            apiService.viewingStatus.save(params);
          }
        }, 5000);


        if($stateParams.sessionId && !socketData){
          console.log('%c send socket event PLAY', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          apiService.websocket.triggerPlayerAction({socketSessionId: $stateParams.sessionId, playerAction: 'play', currentPlayerTime: videoElement.currentTime});
        }
      },

      onVideoPause: function (videoElement, socketData) {
        console.log('%c onVideoPause', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', socketData);
        var that = this;
        $interval.cancel(that.viewingStatusSaveInterval);

        if($stateParams.sessionId && socketData){
          if(videoElement.currentTime+1.5 > socketData.currentPlayerTime || videoElement.currentTime-1.5 < socketData.currentPlayerTime){
            videoElement.currentTime = socketData.currentPlayerTime;
          }
        }


        if($stateParams.sessionId && !socketData){
          console.log('%c send socket event PAUSE', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          apiService.websocket.triggerPlayerAction({socketSessionId: $stateParams.sessionId, playerAction: 'pause', currentPlayerTime: videoElement.currentTime});
        }
      },

      onVideoClose: function () {
        console.log('%c onVideoClose', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
        var that = this;
        $state.go('dash', {});
      },

      onVideoError: function (errorCode) {
        var that = this;
				errorCode = errorCode || 'CODEC_PROBLEM';
        console.log('%c onVideoError', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');

        if($state.current.name == 'player'){
          alertify.alert($filter('translate')('MESSAGES.' + errorCode), function () {
            if($rootScope.currentUser.authorities.length){
              if(videoData.show){
                $state.go('admin.show', {showId: videoData.show.id});
              }else{
                $state.go('admin.movie', {movieId: videoData.id});
              }
            }else{
              $state.go('dash', {});
            }

          });
        }
      },

      onVideoTimeChange: function (slider, duration) {
        var params = {videoId: videoData.id, currentTime: slider.value, runtime: duration};
        apiService.viewingStatus.save(params);


        if($stateParams.sessionId){
          apiService.websocket.triggerPlayerAction({socketSessionId: $stateParams.sessionId, playerAction: 'timeChange', currentPlayerTime: slider.value});
        }
      },

      onSocketSessionCreate: function () {
        alertify.set({ buttonReverse: true, labels: {ok: "OK", cancel : "Cancel"}});
        alertify.confirm($filter('translate')('MESSAGES.SHARE_SOCKET'), function (confirmed) {
          if(confirmed){
            $stateParams.sessionId = socketService.getUUID();
            $state.go($state.current, $stateParams, {reload: true});
          }
        });
      },

      handleMissingFileError: function (video) {
        var hasError = false;

        if(!video.files || !video.files.length){
          hasError = true;
          alertify.alert($filter('translate')('MESSAGES.FILE_MISSING'), function () {
            if($rootScope.currentUser.authorities.length){
              if(video.show){
                $state.go('admin.show', {showId: video.show.id});
              }else{
                $state.go('admin.movie', {movieId: video.id});
              }
            }else{
              $state.go('dash', {});
            }

          });
        }

        return hasError;
      },

      handleWrongBasepathError: function (video) {
        var hasError = false;
        var videoSource = video.files[0].src;
        var externalLink = video.files[0].externalLink;
        var basePath = location.origin + contextPath;

        if(videoSource && videoSource.indexOf(basePath) == -1 && !externalLink){
          hasError = true;
          alertify.alert($filter('translate')('MESSAGES.WRONG_BASEPATH', {basePath: basePath}), function () {
            if(_.find($rootScope.currentUser.authorities, {authority: "ROLE_ADMIN"})){
              $state.go('settings.settings');
            }else{
              $state.go('dash', {});
            }

          });
        }
        return hasError;
      },

      registerSocketListener: function () {
        if($stateParams.sessionId){
          socketService.registerPlayerSessonListener($stateParams.sessionId);
        }
      },

      destroyPlayer: function () {
        console.log('%c $stateChangeSuccess', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
        var that = this;
        $interval.cancel(that.viewingStatusSaveInterval);
        socketService.unsubscribe();
      },

      handleSocketEvent: function (data) {
        if(data.browserSocketUUID != socketService.browserSocketUUID){
          console.log('%c handleSocketEvent', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          switch (data.playerAction){
            case 'play':
              $rootScope.$broadcast('triggerVideoPlay', data);
              break;
            case 'pause':
              $rootScope.$broadcast('triggerVideoPause', data);
              break;
            case 'timeChange':
              $rootScope.$broadcast('triggerVideoTimeChange', data);
              break;
          }
        }
      },


      onNext: function () {
        $state.go('player', {videoId: videoData.nextEpisode.id});
      },


      onVideoClick: function () {
        if($rootScope.currentUser.pauseVideoOnClick){
          $rootScope.$broadcast('triggerVideoToggle');
        }
      }
    };
});
