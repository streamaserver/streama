angular.module('streama').controller('settingsUserActivityCtrl', ['$scope', 'apiService', 'modalService', '$rootScope',
  function ($scope, apiService, modalService, $rootScope) {
    var MAX_PER_PAGE = 10;
    var vm = this;
    vm.currentOffset = 0;
    vm.loading = true;
    vm.maxPerPage = MAX_PER_PAGE;
    vm.userIdFilter = null;
    vm.filter = {
      user: null
    };

    vm.onUserSelect = onUserSelect;

    vm.pagination = {
      currentPage: 1,
      onChange: function () {
        loadList();
      }
    };

    init();

    function init() {
      loadList();

      apiService.user.list().success(function (data) {
        vm.users = data;
        vm.loading = false;
      });
    }

    function onUserSelect() {
      loadList();
    }

    function loadList() {
      apiService.userActivity.list({offset: getOffset(), max: MAX_PER_PAGE, userId: _.get(vm.filter, 'user.id')}).success(function (data) {
        vm.userActivity = data;
      });
    }

    function getOffset() {
      return vm.pagination.currentPage === 1 ? 0 : (vm.pagination.currentPage - 1) * MAX_PER_PAGE;
    }


  }]);
