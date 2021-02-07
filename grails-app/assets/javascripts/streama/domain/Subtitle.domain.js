//= wrapped

angular.module('streama').factory('Subtitle', function ($resource) {
  return $resource('NO CRUD', {}, {
    "setDefault":{
      method:"GET",
      url: 'subtitles/setDefault'
    },
    "getOpensubtitles": {
      method: "GET",
      url:  'subtitles/get',
      isArray: true
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
