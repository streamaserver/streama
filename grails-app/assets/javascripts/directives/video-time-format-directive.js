'use strict';

/** Directive for formatting from mm:ss to int and back */
streamaApp.directive("videoTimeFormat", function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
      //view to model
      ngModelController.$parsers.push(function(data) {
        return data.split(":")[0]*60+data.split(":")[1]*1;
      });
      //model to view
      ngModelController.$formatters.push(function(data) {
        if(data == undefined)
        {
          return '';
        }
        var seconds = data % 60;
        var minutes = (data-seconds) / 60;
        return minutes+':'+seconds;
      });
    }
  };
});
