'use strict';

angular.module('streama').controller('homeCtrl',
  function ($scope, $state, localStorageService) {
    var vm = this;

    vm.hoverSide = null;

    vm.setHover = function (side) {
      vm.hoverSide = side;
    };

    vm.clearHover = function () {
      vm.hoverSide = null;
    };

    vm.goToVideo = function () {
      localStorageService.set('lastMode', 'video');
      $state.go('dash');
    };

    vm.goToAudio = function () {
      localStorageService.set('lastMode', 'audio');
      $state.go('audio');
    };

    // If user has a preference, could auto-redirect (optional)
    // var lastMode = localStorageService.get('lastMode');
    // if (lastMode === 'video') { $state.go('dash'); return; }
    // if (lastMode === 'audio') { $state.go('audio'); return; }
  });
