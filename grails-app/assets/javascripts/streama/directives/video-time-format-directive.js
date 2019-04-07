'use strict';

/** Directive for formatting from mm:ss to int and back */
angular.module('streama').directive("videoTimeFormat", function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
      var _timeInSeconds;

      //view to model
      ngModelController.$parsers.push(function(data) {
        var timeSegments = data.split(":");
        var hours = timeSegments.length >= 3 ? timeSegments[timeSegments.length - 3]: 0;
        var minutes = timeSegments.length >= 2 ? timeSegments[timeSegments.length - 2] : 0;
        var seconds = timeSegments[timeSegments.length - 1];
        _timeInSeconds = hours*3600 + minutes*60 + seconds*1;
        return _timeInSeconds;
      });


      //model to view
      ngModelController.$formatters.push(function(timeInSeconds) {
        if(timeInSeconds == undefined)
        {
          return '';
        }
        return getViewValue(timeInSeconds);
      });


      function getViewValue(timeInSeconds) {
        _timeInSeconds = timeInSeconds;
        var remainingTime = timeInSeconds;
        var hours = Math.floor(timeInSeconds / 3600);
        remainingTime = remainingTime % 3600;
        var minutes = Math.floor(remainingTime / 60);
        var seconds = remainingTime % 60;
        var viewValue = _.padStart(hours, 2, '0')  + ':' + _.padStart(minutes, 2, '0') + ':' + _.padStart(seconds, 2, '0');
        return viewValue;
      }

      element.blur(function (event) {
        ngModelController.$processModelValue();
      });
    }
  };
});
