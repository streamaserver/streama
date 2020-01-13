
angular.module('streama').factory('Video', function ($resource) {

  var baseUrl = 'video/';

  var params = {};

  var actions = {
    "show":{
      method:"GET",
      url: baseUrl + 'show.json'
    },
    "save": {
      method: "POST",
      url:  baseUrl + 'save.json'
    },
    "delete": {
      method: "DELETE",
      url: baseUrl + 'delete.json'
    },
    "list": {
      method: "GET",
      isArray: true,
      url:  'video.json'
    },
    "dash":{
      method:"GET",
      url: baseUrl + 'dash.json'
    },
    "removeFile":{
      method:"GET",
      url: baseUrl + 'removeFile.json'
    },
    "addFile":{
      method:"GET",
      url:  baseUrl + 'addFile.json'
    },
    "refetch":{
      method:"GET",
      isArray: true,
      url:  baseUrl + 'refetch.json'
    },
    "addExternalUrl":{
      method:"GET",
      url: baseUrl + 'addExternalUrl.json'
    },
    "addLocalFile":{
      method:"GET",
      url: baseUrl + 'addLocalFile.json'
    },


  };

  return $resource(baseUrl, params, actions);
});
