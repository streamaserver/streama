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
  vm.submit = submit;
  vm.selectSubtitle = selectSubtitle;
  vm.isSelected = isSelected;
  vm.close = $uibModalInstance.close;

  init();


  function init() {
    apiService.video.listOpenSubtitleLanguages().then(function (data) {
      vm.languages = data.data;
    });
  }

  function search() {
    apiService.video.searchSubtitles(vm.subtitleSearch).then(
      function (data) {
        console.log('%c data', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', data);
    });
  }

  function submit() {
    apiService.video.addSubtitle(vm.selectedSubtitle).then(function () {

    });
  }

  function selectSubtitle(subtitle) {
    vm.selectedSubtitle = subtitle;
  }

  function isSelected(subtitle) {
   return _.isEqualBy(subtitle, vm.selectedSubtitle, 'IDSubtitle');
  }
}
