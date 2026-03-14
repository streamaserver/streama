'use strict';

angular.module('streama').controller('audioArtistCtrl',
  function ($scope, apiService, $stateParams, $state, audioPlayerService) {
    var vm = this;

    vm.artist = null;
    vm.loading = true;
    vm.audioPlayer = audioPlayerService;

    init();

    function init() {
      apiService.artist.get($stateParams.artistId).then(function (response) {
        vm.artist = response.data;
        vm.loading = false;
      });
    }

    vm.goToAlbum = function (album) {
      $state.go('audioAlbum', {albumId: album.id});
    };

    vm.playAlbum = function (album) {
      apiService.album.get(album.id).then(function (response) {
        var data = response.data;
        if (data.songs && data.songs.length) {
          audioPlayerService.play(data.songs[0], data.songs, 0);
        }
      });
    };
  });
