'use strict';

streamaApp.controller('modalFileCtrl', [
	'$scope', '$modalInstance', 'apiService', 'uploadService', 'video',
	function ($scope, $modalInstance, apiService, uploadService, video) {
	$scope.loading = false;
		

	//$modalInstance.close(data);

	$scope.video = video; 
		
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};


	$scope.uploadStatus = {};
	$scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + video.id, function (data) {
		$scope.uploadStatus.percentage = null;
		$scope.file = data;
		console.log('%c data', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', data);
	});
		
}]);