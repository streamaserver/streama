//= wrapped

angular.module('streama').directive('streamaProgressBar', function () {
  return {
    restrict: 'E',
    templateUrl: '/streama/directive--streama-progress-bar.htm',
    scope: {
      video: '=',
      hideTime: '@'
    },
    link: function ($scope, $elem, $attrs) {
      // $scope.videoObject = angular.merge({}, $scope.video);
      // $scope.videoObject.currentPlayTime = $scope.video.currentPlayTime || $scope.runtime;
      // $scope.videoObject.runtime = $scope.video.runtime || $scope.total;
    }
  }
});
