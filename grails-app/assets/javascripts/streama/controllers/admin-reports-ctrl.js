//= wrapped

angular.module('streama').controller('adminReportsCtrl', [
  'apiService', '$state', '$rootScope', function (apiService, $state, $rootScope) {
    var vm = this;
    vm.selectedReports = [];
    vm.resolveReports = resolveReports;
    vm.addOrRemoveFromSelection = addOrRemoveFromSelection;
    apiService.video.getErrorReports().then(function (reports) {
      vm.reports = reports.data;
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
      if(vm.selectedReports.length > 0) {
        var confirmText = "This will resolve all selected reports. Do you want to proceed?";
        alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
        alertify.confirm(confirmText, function (confirmed) {
          if(confirmed){
            apiService.video.resolveReports(vm.selectedReports).then
            (function (response) {
              var ids = response.data;
              _.forEach(ids, function (id) {
                _.remove(vm.reports, function(report) {
                  return report.id === id;
                });
              });
              vm.selectedReports = [];
              alertify.success('Selected reports have been resolved.');
            }, function () {
              alertify.error('Reports could not be resolved.');
            });
          }
        });
      }
    }
  }]);


