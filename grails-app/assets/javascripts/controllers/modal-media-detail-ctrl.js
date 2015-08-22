'use strict';

streamaApp.controller('modalMediaDetailCtrl', [
	'$scope', '$modalInstance', '$rootScope', 'media', '$state',
	function ($scope, $modalInstance, $rootScope, media, $state) {
	$scope.media = media;
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.editMedia = function (media) {
		if($rootScope.currentUser.isContentManager){
			if(media.title){
				$state.go('admin.movie', {movieId: media.id});
			}
			else if(media.name){
				$state.go('admin.show', {showId: media.id});
			}
			$modalInstance.dismiss('cancel');
		}
	};
}]);