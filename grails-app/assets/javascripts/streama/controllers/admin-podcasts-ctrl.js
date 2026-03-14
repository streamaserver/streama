'use strict';

angular.module('streama').controller('adminPodcastsCtrl',
  function ($scope, apiService, $state) {
    var vm = this;

    vm.podcasts = [];
    vm.loading = true;

    init();

    function init() {
      apiService.podcast.list().then(function (response) {
        vm.podcasts = response.data.records || [];
        vm.loading = false;
      });
    }

    vm.createPodcast = function () {
      alertify.set({buttonReverse: true, labels: {ok: 'Create', cancel: 'Cancel'}});
      alertify.prompt('Enter podcast title:', function (confirmed, title) {
        if (confirmed && title) {
          apiService.podcast.save({title: title}).then(function (response) {
            $state.go('admin.podcast', {podcastId: response.data.id});
          });
        }
      });
    };

    vm.goToPodcast = function (podcast) {
      $state.go('admin.podcast', {podcastId: podcast.id});
    };
  });
