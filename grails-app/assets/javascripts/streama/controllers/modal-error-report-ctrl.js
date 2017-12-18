//= wrapped

angular.module('streama').controller('modalErrorReportCtrl', [
  'apiService', '$state', '$uibModalInstance', 'errorCode', 'videoData', '$rootScope', function (apiService, $state, $uibModalInstance, errorCode, videoData, $rootScope) {
    var vm = this;
    vm.close = close;
    vm.errorCode = errorCode;
    function close(data) {
      if (data === 'withReport') {
          apiService.video.sendErrorReport(videoData.id, errorCode).then(function () {
              closeModalAndRedirect();
              alertify.success('Report sent successfully.');
          }, function (error) {
            console.log(error);
            closeModalAndRedirect();
            alertify.error(error.data);
          });
      } else {
        closeModalAndRedirect();
      }
    }

    function closeModalAndRedirect() {
      if ($rootScope.currentUser.isAdmin) {
        if (videoData.show) {
          $state.go('admin.show', {showId: videoData.show.id});
        } else {
          $state.go('admin.movie', {movieId: videoData.id});
        }
        $uibModalInstance.close();
      }
    }
  }]);


