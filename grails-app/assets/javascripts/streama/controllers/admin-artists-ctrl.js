'use strict';

angular.module('streama').controller('adminArtistsCtrl',
  function ($scope, apiService, $state) {
    var vm = this;

    vm.artists = [];
    vm.loading = true;

    init();

    function init() {
      apiService.artist.list().then(function (response) {
        vm.artists = response.data.records || [];
        vm.loading = false;
      });
    }

    vm.createArtist = function () {
      alertify.set({buttonReverse: true, labels: {ok: 'Create', cancel: 'Cancel'}});
      alertify.prompt('Enter artist name:', function (confirmed, name) {
        if (confirmed && name) {
          apiService.artist.save({name: name}).then(function (response) {
            $state.go('admin.artist', {artistId: response.data.id});
          });
        }
      });
    };

    vm.goToArtist = function (artist) {
      $state.go('admin.artist', {artistId: artist.id});
    };
  });
