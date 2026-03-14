'use strict';

angular.module('streama').controller('adminArtistCtrl',
  function ($scope, apiService, $stateParams, $state, uploadService) {
    var vm = this;

    vm.artist = null;
    vm.loading = true;
    vm.imageUpload = {};

    init();

    function init() {
      apiService.artist.get($stateParams.artistId).then(function (response) {
        vm.artist = response.data;
        vm.loading = false;
      });
    }

    vm.saveArtist = function () {
      apiService.artist.save(vm.artist).then(function (response) {
        vm.artist = response.data;
        alertify.success('Artist saved.');
      });
    };

    vm.deleteArtist = function () {
      alertify.set({buttonReverse: true, labels: {ok: 'Yes', cancel: 'Cancel'}});
      alertify.confirm('Are you sure you want to delete this artist?', function (confirmed) {
        if (confirmed) {
          apiService.artist.delete(vm.artist.id).then(function () {
            $state.go('admin.artists');
          });
        }
      });
    };

    vm.createAlbum = function () {
      alertify.prompt('Album title:', function (confirmed, title) {
        if (confirmed && title) {
          apiService.album.save({title: title, artistId: vm.artist.id}).then(function (response) {
            $state.go('admin.album', {albumId: response.data.id});
          });
        }
      });
    };

    vm.goToAlbum = function (album) {
      $state.go('admin.album', {albumId: album.id});
    };

    vm.uploadImage = uploadService.doUpload.bind(uploadService, vm.imageUpload, 'file/upload.json', function (data) {
      vm.imageUpload.percentage = null;
      if (data.error) return;
      vm.artist.image = data.id;
      apiService.artist.save(vm.artist).then(function (response) {
        vm.artist = response.data;
      });
    }, function () {});
  });
