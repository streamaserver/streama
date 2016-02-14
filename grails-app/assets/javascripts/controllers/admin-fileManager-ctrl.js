

streamaApp.controller('adminFileManagerCtrl', ['$scope', 'apiService', 'modalService', '$state', function ($scope, apiService, modalService, $state) {

	$scope.loading = true;
	$scope.maxPerPage = 10;
	$scope.offset = 0;

	$scope.activeListDisplay = 'table';

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

		alertify.confirm(confirmText, function (confirmed) {
			if(confirmed){
				apiService.video.removeFileFromDisk(file.id, file.path).success(function () {
					_.remove($scope.files, {id: file.id});
					_.remove($scope.files, {path: file.path});
				});
			}
		})
	};

	$scope.pageChanged = function () {
		loadFiles({max: $scope.maxPerPage, filter: $scope.listFilter, offset: ($scope.maxPerPage*($scope.currentPage-1))});
	};


	$scope.refreshList = function (filter) {
		$scope.listFilter = filter;
		loadFiles({max: $scope.maxPerPage, filter: filter, offset: $scope.offset});
	};


	var loadFiles = function (params) {
		apiService.video.listAllFiles(params)
			.success(function (data) {
				$scope.loading = false;
				$scope.files = data.files;
				$scope.filesCount = data.count;
			})
			.error(function () {
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
		alertify.confirm(message, function (confirmed) {
			if(confirmed){
				$scope.loading = true;
				apiService.video.cleanUpFiles(type).success(function () {
					$scope.refreshList('all');
				});
			}
		})
	};



	//Initial Load
	$scope.refreshList('all');

}]);