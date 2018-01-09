'use strict';

angular.module('streama').controller('settingsSettingsCtrl',
      ['$scope', 'apiService', '$sce', 'uploadService',
      function ($scope, apiService, $sce, uploadService) {

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
    if($scope.loading === true){
      return
    }

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
    if(settings.validationRequired === false){
			settings.valid = true;
			settings.invalid = false;
    }else{
			settings.valid = undefined;
			settings.invalid = undefined;
			settings.dirty = settings.value;
    }
  };


	$scope.uploadStatus = {};
	$scope.upload = function (setting, files) {
		//check if upload dir is set
		apiService.settings.list().success(function (setlist) {
			var uploadDir = _.find(setlist, {settingsKey: 'Upload Directory'});
			if (uploadDir.value) {
				//do upload
				uploadService.doUpload($scope.uploadStatus, 'file/upload.json?isPublic=true', function (data) {
					$scope.uploadStatus.percentage = null;
					if(data.error) return;

					setting.value = "upload:" + data.id;
          $scope.getAssetFromSetting(setting);
				}, function () {}, files);
			}else{
				alertify.error("You have to set and save Upload Directory first");
			}
		});
	};

	$scope.getAssetFromSetting = function (setting) {
    if(typeof setting === "undefined")return false;
    var assetURL = setting.value;

    if(assetURL !== setting.prevValue) {
      setting.prevValue = assetURL;

      if (assetURL.startsWith("upload:")) {

        var id = assetURL.split(":")[1];
        apiService.file.getURL(id)
          .success(function (data) {
            setting.src = data.url
            return true;
          })

      } else {
        setting.src = assetURL;
        return true;
      }

    }else{
      return true;
    }

  }

  $scope.anySettingsInvalid = function () {
    return _.find($scope.settings, function (setting) {
        return (setting.validationRequired !== false && (setting.invalid || (setting.dirty && !setting.valid) || (!setting.value && setting.required)));
   });
  };

  $scope.resetBaseURL = function (settings) {
    settings.value = 'http://localhost:8080';
    settings.valid = true;
  }

}]);
