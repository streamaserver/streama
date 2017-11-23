//= wrapped

angular.module('streama')
  .controller('imageChooserModalCtrl', imageChooserModalCtrl);

function imageChooserModalCtrl($uibModalInstance, dialogOptions, apiService) {
  var vm = this;
	vm.mediaType = dialogOptions.mediaType;
	vm.media = dialogOptions.media;
  vm.imagesForMedia = [];

  vm.chooseImage = chooseImage;
  vm.close = $uibModalInstance.close;

  init();


  function init() {
    apiService.theMovieDb.imagesForMedia({type: vm.mediaType, apiId: vm.media.apiId}).then(function (response) {
      vm.imagesForMedia = response.data;
    });
  }

  function chooseImage(image) {
    vm.media.backdrop_path = image.file_path;
    $uibModalInstance.close();
  }
}
