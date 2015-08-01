'use strict';

streamaApp.directive('adminEpisode', [
	'uploadService', 'modalService', 'apiService', function (uploadService, modalService, apiService) {
	return {
		restrict: 'AE',
		templateUrl: 'directive--admin-episode.htm',
		scope: {
			episode: '='
		},
		link: function ($scope, $elem, $attrs) {
			$scope.uploadStatus = {};



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



			$scope.addFile = function(episode){
				modalService.fileModal(episode);
			};


			$scope.removeFile = function(file){
				alertify.confirm('Are you sure you want to remove the file "'+file.originalFilename+'"?', function (confirmed) {
					if(confirmed){
						apiService.video.removeFile($scope.episode.id, file.id).success(function () {
              _.remove($scope.episode.files, {id: file.id});
						});
					}
				});
			};



			$scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + $scope.episode.id, function (data) {
				$scope.uploadStatus.percentage = null;
				$scope.episode.files = $scope.episode.files || [];
				$scope.episode.files.push(data);
			});
		}
	}
}]);
