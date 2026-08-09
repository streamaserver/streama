

angular.module('streama').controller('adminMovieCtrl', [
	'$scope', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, apiService, $stateParams, modalService, $state, uploadService) {
    $scope.loading = true;
    $scope.LoadingSimilar = true;
    apiService.movie.get($stateParams.movieId).then(function (response) {
      var data = response.data;
      $scope.movie = data;
      $scope.reportsForMovie();
      $scope.loading = false;
			$scope.highlightOnDashboard = modalService.newReleaseModal.bind(modalService, $scope.movie,'movie');
      if($scope.movie.hasOwnProperty('apiId')){//if the data came from moviedb
        $scope.loadsimilar();
      }
      else{
        $scope.LoadingSimilar = false;
      }
    });

		$scope.reportsForMovie= function () {
      apiService.report.reportsById($stateParams.movieId).then(function (response) {
        $scope.movie.reportCount = response.data.reportCount;
      });
    };


    $scope.loadsimilar= function () {
      apiService.movie.getsimilar($stateParams.movieId).then(function (response) {
        $scope.LoadingSimilar = false;
        $scope.movie.similarMovies = response.data;
      });
    };

    $scope.showDetails = function (media) {
      $scope.media = media;
      modalService.mediaDetailModal({isEditButtonHidden: true,mediaId: media.id, mediaType: media.mediaType, mediaObject: media, isApiMovie: true});
    };


    $scope.openMovieModal = function () {
      modalService.movieModal($scope.movie, function (data) {
        angular.merge($scope.movie, data);
      });
    };

		$scope.delete = function(){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
			alertify.confirm("Are you sure you want to delete this Movie?", function (confirmed) {
				if(confirmed){
					apiService.movie.delete($stateParams.movieId).then(function () {
						$state.go('admin.movies');
					});
				}
			})
		};

		$scope.addToCurrentNotification = function(){
			apiService.notification.addMovieToCurrentNotification($stateParams.movieId).then(function () {
        alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "No"}});
        alertify.confirm('The movie was added to the current notification queue. Would you like to send it?', function (send) {
          if(send){
            apiService.notification.sendCurrentNotifcation();
            alertify.success('Notification sent.');
          }
          else{
            alertify.success('The movie was added to the current notification queue.');
          }
        })
			});
		};


		$scope.deleteMovie = function(movie){
			alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
			alertify.confirm("Are you sure, you want to delete this Movie?", function (confirmed) {
				if(confirmed){
					apiService.movie.delete(movie.id).then(function () {
						$state.go('admin.movies');
						$uibModalInstance.dismiss('cancel');
					});
				}
			})
		};

    $scope.manageFiles = function(movie){
      modalService.fileManagerModal(movie, null, function (data) {
				movie.hasFiles = !!movie.files.length;
			});
    };


		$scope.addSimilarMovieToStreama = function(movie, redirect){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
			alertify.confirm("Do you want to add \""+ movie.title +"\" to the Streama library?", function (confirmed) {
				if(confirmed){

          var apiId = movie.id;
          delete movie.id;
          movie.apiId = apiId;

          apiService.movie.save(movie).then(function (response) {
						if(redirect){
							$state.go('admin.movie', {movieId: response.data.id});
						}
          });
				}
			})
		};

		$scope.uploadStatus = {};

		$scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + $stateParams.movieId, function (data) {
			$scope.uploadStatus.percentage = null;

			if(data.error) return

			$scope.movie.files = $scope.movie.files || [];
			$scope.movie.files.push(data);
		}, function () {});





}]);
