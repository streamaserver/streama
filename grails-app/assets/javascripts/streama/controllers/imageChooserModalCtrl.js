//= wrapped

angular.module('streama')
  .controller('imageChooserModalCtrl', imageChooserModalCtrl);

function imageChooserModalCtrl($uibModalInstance, dialogOptions) {
  var vm = this;
	vm.mediaType = dialogOptions.mediaType;
	vm.media = dialogOptions.media;

  vm.close = $uibModalInstance.close;
}
