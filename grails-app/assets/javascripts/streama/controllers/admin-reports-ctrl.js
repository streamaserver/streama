//= wrapped

angular.module('streama').controller('adminReportsCtrl', [
  'apiService', '$state', '$rootScope', '$filter', '$filter', function (apiService, $state, $rootScope, $filter) {
    var vm = this;
    vm.selectedReports = [];
    vm.showReports = {};
    vm.resolveMultipleReports = resolveMultipleReports;
    vm.resolveReport = resolveReport;
    vm.unresolveReport = unresolveReport;
    vm.addOrRemoveFromSelection = addOrRemoveFromSelection;
    vm.sorting = 'dateCreated';
    apiService.video.getErrorReports().then(function (reports) {
      vm.reports = reports.data;
    });

    function addOrRemoveFromSelection($event, report) {
      if($event.target.checked && report.resolved === false) {
        vm.selectedReports.push(report.id);
      } else {
        _.remove(vm.selectedReports, function(id) {
          return id === report.id;
        });
      }
    }

    function resolveReport(oldReport) {
      var confirmText = "This will resolve the selected report. Do you want to proceed?";
      alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
      alertify.confirm(confirmText, function (confirmed) {
        if (confirmed) {
          apiService.video.resolveReport(oldReport.id).then
          (function (response) {
              var newReport = response.data;
              oldReport.resolved = newReport.resolved;
            alertify.success('Selected report has been resolved.');
          }, function () {
            alertify.error('Report could not be resolved.');
          });
        }
      });
    }

    function unresolveReport(oldReport) {
      var confirmText = "This will unresolve the selected report. Do you want to proceed?";
      alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
      alertify.confirm(confirmText, function (confirmed) {
        if (confirmed) {
          apiService.video.unresolveReport(oldReport.id).then
          (function (response) {
              var newReport = response.data;
              oldReport.resolved = newReport.resolved;
            alertify.success('Selected report has been unresolved.');
          }, function () {
            alertify.error('Report could not be unresolved.');
          });
        }
      });
    }

    function resolveMultipleReports() {
      if(vm.selectedReports.length > 0) {
        var confirmText = "This will resolve all selected reports. Do you want to proceed?";
        alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
        alertify.confirm(confirmText, function (confirmed) {
          if(confirmed){
            apiService.video.resolveMultipleReports(vm.selectedReports).then
            (function (response) {
              var newReports = response.data;
              _.forEach(newReports, function (newReport) {
                _.forEach(vm.reports, function (oldReport) {
                  if (newReport.id === oldReport.id) {
                    oldReport.resolved = newReport.resolved;
                  }
                });
              });
              vm.selectedReports = [];
              alertify.success('Selected reports have been resolved.');
            }, function () {
              alertify.error('Reports could not be resolved.');
            });
          }
        });
      } else alertify.error('No reports selected.');
    }
  }]);


