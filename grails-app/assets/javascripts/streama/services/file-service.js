'use strict';

angular.module('streama').factory('fileService',[ 'apiService', '$sce' , function ( apiService, $sce) {
  return {
    getAssetFromSetting: function (setting) {
      if(typeof setting === "undefined")return false;
      var assetURL = setting.value;

      if(assetURL !== setting.prevValue) {
        //we do this so we don't get caught in an infinite loop if the value doesn't need to be changed
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
  };
}]);
