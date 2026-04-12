'use strict';

angular.module('streama').controller('modalExtractEmbeddedSubtitlesCtrl', [
  '$scope', '$uibModalInstance', 'apiService', 'video',
  function ($scope, $uibModalInstance, apiService, video) {
    $scope.video = video;
    $scope.streams = [];
    $scope.loading = true;
    $scope.loadError = null;
    $scope.extracting = false;

    apiService.subtitle.probeEmbedded(video.id).then(function (response) {
      var data = response.data || {};
      $scope.streams = (data.streams || []).map(function (s) {
        s._selected = !!s.extractable;
        return s;
      });
      $scope.loading = false;
    }, function (response) {
      $scope.loading = false;
      $scope.loadError = (response && response.data && response.data.message) ||
        'Failed to probe video file.';
    });

    $scope.selectAll = function (value) {
      $scope.streams.forEach(function (s) {
        if (!value) {
          s._selected = false;
        } else if (s.extractable) {
          s._selected = true;
        }
      });
    };

    $scope.selectedCount = function () {
      return $scope.streams.filter(function (s) { return s._selected; }).length;
    };

    $scope.extract = function () {
      var indexes = $scope.streams
        .filter(function (s) { return s._selected; })
        .map(function (s) { return s.index; });
      if (indexes.length === 0) {
        return;
      }
      $scope.extracting = true;
      apiService.subtitle.extractEmbedded(video.id, indexes).then(function (response) {
        var data = response.data || {};
        if (data.extracted > 0) {
          alertify.success('Extracted ' + data.extracted + ' subtitle track(s).');
        } else {
          alertify.warning(data.message || 'No subtitles were extracted.');
        }
        $uibModalInstance.close({extracted: data.extracted || 0});
      }, function (response) {
        $scope.extracting = false;
        var msg = (response && response.data && response.data.message) ||
          'Failed to extract subtitles.';
        alertify.error(msg);
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
]);
