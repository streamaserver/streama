
/*
streamaApp.controller('helpCtrl', [
	'$scope', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, apiService, $stateParams, modalService, $state, uploadService) {
}]);
*/


streamaApp.controller('helpCtrl', ['$anchorScroll', '$location', '$scope',
  function ($anchorScroll, $location, $scope) {

    //This function is copied and modified from the AngularJS documentation: https://docs.angularjs.org/api/ng/service/$anchorScroll
    $scope.gotoAnchor = function(x) {
      var newHash = 'question' + x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('question' + x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };

    /*
    $scope.questions = [
      {
        name: 'What is the meaning of life?',
        answer: 'First answer.'
      },
      {
        name: 'Second question?',
        answer: 'Second answer.'
      },
      {
        name: 'Third question?',
        answer: 'Third answer.'
      }
    ]
    */


  }
]);
