'use strict';

angular.module('streama').directive('adminSong', [
  'uploadService', 'modalService', 'apiService',
  function (uploadService, modalService, apiService) {
    return {
      restrict: 'AE',
      templateUrl: '/streama/directive--admin-song.htm',
      scope: {
        song: '=',
        onDelete: '&',
        onUpdate: '&'
      },
      link: function ($scope) {
        $scope.uploadStatus = {};
        $scope.editing = false;

        var uploadUrl = 'audioTrack/uploadFile.json?id=' + $scope.song.id;
        $scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, uploadUrl, uploadSuccess, uploadError);

        function uploadSuccess(data) {
          $scope.uploadStatus.percentage = null;
          $scope.song.files = $scope.song.files || [];
          $scope.song.files.push(data);
          $scope.song.hasFiles = true;
          ($scope.onUpdate || angular.noop)();
        }

        function uploadError() {
          $scope.uploadStatus.percentage = null;
        }

        $scope.openFileBrowser = function () {
          modalService.openFileBrowser(function (file) {
            apiService.audioTrack.addFile($scope.song.id, file.id).then(function () {
              $scope.song.files = $scope.song.files || [];
              $scope.song.files.push(file);
              $scope.song.hasFiles = true;
            });
          });
        };

        $scope.addLocalFile = function () {
          alertify.prompt('Enter the local file path:', function (confirmed, path) {
            if (confirmed && path) {
              apiService.audioTrack.addLocalFile($scope.song.id, path).then(function (response) {
                $scope.song = response.data;
                alertify.success('File linked.');
              });
            }
          });
        };

        $scope.removeFile = function (file) {
          apiService.audioTrack.removeFile($scope.song.id, file.id).then(function () {
            $scope.song.files = $scope.song.files.filter(function (f) { return f.id !== file.id; });
            $scope.song.hasFiles = $scope.song.files.length > 0;
          });
        };

        $scope.deleteSong = function () {
          alertify.set({buttonReverse: true, labels: {ok: 'Yes', cancel: 'Cancel'}});
          alertify.confirm('Delete "' + $scope.song.title + '"?', function (confirmed) {
            if (confirmed) {
              ($scope.onDelete || angular.noop)({song: $scope.song});
            }
          });
        };

        $scope.toggleEdit = function () {
          $scope.editing = !$scope.editing;
        };

        $scope.saveSong = function () {
          apiService.audioTrack.save($scope.song).then(function (response) {
            angular.extend($scope.song, response.data);
            $scope.editing = false;
            alertify.success('Saved.');
          });
        };
      }
    };
  }]);
