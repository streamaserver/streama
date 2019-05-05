//= wrapped

angular.module('streama')
  .controller('playbackOptionsModalCtrl', playbackOptionsModalCtrl);

function playbackOptionsModalCtrl($uibModalInstance, dialogOptions, apiService) {
  var vm = this;
  vm.playerOptions = _.clone(dialogOptions.playerOptions);
  vm.selectVideoFile = selectVideoFile;
  vm.changeSubtitleSize = changeSubtitleSize;
  vm.isVideoFileSelected = isVideoFileSelected;
  vm.selectSubtitle = selectSubtitle;
  vm.isSubtitleSelected = isSubtitleSelected;
  vm.submit = submit;
  vm.close = $uibModalInstance.close;


  function selectSubtitle(track) {
    vm.playerOptions.selectedSubtitle = track;
  }

  function isSubtitleSelected(track) {
    return (_.get(vm.playerOptions, 'selectedSubtitle.id') === _.get(track, 'id'));
  }

  function selectVideoFile(track) {
    vm.playerOptions.selectedVideoFile = track;
  }

  function isVideoFileSelected(track) {
    return (_.get(vm.playerOptions, 'selectedVideoFile.id') === _.get(track, 'id'));
  }

  function changeSubtitleSize(size) {
    vm.playerOptions.subtitleSize = size;
  }

  function submit() {
    $uibModalInstance.close(vm.playerOptions);
  }
}
