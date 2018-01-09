//= wrapped

angular.module('streama').controller('adminReportsCtrl', [
  'apiService', '$state', '$rootScope', '$filter', function (apiService, $state, $rootScope, $filter) {
    var vm = this;
    var selectedReports = [];

    vm.isResolvedFilter = 'all';
    vm.maxPerPage = 15;
    vm.pagination = {};
    vm.sortAndOrderBy = {
      sort: 'dateCreated',
      order: 'DESC'
    };

    var currentOffset = 0;

    vm.resolveMultiple = resolveMultiple;
    vm.resolve = resolve;
    vm.unresolve = unresolve;
    vm.pageChanged = pageChanged;
    vm.refreshList = refreshList;
    vm.addOrRemoveFromSelection = addOrRemoveFromSelection;

    function pageChanged () {

      currentOffset = vm.maxPerPage*(vm.pagination.currentPage-1);
      loadReports({max: vm.maxPerPage, filter: vm.listFilter, offset: currentOffset, sort: vm.sortAndOrderBy.sort, order: vm.sortAndOrderBy.order});
    }

    function refreshList (isResolved) {
      if (isResolved) {
        vm.isResolvedFilter = isResolved;
        vm.pagination.currentPage = 1;
        currentOffset = 0;
      }
      loadReports({max: vm.maxPerPage, resolved: vm.isResolvedFilter, offset: currentOffset, sort: vm.sortAndOrderBy.sort, order: vm.sortAndOrderBy.order});
    }

    function loadReports (params) {
      vm.reports = [];
      vm.reportsCount = 0;
      apiService.report.list(params)
        .then(function (response) {
          vm.reports = response.data.reports;
          vm.reportsCount = response.data.count;
        }, function () {
          alertify.error('An error occurred.');
        });
    }

    function addOrRemoveFromSelection($event, report) {
      if($event.target.checked && report.resolved === false) {
        selectedReports.push(report.id);
      } else {
        _.remove(selectedReports, function(id) {
          return id === report.id;
        });
      }
    }

    function resolve(oldReport) {
      apiService.report.resolve(oldReport.id).then
      (function (response) {
        var newReport = response.data;
        oldReport.resolved = newReport.resolved;
        oldReport.lastUpdated = newReport.lastUpdated;
        alertify.success('Selected report has been resolved.');
      }, function () {
        alertify.error('Report could not be resolved.');
      });
      }

    function unresolve(oldReport) {
      apiService.report.unresolve(oldReport.id).then
      (function (response) {
        var newReport = response.data;
        oldReport.resolved = newReport.resolved;
        oldReport.lastUpdated = newReport.lastUpdated;
        alertify.success('Selected report has been unresolved.');
      }, function () {
        alertify.error('Report could not be unresolved.');
      });
    }

    function resolveMultiple() {
      if(selectedReports.length > 0) {
        var confirmText = "This will resolve all selected reports. Do you want to proceed?";
        alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
        alertify.confirm(confirmText, function (confirmed) {
          if(confirmed){
            apiService.report.resolveMultiple(selectedReports).then
            (function (response) {
              var newReports = response.data;
              _.forEach(newReports, function (newReport) {
                  var vmReport = _.find(vm.reports, {id: newReport.id});
                  _.set(vmReport, 'resolved', true);
              });
              selectedReports = [];
              alertify.success('Selected reports have been resolved.');
            }, function () {
              alertify.error('Reports could not be resolved.');
            });
          }
        });
      } else {
        alertify.error('No reports selected.');
      }
    }
    refreshList();
  }]);


