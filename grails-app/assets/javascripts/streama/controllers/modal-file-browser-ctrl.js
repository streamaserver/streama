'use strict';

angular.module('streama').controller('modalFileBrowserCtrl', [
	'$scope', '$uibModalInstance', 'apiService',
	function ($scope, $uibModalInstance, apiService) {
		$scope.loading = true;

		apiService.video.listAllFiles().then(function (response) {
				var data = response.data;
				$scope.loading = false;
				$scope.files = data;
			}, function () {
				alertify.error('Failed to load the list of files.');
			});

		$scope.chooseFile = function (file) {
			$uibModalInstance.close(file);
		};


		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
}]);
