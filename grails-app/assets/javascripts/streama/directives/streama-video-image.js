//= wrapped

angular.module('streama').directive('streamaVideoImage', function (uploadService, modalService, apiService, $stateParams) {
  return {
    restrict: 'E',
    templateUrl: '/streama/directive--streama-video-image.htm',
    scope: {
      video: '=',
      type: '@',
      size: '@'
    },
    link: function ($scope, $elem, $attrs) {

    }
  }
});
