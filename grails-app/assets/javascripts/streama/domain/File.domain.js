
angular.module('streama').factory('File', function ($resource) {

  var baseUrl = 'file/';

  var params = {};

  var actions = {
    "localFiles":{
      method:"GET",
      url: baseUrl + 'localFiles.json',
      isArray: true
    },
    "listAllFiles":{
      method:"GET",
      url: 'file.json'
    },
    "removeFileFromDisk":{
      method:"DELETE",
      url: baseUrl + 'removeFileFromDisk.json'
    },
    "removeMultipleFilesFromDisk":{
      method:"DELETE",
      url: baseUrl + 'removeMultipleFilesFromDisk.json'
    },
    "cleanUpFiles":{
      method:"DELETE",
      url: baseUrl + 'cleanUpFiles.json'
    },
    "matchMetaDataFromFiles": {
      method: "POST",
      url:  baseUrl + 'matchMetaDataFromFiles.json'
    },
    "bulkAddMediaFromFile": {
      method: "POST",
      url:  baseUrl + 'bulkAddMediaFromFile.json'
    },
    "save": {
      method: "POST",
      url:  baseUrl + 'save.json'
    },
    "getURL": {
      method: "GET",
      url:  baseUrl + 'getURL.json'
    }
  };

  return $resource(baseUrl, params, actions);
});
