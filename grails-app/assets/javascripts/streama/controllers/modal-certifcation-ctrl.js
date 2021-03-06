'use strict';

angular.module('streama').controller('modalCertificationCtrl', [
	'$scope', '$uibModalInstance', 'entity', function ($scope, $uibModalInstance, entity) {
	$scope.loading = false;

	$scope.entity = angular.extend({}, entity) || {};
	$scope.cancel = cancel;
	$scope.saveEntity = saveEntity;

	init();

	function init() {
	}

	function saveEntity() {
    $uibModalInstance.close($scope.entity);
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}]);
