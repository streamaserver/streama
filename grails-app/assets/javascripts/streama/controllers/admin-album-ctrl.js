'use strict';

angular.module('streama').controller('adminAlbumCtrl',
  function ($scope, apiService, $stateParams, $state, uploadService, modalService) {
    var vm = this;

    vm.album = null;
    vm.artists = [];
    vm.loading = true;
    vm.imageUpload = {};

    init();

    function init() {
      apiService.album.get($stateParams.albumId).then(function (response) {
        vm.album = response.data;
        vm.loading = false;
      });
      apiService.artist.list().then(function (response) {
        vm.artists = response.data.records || [];
      });
    }

    vm.saveAlbum = function () {
      var saveData = angular.copy(vm.album);
      if (vm.album.artist) {
        saveData.artistId = vm.album.artist.id;
      }
      apiService.album.save(saveData).then(function (response) {
        vm.album = response.data;
        alertify.success('Album saved.');
      });
    };

    vm.deleteAlbum = function () {
      alertify.set({buttonReverse: true, labels: {ok: 'Yes', cancel: 'Cancel'}});
      alertify.confirm('Are you sure you want to delete this album?', function (confirmed) {
        if (confirmed) {
          apiService.album.delete(vm.album.id).then(function () {
            $state.go('admin.albums');
          });
        }
      });
    };

    vm.setArtist = function (artist) {
      vm.album.artist = artist;
      vm.album.artistId = artist.id;
      vm.saveAlbum();
    };

    vm.addSong = function () {
      alertify.set({buttonReverse: true, labels: {ok: 'Add', cancel: 'Cancel'}});
      alertify.prompt('Song title:', function (confirmed, title) {
        if (confirmed && title) {
          var trackNumber = (vm.album.songs || []).length + 1;
          apiService.audioTrack.save({
            title: title,
            artistId: vm.album.artist ? vm.album.artist.id : null,
            albumId: vm.album.id,
            trackNumber: trackNumber
          }).then(function () {
            init();
          });
        }
      });
    };

    vm.deleteSong = function (song) {
      alertify.set({buttonReverse: true, labels: {ok: 'Yes', cancel: 'Cancel'}});
      alertify.confirm('Delete song "' + song.title + '"?', function (confirmed) {
        if (confirmed) {
          apiService.audioTrack.delete(song.id).then(function () {
            init();
          });
        }
      });
    };

    vm.refreshAlbum = function () {
      init();
    };

    vm.uploadCover = uploadService.doUpload.bind(uploadService, vm.imageUpload, 'file/upload.json', function (data) {
      vm.imageUpload.percentage = null;
      if (data.error) return;
      vm.album.cover_image = data.id;
      var saveData = angular.copy(vm.album);
      if (vm.album.artist) saveData.artistId = vm.album.artist.id;
      apiService.album.save(saveData).then(function (response) {
        vm.album = response.data;
      });
    }, function () {});
  });
