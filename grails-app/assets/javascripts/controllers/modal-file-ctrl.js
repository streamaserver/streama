'use strict';

streamaApp.controller('modalFileCtrl', [
  '$scope', '$modalInstance', 'apiService', 'uploadService', 'video',
  function ($scope, $modalInstance, apiService, uploadService, video) {
    $scope.loading = false;


    //$modalInstance.close(data);

    $scope.video = video;

    $scope.addExternalUrl = function (externalUrl) {
      apiService.video.addExternalUrl({id: $scope.video.id, externalUrl: externalUrl}).success(function (data) {
        alertify.success("External Url Added.");
        //$scope.video.files.push(data);
        $scope.video.externalLink = null;
        _.pushOrReplace($scope.video.files, data);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.removeFile = function (file) {
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
      alertify.confirm('Are you sure you want to remove the file "'+file.originalFilename+'"?', function (confirmed) {
        if(confirmed){
          apiService.video.removeFile($scope.video.id, file.id).success(function () {
            if(file.extension == '.srt' || file.extension == '.vtt'){
              _.remove($scope.video.subtitles, {id: file.id});
              alertify.success('Subtitles deleted.');
            }else{
              _.remove($scope.video.files, {id: file.id});
              alertify.success('Video deleted.');
            }
          });
        }
      });
    };


    $scope.uploadStatus = {};
    $scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + video.id, function (data) {
      $scope.uploadStatus.percentage = null;

      if(data.extension == '.srt' || data.extension == '.vtt'){
        $scope.video.subtitles = $scope.video.subtitles || [];
        $scope.video.subtitles.push(data);
        alertify.success('Subtitles uploaded successfully.');
      }else{
        $scope.video.files = $scope.video.files || [];
        $scope.video.files.push(data);
        alertify.success('Video uploaded successfully.');
      }

    });

    $scope.getFilesForExtensions = function(extensions){
      return _.filter($scope.video.files, function (file) {
        return (extensions.indexOf(file.extension.toLowerCase()) > -1);
      })
    };

  }]);
