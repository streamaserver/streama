'use strict';

streamaApp.controller('modalFileBrowserCtrl', [
	'$scope', '$uibModalInstance', 'apiService',
	function ($scope, $uibModalInstance, apiService) {
		$scope.loading = true;

		apiService.video.listAllFiles()
			.success(function (data) {
				$scope.loading = false;
				$scope.files = data;
			})
			.error(function () {
				alertify.error('Failed to load the list of files.');
			});

		$scope.chooseFile = function (file) {
			$uibModalInstance.close(file);
		};


		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
}]);
