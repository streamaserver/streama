//= wrapped

angular.module('streama')
  .controller('modalCreateFromFileCtrl', modalCreateFromFileCtrl);

function modalCreateFromFileCtrl($scope, $uibModalInstance, apiService, uploadService, dialogOptions) {
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
	vm.cancel = cancel;
	vm.toggleSelectAll = toggleSelectAll;
	vm.runMatcher = runMatcher;
	vm.toggleSelection = toggleSelection;
	vm.getMatchForPath = getMatchForPath;
	vm.selection = [];
  vm.addAllMatches = addAllMatches;
  vm.addThisFile = addThisFile;


	init();


	function init() {
		loadLocalFiles('');
	}

	function loadLocalFiles(path) {
		apiService.file.localFiles(path).success(function(data) {
			vm.localFilesEnabled = true;
			vm.localFiles = data;
		}).error(function(data) {
			if (data.code == 'LocalFilesNotEnabled') {
				vm.localFilesEnabled = false;
				return;
			}
			alertify.error(data.message);
		});
	}

	function backLocalDirectory() {
		vm.localFiles = [];
		vm.localDir.pop();
		vm.loadLocalFiles(vm.localDir.join('/'));
	}

	function openLocalDirectory(dir) {
		// vm.localFiles = [];
		// vm.localDir.push(dir.name);
		// vm.loadLocalFiles(vm.localDir.join('/'));
    dir.showFiles = dir.showFiles == true ? false : true;
    dir.localFiles = [];
    apiService.file.localFiles(dir.path).success(function(data) {
      dir.localFiles = data;
    });
    console.log(dir);
	}

	function addExternalUrl(externalUrl) {
		apiService.video.addExternalUrl({id: vm.video.id, externalUrl: externalUrl}).success(function (data) {
			alertify.success("External URL Added.");
			vm.video.externalLink = null;

			if(_.find(vm.video.files, {id: data.id})){
				vm.video.files[_.indexOf(vm.video.files, {id: data.id})] = data;
			}else{
				vm.video.files = vm.video.files || [];
				vm.video.files.push(data);
				vm.video.hasFiles = true;
			}
		});
	}

	function addLocalFile(localFile) {
		apiService.video.addLocalFile({id: vm.video.id, localFile: localFile}).success(function (data) {
			alertify.success("Local File Added.");
			vm.video.localFile = null;

			if(_.find(vm.video.files, {id: data.id})){
				vm.video.files[_.indexOf(vm.video.files, {id: data.id})] = data;
			}else{
				vm.video.files = vm.video.files || [];
				vm.video.files.push(data);
				vm.video.hasFiles = true;
			}
		}).error(function(data) {
			alertify.error(data.message);
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	function removeFile(file) {
		alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm('Are you sure you want to remove the file "'+file.originalFilename+'"?', function (confirmed) {
			if(confirmed){
				apiService.video.removeFile(vm.video.id, file.id).success(function () {
					if(file.extension == '.srt' || file.extension == '.vtt'){
						_.remove(vm.video.subtitles, {id: file.id});
						alertify.success('Subtitles deleted.');
					}else{
						_.remove(vm.video.files, {id: file.id});
						alertify.success('Video deleted.');
					}
				});
			}
		});
	}



	function getFilesForExtensions(extensions){
		return _.filter(vm.video.files, function (file) {
			return (extensions.indexOf(file.extension.toLowerCase()) > -1);
		})
	}


	function toggleSelectAll() {
		alert('toggleSelectAll needs implementation.')
	}

	function runMatcher() {
		vm.isMatcherLoading = true;
		apiService.file.matchMetaDataFromFiles(vm.selection).success(function (data) {
			vm.isMatcherLoading = false;
			vm.matchResult = data;
			console.log(data);
		});
	}

	function toggleSelection(file) {
		vm.selection = _.xorBy(vm.selection, [file], 'path');
	}

	function getMatchForPath(path) {
		return _.find(vm.matchResult, {file: path});
	}

  function addAllMatches() {
    alert("to be implemented")
  }

  function addThisFile() {
    alert("to be implemented")
  }

}
