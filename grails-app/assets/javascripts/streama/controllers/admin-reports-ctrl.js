//= wrapped

angular.module('streama').controller('adminReportsCtrl', [
  'apiService', '$state', '$rootScope', function (apiService, $state, $rootScope) {
    var vm = this;
    vm.selectedReports = [];
    vm.resolveReports = resolveReports;
    vm.addOrRemoveFromSelection = addOrRemoveFromSelection;
    apiService.video.getErrorReports().then(function (reports) {
      vm.reports = reports.data;
      vm.test = 'test';
      console.log(vm.reports);
    });

    function addOrRemoveFromSelection($event, report) {
      if($event.target.checked) {
        vm.selectedReports.push(report.id);
      } else {
        _.remove(vm.selectedReports, function(id) {
          return id === report.id;
        });
      }
    }
    function resolveReports() {
      if(vm.selectedFiles.length > 0) {
        var confirmText = "This will delete all selected Files. Do you want to proceed?";
        alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
        alertify.confirm(confirmText, function (confirmed) {
          if(confirmed){
            apiService.video.resolveReports(vm.selectedFiles).then(function (response) {
              _.forEach(response.successes, function (id) {
                // TODO investigate why {id: id} doesn't work
                _.remove($scope.files, function(file) {
                  return file.id === id;
                });
              });
              selectedFiles = [];
              alertify.success(response.successes.length + ' of ' + $scope.selectedFiles.length + ' files deleted.');
            }).error(function (response) {
              alertify.error(response.successes.length + ' of ' + $scope.selectedFiles.length + ' files could be deleted. (this could be due to them being associated with the file-browser or an externalLink)');
            });
          }
        });
      }
    };
  }]);


