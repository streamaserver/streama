'use strict';

angular.module('streama').factory('fileService',[ 'apiService', '$sce' , function ( apiService, $sce) {
  return {
    getAssetFromSetting: function (setting) {

      var assetURL = setting.value;

      if(assetURL.startsWith("upload:")){
        var id = assetURL.split(":")[1]
        apiService.file.getURL(id)
          .success(function (data) {  setting.src = data.url})

      }else{
        setting.src = assetURL;
      }


    }
  };
}]);
