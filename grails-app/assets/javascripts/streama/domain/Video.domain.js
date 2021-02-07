//= wrapped

angular.module('streama').factory('Video', function ($resource) {
  var baseUrl = 'video/';

  return $resource('NO_CRUD', {}, {
    "get":{
      method:"GET",
      url: baseUrl + 'show'
    },
    "show":{
      method:"GET",
      url: baseUrl + 'show'
    },
    "save": {
      method: "POST",
      url:  baseUrl + 'save'
    },
    "delete": {
      method: "DELETE",
      url: baseUrl + 'delete'
    },
    "list": {
      method: "GET",
      isArray: true,
      url:  'video'
    },
    "dash":{
      method:"GET",
      url: baseUrl + 'dash'
    },
    "removeFile":{
      method:"GET",
      url: baseUrl + 'removeFile'
    },
    "addFile":{
      method:"GET",
      url:  baseUrl + 'addFile'
    },
    "refetch":{
      method:"GET",
      isArray: true,
      url:  baseUrl + 'refetch'
    },
    "addExternalUrl":{
      method:"GET",
      url: baseUrl + 'addExternalUrl'
    },
    "markAsUnviewed":{
      method:"GET",
      url: baseUrl + 'markAsUnviewed'
    },
    "markCompleted":{
      method:"GET",
      url: baseUrl + 'markCompleted'
    },
    "addLocalFile":{
      method:"GET",
      url: baseUrl + 'addLocalFile'
    },
    "listAllFiles":{
      method:"GET",
      url: 'file'
    },


  });
});
