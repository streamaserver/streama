'use strict';

angular.module('streama').directive('adminEpisode', [
	'uploadService', 'modalService', '$stateParams', 'Report', 'Video',
  function (uploadService, modalService, $stateParams, Report, Video) {
	return {
		restrict: 'AE',
		templateUrl: '/streama/directive--admin-episode.htm',
		scope: {
			episode: '='
		},
		link: function ($scope, $elem, $attrs) {
			$scope.uploadStatus = {};

      addHighlighting();

      $scope.reportsForEpisode= function () {
        Report.reportsById({videoId: $scope.episode.id}).$promise.then(function (response) {
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
					Video.addFile({videoId: $scope.episode.id, fileId: file.id}).$promise.then(function () {
						$scope.episode.videoFiles = $scope.episode.videoFiles || [];
						$scope.episode.videoFiles.push(file);
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
        $scope.episode.videoFiles = $scope.episode.videoFiles || [];
        $scope.episode.videoFiles.push(data);
      }

      function uploadError(err) {
        //TODO remove upload-overlay on error
      }

      function addHighlighting() {
        if (parseInt($stateParams.episodeId) === $scope.episode.id) {
          setTimeout(function () {
            var HEADER_HEIGHT = 55;
            var offsetTop = $elem.find('.media-list-item').offset().top;
            jQuery('.admin-content').scrollTop(offsetTop - HEADER_HEIGHT);
            $elem.addClass('highlight');
          }, 400);

          setTimeout(function () {
            $elem.removeClass('highlight');
          }, 2000);
        }
      }
		}
	}
}]);
