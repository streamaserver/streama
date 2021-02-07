'use strict';


angular.module('streama').controller('modalOpensubtitleCtrl', [
  '$scope', '$uibModalInstance', 'video', 'localStorageService', 'languageData', 'Subtitle',
  function ($scope, $uibModalInstance, video, localStorageService, languageData, Subtitle) {

    $scope.videoName = video.name || video.title
    $scope.loading = false;
    $scope.localFilesEnabled = false;
    $scope.localFiles = [];
    $scope.opensubtitles;
    $scope.isSearch = false;
    $scope.colMd = 12;
    $scope.numberOfResults = 0;

    var englishLanguage = languageData[121].IdSubLanguage;

    $scope.opensubtitleLanguages = {
      availableOptions: languageData,
      defaultValue: englishLanguage
    };

    $scope.activeTab = localStorageService.get('activeFileModalTab') || 'upload';
    $scope.searchByHash = false


    var localFileLastPath = localStorageService.get('localFileLastPath') || '';
    $scope.localDir = localFileLastPath.split('/') || [];
    $scope.video = video;
    $scope.uploadStatus = {};

    $scope.getSubtitles = getSubtitles;
    $scope.uploadSubtitles = uploadSubtitles;
    $scope.cancel = cancel;

    function getSubtitles() {
      Subtitle.getOpensubtitles({episode: video.episode_number, query: $scope.videoName, season: video.season_number, subLanguageId: $scope.opensubtitleLanguages.defaultValue, videoId: video.id, searchByHash: $scope.searchByHash}).$promise.then(function (data) {
        $scope.opensubtitles = data;
        $scope.isSearch = true;
        $scope.colMd = 6;
        $scope.numberOfResults = data.length;
      }, function (data) {
        alertify.error(data.message);
      });
    }

    function uploadSubtitles(opensubtitle) {
      Subtitle.uploadOpensubtitles({subFileName: opensubtitle.subFileName, subDownloadLink: opensubtitle.subDownloadLink, subLang: opensubtitle.languageName, videoId: video.id}).$promise.then(function (data) {
        alertify.success('Successfully loaded');
      }, function () {
        alertify.log('Failed to load file. Try again.');
      });
    }

    function cancel() {
      Subtitle.refreshSubtitles({videoId: $scope.video.id}).$promise.then(function (data) {
        $scope.video.subtitles = data;
      });
      $uibModalInstance.dismiss('cancel');
    }
  }]);
