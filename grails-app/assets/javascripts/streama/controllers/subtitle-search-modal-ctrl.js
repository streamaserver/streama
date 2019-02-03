//= wrapped

angular.module('streama')
  .controller('subtitleSearchModalCtrl', subtitleSearchModalCtrl);

function subtitleSearchModalCtrl($uibModalInstance, dialogOptions, apiService) {
  var vm = this;
  vm.videoData = dialogOptions.videoData;
  vm.subtitles = [];
  vm.languages = [];
  vm.selectedSubtitle = null;
  vm.subtitleSearch = {
    language: 'eng',
    id: vm.videoData.id,
    query: _.get(vm.videoData, 'files[0].originalFilename')
  };

  vm.search = search;
  vm.selectSubtitle = selectSubtitle;
  vm.close = $uibModalInstance.close;

  init();


  function init() {
    apiService.video.listOpenSubtitleLanguages().then(function (data) {
      vm.languages = data.data;
    });
  }

  function search() {
    apiService.video.searchSubtitles(vm.subtitleSearch).then(function (data) {
      vm.subtitles = data.data;
    });
  }

  function selectSubtitle(subtitle) {

  }
}
