//= wrapped

angular.module('streama')
  .controller('modalCreateFromFileCtrl', modalCreateFromFileCtrl);

function modalCreateFromFileCtrl($scope, $uibModalInstance, apiService, uploadService, dialogOptions, modalService, $state) {
  var vm = this;
  var STATUS_NO_MATCH = 0;
  var STATUS_MATCH_FOUND = 1;
  var STATUS_EXISTING = 2;
  var STATUS_CREATED = 3;
  var STATUS_LIMIT_REACHED = 4;
  var STATUS_EXISTING_FOR_SUBTITLE = 5;
  var STATUS_SUBTITLE_MATCH = 6;
  var STATUS_SUBTITLE_ADDED = 7;

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
	vm.getMatchDisplay = getMatchDisplay;
	vm.selection = [];
  vm.addAllMatches = addAllMatches;
  vm.addSelectedFile = addSelectedFile;
  vm.openMediaDetail = openMediaDetail;
  vm.openAdminForm = openAdminForm;
  vm.isSelected = isSelected;
  vm.hasStatus = hasStatus;


	init();


	function init() {
		loadLocalFiles('');
	}

	function openAdminForm(mediaObject) {
		var url = $state.href('admin.' + mediaObject.importedType, {showId: mediaObject.importedId, movieId: mediaObject.importedId, season:  mediaObject.season});
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
		apiService.file.localFiles(path).then(function(response) {
			var data = response.data;
			vm.localFilesEnabled = true;
			vm.localFiles = data;
		}, function(data) {
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
			apiService.file.localFiles(dir.path).then(function(response) {
				var data = response.data;
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
    vm.matchResult = null;
		var fileSelection = _.filter(vm.selection, {directory: false});
		apiService.file.matchMetaDataFromFiles(fileSelection).then(function (response) {
			var data = response.data;
			vm.isMatcherLoading = false;
			vm.matchResult = data;
			//console.log(data);
      deselectByStatus(STATUS_EXISTING);
		});
	}

	function toggleSelection(file) {
		vm.selection = _.xorBy(vm.selection, [file], 'path');
	}

	function deselect(file) {
	  _.remove(vm.selection, {path: file.path});
	}

	function isSelected(file) {
		return _.some(vm.selection, {path: file.path});
	}

	function toggleDirectorySelection(directory) {
		directory.isSelected = !directory.isSelected;
	  if(directory.isSelected){
      openLocalDirectory(directory, true, function () {
        _.forEach(directory.localFiles, function (content) {
			if(content.path.split('\\').pop().split('.').length > 1){
				toggleSelection(content);
			}else{
				openLocalDirectory(content, true, function () {
				_.forEach(content.localFiles, function (file) {
				  toggleSelection(file);
						});
					});
			};
        });
      });
    }else{
      _.forEach(directory.localFiles, function (file) {
        deselect(file);
        directory.showFiles = false;
		file.showFiles = false;
		_.forEach(file.localFiles, function (subfile) {
				deselect(subfile);
				subfile.showFiles = false;
				});
      });
    }

	}

	function getMatchForPath(path) {
		return _.find(vm.matchResult, {file: path});
	}

	function getMatchDisplay(file) {
		var match =_.find(vm.matchResult, {file: file.path});
		if(match.type === 'episode'){
			return match.showName + ' ' + 'S'+ _.padStart(match.season, 2, "0") +'E'+  _.padStart( match.episodeNumber, 2, "0")
		}

		if(match.type === 'movie'){
			return match.title + ' (' + match.release_date.substring(0, 4)  + ')'
		}
		console.log('%c match', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', match);

	}



  function addAllMatches() {
		var allFoundMatches = _.filter(vm.matchResult, function (match) {
			return (match.status === STATUS_MATCH_FOUND || match.status === STATUS_EXISTING_FOR_SUBTITLE || match.status === STATUS_SUBTITLE_MATCH)
		});
		if(allFoundMatches.length == 0){
			alertify.success('Nothing to add.');
		}

    apiService.file.bulkAddMediaFromFile(allFoundMatches).then(function (response) {
			var data = response.data;
      if(_.some(data, {status: STATUS_LIMIT_REACHED})){
        alertify.log("not all files were added unfortunately. This is due to TheMovieDB API LIMIT constraints. Just try again in a couple of seconds :). ")
      }else{
        alertify.success("All matches have been added to the database and files connected");
      }
      mergeMatchResults(data);
    });

  }

	function addSelectedFile(file) {
    var fileMatch = _.find(vm.matchResult, {"file": file.path});
    apiService.file.bulkAddMediaFromFile([fileMatch]).then(function (response) {
			var result = response.data;
      if(_.some(result, {status: STATUS_LIMIT_REACHED})){
        alertify.log("not all files were added unfortunately. This is due to TheMovieDB API LIMIT constraints. Just try again in a couple of seconds :) ")
      }else{
        alertify.success(fileMatch.title || fileMatch.episodeName + " has been added");
      }
      mergeMatchResults(result);
    });
	}

  function mergeMatchResults(result) {
    vm.matchResult = _.map(vm.matchResult, function (match) {
      return _.find(result, {file: match.file}) || match;
    });

    deselectByStatus(STATUS_CREATED);
  }


  function deselectByStatus(status) {
    _.forEach(_.filter(vm.matchResult, {status: status}), function (file) {
      var localFile = _.find(vm.selection, {path: file.file});
      toggleSelection(localFile);
    });
  }

  function hasStatus(file, status) {
		var matchForPath = getMatchForPath(file.path);
		if(!matchForPath){
			return false;
		}
		return (matchForPath.status === status);
	}

}
