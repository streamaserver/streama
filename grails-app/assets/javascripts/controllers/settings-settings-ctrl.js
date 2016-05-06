'use strict';

streamaApp.controller('settingsSettingsCtrl', ['$scope', 'apiService', '$sce', function ($scope, apiService, $sce) {

  apiService.settings.list().success(function (data) {
    $scope.settings = data;

    _.forEach(data, function (setting) {
      setting.description = $sce.trustAsHtml(Autolinker.link(setting.description, { newWindow: "true" } ));
    });
    $scope.loading = false;
  });

  $scope.updateMultipleSettings = function (settings) {
    settings.invalid = false;

    apiService.settings.updateMultiple(settings)
      .success(function () {
        window.location.reload();
        alertify.success('Settings saved.');
      })
  };


  $scope.validateSettings = function (settings) {
    $scope.changeValue(settings);
    $scope.loading = true;

    apiService.settings.validateSettings(settings)
      .success(function (data) {
        alertify.success(data.message || 'validation successful');
        settings.valid = true;
        $scope.loading = false;
      })
      .error(function (data) {
        alertify.error(data.message);
        settings.invalid = true;
        $scope.loading = false;
      });
  };

  $scope.changeValue = function (settings) {
    settings.valid = undefined;
    settings.invalid = undefined;
    settings.dirty = settings.value;
  };


  $scope.anySettingsInvalid = function () {
    return _.find($scope.settings, function (setting) {
        return setting.invalid || (setting.dirty && !setting.valid) || (!setting.value && setting.required);
   });
  };

  $scope.resetBaseURL = function (settings) {
    settings.value = 'http://localhost:8080';
    settings.valid = true;
  }

}]);
