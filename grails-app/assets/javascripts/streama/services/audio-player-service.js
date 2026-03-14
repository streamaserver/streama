'use strict';

angular.module('streama').factory('audioPlayerService', function ($rootScope) {
  var audio = new Audio();
  var state = {
    currentTrack: null,
    queue: [],
    queueIndex: -1,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isShuffle: false,
    repeatMode: 'off' // off, all, one
  };

  audio.volume = state.volume;

  audio.addEventListener('timeupdate', function () {
    state.currentTime = audio.currentTime;
    state.duration = audio.duration || 0;
    $rootScope.$applyAsync();
  });

  audio.addEventListener('ended', function () {
    if (state.repeatMode === 'one') {
      audio.currentTime = 0;
      audio.play();
    } else {
      service.next();
    }
    $rootScope.$applyAsync();
  });

  audio.addEventListener('loadedmetadata', function () {
    state.duration = audio.duration;
    $rootScope.$applyAsync();
  });

  var service = {
    state: state,

    play: function (track, queue, index) {
      if (track) {
        state.currentTrack = track;
        if (queue) {
          state.queue = queue;
          state.queueIndex = index || 0;
        }

        var src = getTrackSrc(track);
        if (src) {
          audio.src = src;
          audio.play();
          state.isPlaying = true;
        }
      } else if (state.currentTrack) {
        audio.play();
        state.isPlaying = true;
      }
    },

    pause: function () {
      audio.pause();
      state.isPlaying = false;
    },

    togglePlay: function () {
      if (state.isPlaying) {
        service.pause();
      } else {
        service.play();
      }
    },

    next: function () {
      if (state.queue.length === 0) return;

      var nextIndex;
      if (state.isShuffle) {
        nextIndex = Math.floor(Math.random() * state.queue.length);
      } else {
        nextIndex = state.queueIndex + 1;
        if (nextIndex >= state.queue.length) {
          if (state.repeatMode === 'all') {
            nextIndex = 0;
          } else {
            state.isPlaying = false;
            return;
          }
        }
      }

      state.queueIndex = nextIndex;
      service.play(state.queue[nextIndex]);
    },

    previous: function () {
      if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
      }

      if (state.queue.length === 0) return;

      var prevIndex = state.queueIndex - 1;
      if (prevIndex < 0) {
        prevIndex = state.repeatMode === 'all' ? state.queue.length - 1 : 0;
      }

      state.queueIndex = prevIndex;
      service.play(state.queue[prevIndex]);
    },

    seek: function (fraction) {
      if (audio.duration) {
        audio.currentTime = fraction * audio.duration;
      }
    },

    setVolume: function (vol) {
      state.volume = vol;
      audio.volume = vol;
    },

    toggleShuffle: function () {
      state.isShuffle = !state.isShuffle;
    },

    toggleRepeat: function () {
      var modes = ['off', 'all', 'one'];
      var idx = modes.indexOf(state.repeatMode);
      state.repeatMode = modes[(idx + 1) % modes.length];
    },

    formatTime: function (seconds) {
      if (!seconds || isNaN(seconds)) return '0:00';
      var mins = Math.floor(seconds / 60);
      var secs = Math.floor(seconds % 60);
      return mins + ':' + (secs < 10 ? '0' : '') + secs;
    },

    getProgress: function () {
      if (!state.duration) return 0;
      return (state.currentTime / state.duration) * 100;
    },

    getCoverPath: function () {
      if (!state.currentTrack) return null;
      if (state.currentTrack.album) return state.currentTrack.album.cover_path;
      if (state.currentTrack.podcast) return state.currentTrack.podcast.cover_path;
      return null;
    }
  };

  function getTrackSrc(track) {
    if (!track || !track.files || !track.files.length) return null;
    var file = track.files[0];
    if (file.src) return file.src;
    if (file.externalLink) return file.externalLink;
    return 'file/serve?id=' + file.id;
  }

  return service;
});
