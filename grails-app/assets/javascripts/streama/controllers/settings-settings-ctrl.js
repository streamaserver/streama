'use strict';

angular.module('streama')
  .controller('settingsSettingsCtrl',
    ['$scope', 'apiService', '$sce', 'uploadService',
    function ($scope, apiService, $sce, uploadService) {
      $scope.bigLoading = false;
      $scope.loading = true;
      $scope.syncImages = syncImages;

      apiService.settings.list().then(function (response) {
        var data = response.data;
        $scope.settings = data;

        _.forEach(data, function (setting) {
          setting.description = $sce.trustAsHtml(Autolinker.link(setting.description, { newWindow: "true" } ));
        });
        $scope.loading = false;
      });

      $scope.updateMultipleSettings = function (settings) {
        settings.invalid = false;
        apiService.settings.updateMultiple(settings).then(function () {
            window.location.reload();
            alertify.success('Settings saved.');
          })
        };


        $scope.validateSettings = function (settings) {
          if ($scope.loading === true) {
            return
          }
          $scope.changeValue(settings);
          $scope.loading = true;

          apiService.settings.validateSettings(settings).then(function (response) {
            var data = response.data;

            //Allows user to save other settings, even if credentials are invalid or there were problems with opensubtitles api
            if (data.message.includes("Invalid credentials") || data.message.includes("problems")) {
              alertify.log(data.message)
            } else {
              alertify.success(data.message || 'validation successful');
            }
            settings.valid = true;
            $scope.loading = false;
          }, function (response) {
            var data = response.data;
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
        apiService.settings.list().then(function (response) {
          var data = response.data;
          var uploadDir = _.find(data, {settingsKey: 'Upload Directory'});
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
            apiService.file.getURL(id).then(function (response) {
                setting.src = response.data.url;
                return true;
              });

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


      function syncImages() {
        alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
        alertify.confirm("Are you sure, you want to sync all images? This might take a while. (check the server logs for status updates)", function (confirmed) {
          if(confirmed){
            $scope.bigLoading = true;
            apiService.theMovieDb.checkAndFixImageIntegrity().then(function () {
              $scope.bigLoading = false;
            });
          }
        });
      }
}]);
