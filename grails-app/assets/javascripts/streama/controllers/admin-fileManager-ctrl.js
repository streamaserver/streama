

angular.module('streama').controller('adminFileManagerCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {


	$scope.maxPerPage = 10;
	$scope.offset = 0;
	$scope.pagination = {};

	$scope.activeListDisplay = 'table';

	$scope.selectedFiles = [];

	$scope.changeListDisplay = function (displayType) {
		$scope.activeListDisplay = displayType;
	};

	$scope.removeFile = function(file){
		var confirmText;
		if(file.isHardDriveFile){
			confirmText = 'This file is not associated with any object in the database and is therefore a sort of artifact. Do you want to remove it now?';
		}
		else if(file.videos && file.videos.length){
			confirmText = 'This file is associated with '+file.videos[0].title+'. Do you want to remove this File from the hard drive?';
		}else {
			confirmText = 'This file is not associated with any Video. Do you want to remove this File from the hard drive?';
		}
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm(confirmText, function (confirmed) {
			if(confirmed){
				apiService.video.removeFileFromDisk(file.id, file.path).then(function () {
					_.remove($scope.files, {id: file.id});
					_.remove($scope.files, {path: file.path});
          alertify.success('File deleted.');
				}, function (err) {
					console.log(err);
					alertify.error('An error occured. ' + err.data);
				});
			}
		})
	};

	$scope.removeMultipleFiles = function() {
	  if($scope.selectedFiles.length > 0) {
      var confirmText = "This will delete all selected Files. Do you want to proceed?";
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
      alertify.confirm(confirmText, function (confirmed) {
        if(confirmed){
          apiService.video.removeMultipleFilesFromDisk($scope.selectedFiles).then(function (response) {
						var data = response.data;
            _.forEach(data.successes, function (id) {
								// TODO investigate why {id: id} doesn't work
								_.remove($scope.files, function(file) {
									return file.id === id;
								});
						});
            selectedFiles = [];
            alertify.success(data.successes.length + ' of ' + $scope.selectedFiles.length + ' files deleted.');
          }, function (response) {
						alertify.error(data.successes.length + ' of ' + $scope.selectedFiles.length + ' files could be deleted. (this could be due to them being associated with the file-browser or an externalLink)');
					});
        }
      });
	  }
	};

	$scope.addOrRemoveFromSelection = function($event, file) {
	  if($event.target.checked) {
      $scope.selectedFiles.push(file.id);
    } else {
      _.remove($scope.selectedFiles, function(id) {
        return id === file.id;
      });
    }
	};

	$scope.pageChanged = function () {
		var newOffset = $scope.maxPerPage*($scope.pagination.currentPage-1);
		loadFiles({max: $scope.maxPerPage, filter: $scope.listFilter, offset: newOffset});
	};


	$scope.refreshList = function (filter) {
		$scope.listFilter = filter;
		loadFiles({max: $scope.maxPerPage, filter: filter, offset: $scope.offset});
	};


	var loadFiles = function (params) {
		$scope.loading = true;
		$scope.files = [];
		$scope.filesCount = 0;
		apiService.video.listAllFiles(params).then(function (response) {
				var data = response.data;
			  console.log(data);
				$scope.loading = false;
				$scope.files = data.files;
				$scope.filesCount = data.count;
			}, function () {
				alertify.error('An error occurred.');
			});
	};


	$scope.cleanUpFiles = function(type){
		var message;
		if(type == 'noVideos'){
			message = 'Are you sure you want to proceed? This will delete all file-objects that are missing the corresponding file in the file-system';
		}else if(type == 'noFile'){
			message = 'Are you sure you want to proceed? This will delete all non-associated files from the harddrive';
		}
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm(message, function (confirmed) {
			if(confirmed){
				$scope.loading = true;
				apiService.video.cleanUpFiles(type).then(function () {
					$scope.refreshList('all');
				});
			}
		})
	};



	//Initial Load
	$scope.refreshList('all');
}]);
