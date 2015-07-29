'use strict';

streamaApp.controller('modalFileBrowserCtrl', [
	'$scope', '$modalInstance', 'apiService',
	function ($scope, $modalInstance, apiService) {
		$scope.loading = true;

		apiService.video.listAllFiles()
			.success(function (data) {
				$scope.loading = false;
				$scope.files = data;
			})
			.error(function () {
				alertify.error('An error occurred.');
			});

		$scope.chooseFile = function (file) {
			$modalInstance.close(file);
		};


		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
}]);