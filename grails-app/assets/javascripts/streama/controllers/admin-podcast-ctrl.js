'use strict';

angular.module('streama').controller('adminPodcastCtrl',
  function ($scope, apiService, $stateParams, $state, uploadService, modalService) {
    var vm = this;

    vm.podcast = null;
    vm.loading = true;
    vm.imageUpload = {};

    init();

    function init() {
      apiService.podcast.get($stateParams.podcastId).then(function (response) {
        vm.podcast = response.data;
        vm.loading = false;
      });
    }

    vm.savePodcast = function () {
      apiService.podcast.save(vm.podcast).then(function (response) {
        vm.podcast = response.data;
        alertify.success('Podcast saved.');
      });
    };

    vm.deletePodcast = function () {
      alertify.set({buttonReverse: true, labels: {ok: 'Yes', cancel: 'Cancel'}});
      alertify.confirm('Are you sure you want to delete this podcast?', function (confirmed) {
        if (confirmed) {
          apiService.podcast.delete(vm.podcast.id).then(function () {
            $state.go('admin.podcasts');
          });
        }
      });
    };

    vm.addEpisode = function () {
      alertify.set({buttonReverse: true, labels: {ok: 'Add', cancel: 'Cancel'}});
      alertify.prompt('Episode title:', function (confirmed, title) {
        if (confirmed && title) {
          var episodeNumber = (vm.podcast.episodes || []).length + 1;
          apiService.audioTrack.save({
            title: title,
            artist: vm.podcast.host,
            podcastId: vm.podcast.id,
            trackNumber: episodeNumber
          }).then(function () {
            init();
          });
        }
      });
    };

    vm.deleteEpisode = function (episode) {
      alertify.set({buttonReverse: true, labels: {ok: 'Yes', cancel: 'Cancel'}});
      alertify.confirm('Delete episode "' + episode.title + '"?', function (confirmed) {
        if (confirmed) {
          apiService.audioTrack.delete(episode.id).then(function () {
            init();
          });
        }
      });
    };

    vm.refreshPodcast = function () {
      init();
    };

    vm.uploadCover = uploadService.doUpload.bind(uploadService, vm.imageUpload, 'file/upload.json', function (data) {
      vm.imageUpload.percentage = null;
      if (data.error) return;
      vm.podcast.cover_image = data.id;
      apiService.podcast.save(vm.podcast).then(function (response) {
        vm.podcast = response.data;
      });
    }, function () {});
  });
