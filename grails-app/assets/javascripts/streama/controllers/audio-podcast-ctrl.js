'use strict';

angular.module('streama').controller('audioPodcastCtrl',
  function ($scope, apiService, $stateParams, audioPlayerService) {
    var vm = this;

    vm.podcast = null;
    vm.loading = true;
    vm.audioPlayer = audioPlayerService;

    init();

    function init() {
      apiService.podcast.get($stateParams.podcastId).then(function (response) {
        vm.podcast = response.data;
        vm.loading = false;
      });
    }

    vm.playEpisode = function (episode) {
      audioPlayerService.play(episode, vm.podcast.episodes, vm.podcast.episodes.indexOf(episode));
    };

    vm.playLatest = function () {
      if (vm.podcast.episodes && vm.podcast.episodes.length) {
        audioPlayerService.play(vm.podcast.episodes[0], vm.podcast.episodes, 0);
      }
    };

    vm.isCurrentTrack = function (track) {
      return audioPlayerService.state.currentTrack && audioPlayerService.state.currentTrack.id === track.id;
    };
  });
