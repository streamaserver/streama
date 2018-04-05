

angular.module('streama').controller('settingsUserActivityCtrl', ['$scope', 'apiService', 'modalService', '$rootScope',
  function ($scope, apiService, modalService, $rootScope) {
  var vm = this;
  vm.loading = true;

	apiService.userActivity.list().success(function (data) {
    vm.userActivity = data;
	});

	apiService.user.list().success(function (data) {
    vm.users = data;
    vm.loading = false;
	});

}]);
