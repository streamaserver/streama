'use strict';

angular.module('streama').controller('adminPlaylistsCtrl',
  function ($scope, apiService, $state) {
    var vm = this;

    vm.playlists = [];
    vm.loading = true;

    init();

    function init() {
      apiService.audioPlaylist.list().then(function (response) {
        vm.playlists = response.data || [];
        vm.loading = false;
      });
    }

    vm.createGlobalPlaylist = function () {
      alertify.set({buttonReverse: true, labels: {ok: 'Create', cancel: 'Cancel'}});
      alertify.prompt('Enter playlist name:', function (confirmed, name) {
        if (confirmed && name) {
          apiService.audioPlaylist.save({title: name, isGlobal: true}).then(function (response) {
            init();
            alertify.success('Global playlist created.');
          });
        }
      });
    };

    vm.deletePlaylist = function (playlist) {
      alertify.set({buttonReverse: true, labels: {ok: 'Yes', cancel: 'Cancel'}});
      alertify.confirm('Delete playlist "' + playlist.title + '"?', function (confirmed) {
        if (confirmed) {
          apiService.audioPlaylist.delete(playlist.id).then(function () {
            init();
          });
        }
      });
    };

    vm.goToPlaylist = function (playlist) {
      $state.go('audioPlaylist', {playlistId: playlist.id});
    };
  });
