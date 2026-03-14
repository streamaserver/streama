'use strict';

angular.module('streama').controller('adminAlbumsCtrl',
  function ($scope, apiService, $state) {
    var vm = this;

    vm.albums = [];
    vm.loading = true;

    init();

    function init() {
      apiService.album.list().then(function (response) {
        vm.albums = response.data.records || [];
        vm.loading = false;
      });
    }

    vm.createAlbum = function () {
      alertify.set({buttonReverse: true, labels: {ok: 'Create', cancel: 'Cancel'}});
      alertify.prompt('Enter album title:', function (confirmed, title) {
        if (confirmed && title) {
          alertify.prompt('Enter artist name:', function (confirmed2, artist) {
            if (confirmed2 && artist) {
              apiService.album.save({title: title, artist: artist}).then(function (response) {
                $state.go('admin.album', {albumId: response.data.id});
              });
            }
          });
        }
      });
    };

    vm.goToAlbum = function (album) {
      $state.go('admin.album', {albumId: album.id});
    };
  });
