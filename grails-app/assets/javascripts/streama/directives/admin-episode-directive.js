'use strict';

angular.module('streama').directive('adminEpisode', [
	'uploadService', 'modalService', 'apiService', function (uploadService, modalService, apiService) {
	return {
		restrict: 'AE',
		templateUrl: '/streama/directive--admin-episode.htm',
		scope: {
			episode: '='
		},
		link: function ($scope, $elem, $attrs) {
			$scope.uploadStatus = {};

      $scope.reportsForEpisode= function () {
        apiService.report.reportsById($scope.episode.id).then(function (response) {
          $scope.episode.reportCount = response.data.reportCount;
        });
      }();


      $scope.editEpisode = function(episode){
				modalService.videoModal(episode, null, null, function (data) {
					if(data.deleted){
						episode.deleted = true;
					}
				});
			};


			$scope.openFileBrowser = function(){
				modalService.openFileBrowser(function (file) {
					apiService.video.addFile($scope.episode.id, file.id).success(function () {
						$scope.episode.files = $scope.episode.files || [];
						$scope.episode.files.push(file);
					});
				});
			};


			$scope.manageFiles = function(episode){
				modalService.fileManagerModal(episode);
			};


      var uploadUrl = 'video/uploadFile.json?id=' + $scope.episode.id;
      $scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, uploadUrl, uploadSuccess, uploadError);

      function uploadSuccess (data) {
        $scope.uploadStatus.percentage = null;
        $scope.episode.files = $scope.episode.files || [];
        $scope.episode.files.push(data);
      }

      function uploadError(err) {
        //TODO remove upload-overlay on error
      }
		}
	}
}]);
