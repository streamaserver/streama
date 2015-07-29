

streamaApp.controller('adminMovieCtrl', [
	'$scope', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, apiService, $stateParams, modalService, $state, uploadService) {

		apiService.movie.get($stateParams.movieId).success(function (data) {
			$scope.movie = data;
		});
		
		

		$scope.delete = function(){
			alertify.confirm("Are you sure, you want to delete this Movie?", function (confirmed) {
				if(confirmed){
					apiService.movie.delete($stateParams.movieId).success(function () {
						$state.go('admin.movies');
					});
				}
			})
		};

		$scope.uploadStatus = {};
		
		$scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + $stateParams.movieId, function (data) {
			$scope.uploadStatus.percentage = null;
			$scope.movie.files = $scope.movie.files || [];
			$scope.movie.files.push(data);
		});

}]);