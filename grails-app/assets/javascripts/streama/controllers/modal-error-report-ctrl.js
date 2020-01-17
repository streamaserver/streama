//= wrapped

angular.module('streama').controller('modalErrorReportCtrl', [
  '$state', '$uibModalInstance', 'errorCode', 'videoData', '$rootScope', 'Report',
  function ($state, $uibModalInstance, errorCode, videoData, $rootScope, Report) {
    var vm = this;
    vm.close = close;
    vm.errorCode = errorCode;
    function close(data) {
      if (data === 'withReport') {
          Report.save({},{videoId: videoData.id, errorCode: errorCode}).$promise.then(function () {
              closeModalAndRedirect();
              alertify.success('Report sent successfully.');
          }, function (error) {
            closeModalAndRedirect();
            alertify.error(error.data);
          });
      } else {
        closeModalAndRedirect();
      }
    }

    function closeModalAndRedirect() {
      if ($rootScope.currentUser.isAdmin || $rootScope.currentUser.isContentManager) {
        if (videoData.show) {
          $state.go('admin.show', {showId: videoData.show.id});
        } else {
          $state.go('admin.movie', {movieId: videoData.id});
        }
        $uibModalInstance.close();
      } else {
        $state.go('dash');
        $uibModalInstance.close();
      }
    }
  }]);


