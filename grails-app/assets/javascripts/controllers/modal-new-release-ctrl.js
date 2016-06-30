'use strict';

streamaApp.controller('modalNewReleaseCtrl', [
  '$scope', '$uibModalInstance', 'apiService', 'uploadService', 'media', 'type', 'episodes',
  function ($scope, $uibModalInstance, apiService, uploadService, media, type, episodes) {
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
      apiService.notification.highlightOnDashboard(newRelease)
        .success(function () {
          alertify.success('Highlight complete.');
          $uibModalInstance.close();
        })
        .error(function (err, status) {
          console.log('%c error', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
          alertify.error(err.message);
        });
    };
  }]);
