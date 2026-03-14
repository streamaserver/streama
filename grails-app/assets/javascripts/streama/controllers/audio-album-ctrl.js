'use strict';

angular.module('streama').controller('audioAlbumCtrl',
  function ($scope, apiService, $stateParams, audioPlayerService) {
    var vm = this;

    vm.album = null;
    vm.loading = true;
    vm.audioPlayer = audioPlayerService;

    init();

    function init() {
      apiService.album.get($stateParams.albumId).then(function (response) {
        vm.album = response.data;
        vm.loading = false;
      });
    }

    vm.playSong = function (song) {
      audioPlayerService.play(song, vm.album.songs, vm.album.songs.indexOf(song));
    };

    vm.playAll = function () {
      if (vm.album.songs && vm.album.songs.length) {
        audioPlayerService.play(vm.album.songs[0], vm.album.songs, 0);
      }
    };

    vm.shufflePlay = function () {
      if (vm.album.songs && vm.album.songs.length) {
        audioPlayerService.state.isShuffle = true;
        var randomIndex = Math.floor(Math.random() * vm.album.songs.length);
        audioPlayerService.play(vm.album.songs[randomIndex], vm.album.songs, randomIndex);
      }
    };

    vm.isCurrentTrack = function (song) {
      return audioPlayerService.state.currentTrack && audioPlayerService.state.currentTrack.id === song.id;
    };

    vm.getTotalDuration = function () {
      if (!vm.album || !vm.album.songs) return '';
      var total = vm.album.songs.reduce(function (sum, s) { return sum + (s.duration || 0); }, 0);
      var hours = Math.floor(total / 3600);
      var mins = Math.floor((total % 3600) / 60);
      if (hours > 0) return hours + ' hr ' + mins + ' min';
      return mins + ' min';
    };
  });
