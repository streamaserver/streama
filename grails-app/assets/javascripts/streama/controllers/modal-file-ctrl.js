'use strict';

angular.module('streama').controller('modalFileCtrl', [
  '$scope', '$uibModalInstance', 'apiService', 'uploadService', 'video', 'localStorageService',
  function ($scope, $uibModalInstance, apiService, uploadService, video, localStorageService) {
    $scope.loading = false;
    $scope.localFilesEnabled = false;
    $scope.localFiles = [];
    $scope.activeTab = localStorageService.get('activeFileModalTab')|| 'upload';
    $scope.closeOnSelect = localStorageService.get('fileModal.closeOnSelect');
    if($scope.closeOnSelect == null){$scope.closeOnSelect = true;}

    var localFileLastPath = localStorageService.get('localFileLastPath')|| '';
		$scope.localDir = localFileLastPath.split('/') || [];
    $scope.video = video;

    $scope.loadLocalFiles = loadLocalFiles;
		$scope.backLocalDirectory = backLocalDirectory;
		$scope.openLocalDirectory = openLocalDirectory;
		$scope.toggleCloseOnSelect = toggleCloseOnSelect;


		$scope.loadLocalFiles(localFileLastPath);


		$scope.$watch('activeTab', function (newVal, oldVal) {
      localStorageService.set('activeFileModalTab', newVal);
    });

		function loadLocalFiles(path) {
			apiService.file.localFiles(path).success(function(data) {
				localStorageService.set('localFileLastPath', path);
				$scope.localFilesEnabled = true;
				$scope.localFiles = data;
			}).error(function(data) {
				if (data.code == 'LocalFilesNotEnabled') {
					$scope.localFilesEnabled = false;
					return;
				}
				alertify.error(data.message);
			});
		}

    function backLocalDirectory() {
      $scope.localFiles = [];
      $scope.localDir.pop();
      $scope.loadLocalFiles($scope.localDir.join('/'));
    }

    function openLocalDirectory(dir) {
      $scope.localFiles = [];
      $scope.localDir.push(dir.name);
      $scope.loadLocalFiles($scope.localDir.join('/'));
    }

    $scope.addExternalUrl = function (externalUrl) {
      apiService.video.addExternalUrl({id: $scope.video.id, externalUrl: externalUrl}).success(function (data) {
        alertify.success("External URL Added.");
        $scope.video.externalLink = null;

        if(_.find($scope.video.files, {id: data.id})){
          $scope.video.files[_.indexOf($scope.video.files, {id: data.id})] = data;
        }else{
          $scope.video.files = $scope.video.files || [];
          $scope.video.files.push(data);
          $scope.video.hasFiles = true;
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
					$scope.video.hasFiles = true;
        }
        if($scope.closeOnSelect){
          $uibModalInstance.dismiss('cancel');
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

    $scope.saveChanges = function (file) {
      apiService.file.save(file).success(function (data) {
        alertify.success('File successfully saved.');
      });
    };


    $scope.uploadStatus = {};
    $scope.upload = uploadService.doUpload.bind(uploadService, $scope.uploadStatus, 'video/uploadFile.json?id=' + video.id, function (data) {
    	
      $scope.uploadStatus.percentage = null;

		if(data.error) return

      if(data.extension == '.srt' || data.extension == '.vtt'){
        $scope.video.subtitles = $scope.video.subtitles || [];
        $scope.video.subtitles.push(data);
				$scope.video.hasFiles = true;
        alertify.success('Subtitles uploaded successfully.');
      }else{
        $scope.video.files = $scope.video.files || [];
        $scope.video.files.push(data);
				$scope.video.hasFiles = true;
        alertify.success('Video uploaded successfully.');
      }

    }, function () {});

    $scope.getFilesForExtensions = function(extensions){
      return _.filter($scope.video.files, function (file) {
        return (extensions.indexOf(file.extension.toLowerCase()) > -1);
      })
    };

    function toggleCloseOnSelect() {
      localStorageService.set('fileModal.closeOnSelect', $scope.closeOnSelect);
    }

  }]);
