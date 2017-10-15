//= wrapped

angular.module('streama')
  .controller('modalCreateFromFileCtrl', modalCreateFromFileCtrl);

function modalCreateFromFileCtrl($scope, $uibModalInstance, apiService, uploadService, dialogOptions, modalService, $state) {
  var vm = this;
	vm.loading = false;
	vm.localFilesEnabled = false;
	vm.localFiles = [];
	vm.localDir = [];
	vm.video = null;
	vm.mediaType = dialogOptions.mediaType;
	vm.uploadStatus = {};
	vm.hasMatcherResult = false;

	vm.loadLocalFiles = loadLocalFiles;
	vm.backLocalDirectory = backLocalDirectory;
	vm.openLocalDirectory = openLocalDirectory;
	vm.close = close;
	vm.toggleSelectAll = toggleSelectAll;
	vm.runMatcher = runMatcher;
	vm.toggleSelection = toggleSelection;
	vm.toggleDirectorySelection = toggleDirectorySelection;
	vm.getMatchForPath = getMatchForPath;
	vm.selection = [];
  vm.addAllMatches = addAllMatches;
  vm.addSelectedFile = addSelectedFile;
  vm.openMediaDetail = openMediaDetail;
  vm.openAdminForm = openAdminForm;
  vm.isSelected = isSelected;


	init();


	function init() {
		loadLocalFiles('');
	}

	function openAdminForm(mediaObject) {
		var url = $state.href('admin.' + mediaObject.importedType, {showId: mediaObject.importedId, movieId: mediaObject.importedId});
		window.open(url,'_blank');
	}

	function openMediaDetail(mediaObject) {
		modalService.mediaDetailModal({
			mediaObject: mediaObject,
			isApiMovie: true,
			mediaType: mediaObject.type
		});
	}

	function loadLocalFiles(path) {
		apiService.file.localFiles(path).success(function(data) {
			vm.localFilesEnabled = true;
			vm.localFiles = data;
		}).error(function(data) {
			if (data.code == 'LocalFilesNotEnabled') {
				vm.localFilesEnabled = false;
			}
			alertify.error(data.message);
		});
	}

	function backLocalDirectory() {
		vm.localFiles = [];
		vm.localDir.pop();
		vm.loadLocalFiles(vm.localDir.join('/'));
	}

	function openLocalDirectory(dir, forceOpen, onSuccess) {
		// vm.localFiles = [];
		// vm.localDir.push(dir.name);
		// vm.loadLocalFiles(vm.localDir.join('/'));
    dir.showFiles = (dir.showFiles == true && !forceOpen) ? false : true;
    if(!dir.localFiles || !dir.localFiles.length){
			dir.localFiles = [];
			apiService.file.localFiles(dir.path).success(function(data) {
				dir.localFiles = data;
				(onSuccess || angular.noop)(data);
			});
			console.log(dir);
		}else{
			(onSuccess || angular.noop)(dir.localFiles);
		}

	}

	function close() {
		$uibModalInstance.close();
	}



	function toggleSelectAll() {
		alert('toggleSelectAll needs implementation.')
	}

	function runMatcher() {
		vm.isMatcherLoading = true;
		var fileSelection = _.filter(vm.selection, {directory: false});
		apiService.file.matchMetaDataFromFiles(fileSelection).success(function (data) {
			vm.isMatcherLoading = false;
			vm.matchResult = data;
			//console.log(data);
		});
	}

	function toggleSelection(file) {
		vm.selection = _.xorBy(vm.selection, [file], 'path');
	}

	function isSelected(file) {
		return _.some(vm.selection, {path: file.path});
	}

	function toggleDirectorySelection(directory) {
		console.log('%c toggleDirectorySelection', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
		openLocalDirectory(directory, true, function () {
			_.forEach(directory.localFiles, function (file) {
				toggleSelection(file);
			});
		});

	}

	function getMatchForPath(path) {
		return _.find(vm.matchResult, {file: path});
	}



  function addAllMatches() {
		var allFoundMatches = _.filter(vm.matchResult, {status: 1});
		if(allFoundMatches.length == 0){
			alertify.success('Nothing to add.');
		}

    apiService.file.bulkAddMediaFromFile(allFoundMatches).success(function (result) {
      alertify.success("All matches have been added to the database and files connected");
      mergeMatchResults(result);
    });

  }

	function addSelectedFile(file) {
    var fileMatch = _.find(vm.matchResult, {"file": file.path});
    apiService.file.bulkAddMediaFromFile([fileMatch]).success(function (result) {
      alertify.success(fileMatch.title || fileMatch.episodeName + " has been added");
      mergeMatchResults(result);
    });
	}


  function mergeMatchResults(result) {
    vm.matchResult = _.map(vm.matchResult, function (match) {
      return _.find(result, {file: match.file}) || match;
    });
  }

}
