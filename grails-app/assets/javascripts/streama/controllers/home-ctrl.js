'use strict';

angular.module('streama').controller('homeCtrl',
  function ($scope, $state, $rootScope, localStorageService) {
    var vm = this;

    vm.hoverSide = null;

    // If music is disabled, skip split screen and go straight to dash
    var musicSetting = $rootScope.getSetting('music_enabled');
    if (!musicSetting || !musicSetting.parsedValue) {
      $state.go('dash');
      return;
    }

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
  });
