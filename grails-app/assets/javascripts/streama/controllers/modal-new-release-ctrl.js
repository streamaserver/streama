'use strict';

angular.module('streama').controller('modalNewReleaseCtrl', [
  '$scope', '$uibModalInstance', 'uploadService', 'media', 'type', 'episodes', 'Notification',
  function ($scope, $uibModalInstance, uploadService, media, type, episodes, Notification) {
    $scope.loading = false;
    $scope.type = type;
    $scope.media = media;
    $scope.episodes = episodes;
    $scope.newRelease = {
      mediaId: media.id,
      mediaType: type
    };


    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


    $scope.save = function (newRelease) {
      Notification.highlightOnDashboard({}, newRelease).$promise
        .then(function () {
          alertify.success('Highlight complete.');
          $uibModalInstance.close();
        })
        .error(function (err, status) {
          console.log('%c error', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          alertify.error(err.message);
        });
    };
  }]);
