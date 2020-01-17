'use strict';

angular.module('streama').controller('modalFileBrowserCtrl', [
	'$scope', '$uibModalInstance', 'Video',
	function ($scope, $uibModalInstance, Video) {
		$scope.loading = true;

      Video.listAllFiles().$promise.then(function (response) {
				var data = response;
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
