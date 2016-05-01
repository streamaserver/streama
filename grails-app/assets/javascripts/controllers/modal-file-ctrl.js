'use strict';

streamaApp.controller('modalFileCtrl', [
  '$scope', '$modalInstance', 'apiService', 'uploadService', 'video',
  function ($scope, $modalInstance, apiService, uploadService, video) {
    $scope.loading = false;


    //$modalInstance.close(data);

    $scope.video = video;

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
            }else{
              _.remove($scope.video.files, {id: file.id});
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
      }else{
        $scope.video.files = $scope.video.files || [];
        $scope.video.files.push(data);
      }

    });

    $scope.getFilesForExtensions = function(extensions){
      return _.filter($scope.video.files, function (file) {
        return (extensions.indexOf(file.extension.toLowerCase()) > -1);
      })
    };

  }]);
