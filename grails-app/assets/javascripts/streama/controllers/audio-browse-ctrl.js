'use strict';

angular.module('streama').controller('audioBrowseCtrl',
  function ($scope, apiService, $state, audioPlayerService) {
    var vm = this;

    vm.artists = [];
    vm.albums = [];
    vm.podcasts = [];
    vm.playlists = [];
    vm.recentSongs = [];
    vm.loading = true;
    vm.searchQuery = '';
    vm.searchResults = null;
    vm.audioPlayer = audioPlayerService;
    vm.activeFilter = 'all';

    init();

    function init() {
      apiService.audio.dash().then(function (response) {
        var data = response.data;
        vm.artists = data.artists || [];
        vm.albums = data.albums || [];
        vm.podcasts = data.podcasts || [];
        vm.playlists = data.playlists || [];
        vm.recentSongs = data.recentSongs || [];
        vm.loading = false;
      });
    }

    vm.setFilter = function (filter) {
      vm.activeFilter = filter;
    };

    vm.search = function () {
      if (!vm.searchQuery || vm.searchQuery.length < 2) {
        vm.searchResults = null;
        return;
      }
      apiService.audio.search(vm.searchQuery).then(function (response) {
        vm.searchResults = response.data;
      });
    };

    vm.clearSearch = function () {
      vm.searchQuery = '';
      vm.searchResults = null;
    };

    vm.goToArtist = function (artist) {
      $state.go('audioArtist', {artistId: artist.id});
    };

    vm.goToAlbum = function (album) {
      $state.go('audioAlbum', {albumId: album.id});
    };

    vm.goToPodcast = function (podcast) {
      $state.go('audioPodcast', {podcastId: podcast.id});
    };

    vm.goToPlaylist = function (playlist) {
      $state.go('audioPlaylist', {playlistId: playlist.id});
    };

    vm.playSong = function (song, songList) {
      audioPlayerService.play(song, songList || vm.recentSongs, (songList || vm.recentSongs).indexOf(song));
    };

    vm.createPlaylist = function () {
      alertify.prompt('Enter playlist name:', function (confirmed, name) {
        if (confirmed && name) {
          apiService.audioPlaylist.save({title: name}).then(function (response) {
            vm.playlists.unshift(response.data);
          });
        }
      });
    };
  });
