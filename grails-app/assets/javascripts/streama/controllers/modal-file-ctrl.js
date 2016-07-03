'use strict';

angular.module('streama').controller('modalFileCtrl', [
  '$scope', '$uibModalInstance', 'apiService', 'uploadService', 'video',
  function ($scope, $uibModalInstance, apiService, uploadService, video) {
    $scope.loading = false;
    $scope.localFiles = [];
    $scope.localDir = [];
    $scope.video = video;

    $scope.loadLocalFiles = function(path) {
      apiService.file.localFiles(path).success(function(data) {
        $scope.localFiles = data;
      }).error(function(data) {
        alertify.error(data.message);
      });
    };
    $scope.loadLocalFiles('');

    $scope.backLocalDirectory = function() {
      $scope.localFiles = [];
      $scope.localDir.pop();
      $scope.loadLocalFiles($scope.localDir.join('/'));
    };

    $scope.openLocalDirectory = function(dir) {
      $scope.localFiles = [];
      $scope.localDir.push(dir.name);
      $scope.loadLocalFiles($scope.localDir.join('/'));
    };

    $scope.addExternalUrl = function (externalUrl) {
      apiService.video.addExternalUrl({id: $scope.video.id, externalUrl: externalUrl}).success(function (data) {
        alertify.success("External URL Added.");
        $scope.video.externalLink = null;

        if(_.find($scope.video.files, {id: data.id})){
          $scope.video.files[_.indexOf($scope.video.files, {id: data.id})] = data;
        }else{
          $scope.video.files = $scope.video.files || [];
          $scope.video.files.push(data);
        }
      });
    };

    $scope.addLocalFile = function (localFile) {
      apiService.video.addLocalFile({id: $scope.video.id, localFile: localFile}).success(function (data) {
        alertify.success("Local File Added.");
        $scope.video.localFile = null;

        if(_.find($scope.video.files, {id: data.id})){
          $scope.video.files[_.indexOf($scope.video.files, {id: data.id})] = data;
        }else{
          $scope.video.files = $scope.video.files || [];
          $scope.video.files.push(data);
        }
      }).error(function(data) {
        alertify.error(data.message);
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
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
