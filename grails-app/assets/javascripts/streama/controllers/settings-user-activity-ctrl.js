angular.module('streama').controller('settingsUserActivityCtrl', ['$scope', 'modalService', '$rootScope',
  function ($scope, modalService, $rootScope, User) {
    var MAX_PER_PAGE = 10;
    var vm = this;
    vm.currentOffset = 0;
    vm.loading = true;
    vm.maxPerPage = MAX_PER_PAGE;
    vm.userIdFilter = null;
    vm.currentType = 'login';
    vm.currentSort = 'dateCreated';
    vm.sortOptions = [
      {key: 'lastUpdated', label: 'Last Updated'},
      {key: 'dateCreated', label: 'Date Created'},
      {key: 'ipAddress', label: 'IP Address'},
      {key: 'operatingSystem', label: 'Operating System'},
      {key: 'device', label: 'Device'},
      {key: 'browser', label: 'Browser'}
    ];
    vm.changeType = changeType;
    vm.filter = {
      user: null
    };

    vm.onUserSelect = onUserSelect;
    vm.onSortChange = onSortChange;

    vm.pagination = {
      currentPage: 1,
      onChange: function () {
        loadList();
      }
    };

    init();

    function init() {
      loadList();

      User.list().$promise.then(function (data) {
        vm.users = data.data;
        vm.loading = false;
      });
    }

    function changeType(type) {
      vm.currentType = type;
      loadList();
    }

    function onUserSelect() {
      loadList();
    }

    function onSortChange() {
      loadList();
    }

    function loadList() {
      User.userActivity({
        offset: getOffset(),
        max: MAX_PER_PAGE,
        userId: _.get(vm.filter, 'user.id'),
        type: vm.currentType,
        sort: vm.currentSort
      }).$promise.then(function (data) {
        vm.userActivity = data.data;
      });
    }

    function getOffset() {
      return vm.pagination.currentPage === 1 ? 0 : (vm.pagination.currentPage - 1) * MAX_PER_PAGE;
    }


  }]);
