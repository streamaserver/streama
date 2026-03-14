'use strict';

angular.module('streama').controller('audioPlaylistCtrl',
  function ($scope, apiService, $stateParams, audioPlayerService) {
    var vm = this;

    vm.playlist = null;
    vm.loading = true;
    vm.audioPlayer = audioPlayerService;

    init();

    function init() {
      apiService.audioPlaylist.get($stateParams.playlistId).then(function (response) {
        vm.playlist = response.data;
        vm.loading = false;
      });
    }

    vm.playTrack = function (track) {
      audioPlayerService.play(track, vm.playlist.tracks, vm.playlist.tracks.indexOf(track));
    };

    vm.playAll = function () {
      if (vm.playlist.tracks && vm.playlist.tracks.length) {
        audioPlayerService.play(vm.playlist.tracks[0], vm.playlist.tracks, 0);
      }
    };

    vm.removeTrack = function (track) {
      alertify.confirm('Remove this track from the playlist?', function (confirmed) {
        if (confirmed) {
          apiService.audioPlaylist.removeTrack(track.entryId).then(function (response) {
            vm.playlist = response.data;
          });
        }
      });
    };

    vm.isCurrentTrack = function (track) {
      return audioPlayerService.state.currentTrack && audioPlayerService.state.currentTrack.id === track.id;
    };

    vm.getTotalDuration = function () {
      if (!vm.playlist || !vm.playlist.tracks) return '';
      var total = vm.playlist.tracks.reduce(function (sum, t) { return sum + (t.duration || 0); }, 0);
      var hours = Math.floor(total / 3600);
      var mins = Math.floor((total % 3600) / 60);
      if (hours > 0) return hours + ' hr ' + mins + ' min';
      return mins + ' min';
    };
  });
