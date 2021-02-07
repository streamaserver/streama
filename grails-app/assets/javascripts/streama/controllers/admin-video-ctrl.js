

angular.module('streama').controller('adminVideoCtrl', [
	'$scope', '$stateParams', 'modalService', '$state', 'uploadService', 'GenericVideo', 'Video', 'Movie', 'Notification',
	function ($scope, $stateParams, modalService, $state, uploadService, GenericVideo, Video, Movie, Notification) {
    $scope.loading = true;

		GenericVideo.get({id: $stateParams.videoId}).$promise.then(function (response) {
			var data = response;
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
					GenericVideo.delete({}, {id: $stateParams.videoId}).$promise.then(function () {
						$state.go('admin.videos');
					});
				}
			})
		};

		$scope.addToCurrentNotification = function(){
			Notification.addMovieToCurrentNotification({id: $stateParams.movieId}).$promise.then(function () {
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

          Movie.save({}, movie).$promise.then(function (data) {
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

			if(data.error) return

			$scope.video.files = $scope.video.files || [];
			$scope.video.files.push(data);
		}, function () {});

}]);
