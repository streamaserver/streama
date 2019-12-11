//= wrapped


angular.module('streama')
  .directive('streamaHeaderDirective', streamaHeaderDirective);

function streamaHeaderDirective($window) {
  return {
    restrict: 'A',
    scope: {},
    link: function ($scope, $elem, $attrs) {
      angular.element($window).bind('scroll', function () {
        if($window.pageYOffset > 0){
          $elem.css({'background': 'rgb(20, 20, 20)'});
        }else{
          $elem.css({'background': 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'});
        }
      });
    }
  }
};
