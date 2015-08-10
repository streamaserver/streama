

streamaApp.controller('adminMovieCtrl', [
	'$scope', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, apiService, $stateParams, modalService, $state, uploadService) {
    $scope.loading = true;

		apiService.movie.get($stateParams.movieId).success(function (data) {
			$scope.movie = data;
      $scope.loading = false;
		});

    $scope.openMovieModal = function () {
      modalService.movieModal($scope.movie, function (data) {
        angular.merge($scope.movie, data)
      });
    };

		$scope.delete = function(){
			alertify.confirm("Are you sure, you want to delete this Movie?", function (confirmed) {
				if(confirmed){
					apiService.movie.delete($stateParams.movieId).success(function () {
						$state.go('admin.movies');
					});
				}
			})
		};



    $scope.manageFiles = function(movie){
      modalService.fileManagerModal(movie);
    };


		$scope.addSimilarMovieToStreama = function(movie){
      alertify.set({
        buttonReverse: true,
        labels: {
          ok     : "Yes",
          cancel : "Cancel"
        } });

			alertify.confirm("Do you want to add \""+ movie.title +"\" to the Streama library?", function (confirmed) {
				if(confirmed){

          var apiId = movie.id;
          delete movie.id;
          movie.apiId = apiId;

          apiService.movie.save(movie).success(function (data) {
            $state.go('admin.movie', {movieId: data.id});
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
