

angular.module('streama').controller('adminVideoCtrl', [
	'$scope', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, apiService, $stateParams, modalService, $state, uploadService) {
    $scope.loading = true;

		apiService.genericVideo.get($stateParams.videoId).success(function (data) {
			$scope.video = data;
      $scope.loading = false;
		});

    $scope.openVideoModal = function () {
      modalService.genericVideoModal($scope.video, function (data) {
        angular.merge($scope.video, data)
      });
    };

		$scope.delete = function(){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
			alertify.confirm("Are you sure, you want to delete this Video?", function (confirmed) {
				if(confirmed){
					apiService.genericVideo.delete($stateParams.videoId).success(function () {
						$state.go('admin.videos');
					});
				}
			})
		};

		$scope.addToCurrentNotification = function(){
			apiService.notification.addMovieToCurrentNotification($stateParams.movieId).success(function () {
				alertify.success('The movie was added to the current notification queue.');
			});
		};

    $scope.manageFiles = function(video){
      modalService.fileManagerModal(video);
    };


		$scope.addSimilarMovieToStreama = function(movie, redirect){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});

			alertify.confirm("Do you want to add \""+ movie.title +"\" to the Streama library?", function (confirmed) {
				if(confirmed){

          var apiId = movie.id;
          delete movie.id;
          movie.apiId = apiId;

          apiService.movie.save(movie).success(function (data) {
						if(redirect){
							$state.go('admin.movie', {movieId: data.id});
						}
          });
				}
			})
		};

		$scope.uploadStatus = {};

		$scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + $stateParams.movieId, function (data) {
			$scope.uploadStatus.percentage = null;
			$scope.video.files = $scope.video.files || [];
			$scope.video.files.push(data);
		});





}]);
