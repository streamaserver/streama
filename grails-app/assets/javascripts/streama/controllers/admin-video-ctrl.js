

angular.module('streama').controller('adminVideoCtrl', [
	'$scope', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, apiService, $stateParams, modalService, $state, uploadService) {
    $scope.loading = true;
		$scope.uploadStatus = {};

    $scope.openVideoModal = openVideoModal;
    $scope.manageFiles = manageFiles;
		$scope.delete = doDelete;
    $scope.addSimilarMovieToStreama = addSimilarMovieToStreama;
		$scope.addToCurrentNotification = addToCurrentNotification;

    $scope.upload = initUpload();

		init();

		function init(){
      apiService.genericVideo.get($stateParams.videoId).then(function (response) {
        var data = response.data;
        $scope.video = data;
        $scope.loading = false;
        $scope.highlightOnDashboard = modalService.newReleaseModal.bind(modalService, $scope.video, 'genericVideo');
      });
    }

    function initUpload(){
      uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + $stateParams.movieId, function (data) {
        $scope.uploadStatus.percentage = null;

        if(data.error) return

        $scope.video.files = $scope.video.files || [];
        $scope.video.files.push(data);
      }, function () {})
    }

    function addToCurrentNotification(){
      apiService.notification.addMovieToCurrentNotification($stateParams.movieId).then(function () {
        alertify.success('The movie was added to the current notification queue.');
      });
    }

    function doDelete(){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
      alertify.confirm("Are you sure, you want to delete this Video?", function (confirmed) {
        if(confirmed){
          apiService.genericVideo.delete($stateParams.videoId).then(function () {
            $state.go('admin.videos');
          });
        }
      })
    }

    function openVideoModal() {
      modalService.genericVideoModal($scope.video, function (data) {
        angular.merge($scope.video, data)
      });
    }


    function manageFiles(video){
      modalService.fileManagerModal(video);
    }

    function addSimilarMovieToStreama(movie, redirect){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});

      alertify.confirm("Do you want to add \""+ movie.title +"\" to the Streama library?", function (confirmed) {
        if(confirmed){

          var apiId = movie.id;
          delete movie.id;
          movie.apiId = apiId;

          apiService.movie.save(movie).then(function (data) {
            if(redirect){
              $state.go('admin.movie', {movieId: data.data.id});
            }
          });
        }
      })
    }

}]);
