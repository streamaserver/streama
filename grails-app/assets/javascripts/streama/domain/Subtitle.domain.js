//= wrapped

angular.module('streama').factory('Subtitle', function ($resource) {
  return $resource('NO CRUD', {}, {
    "setDefault":{
      method:"GET",
      url: 'subtitles/setDefaul'
    },
    "getOpensubtitles": {
      method: "GET",
      url:  'subtitles/get'
    },
    "uploadOpensubtitles": {
      method: "GET",
      url: 'subtitles/download'
    },
    "refreshSubtitles": {
      method: "GET",
      isArray: true,
      url:  'subtitles/getVideoSubtitles'
    }
  });
});
