
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

    //Array of question objects. Help page contents are constructed by reading these.
    $scope.questions = [ 'UPLOAD_VIDEO', 'DELETE_VIDEO', 'VIDEO_FORMATS', 'SUBTITLES', 'INVITE_USERS', 'BASE_URL',
      'NOTIFICATIONS', 'VIDEO_PLAYER_SHORTCUTS', 'FAVORITE_GENRES', 'USEFUL_LINKS']

  }
]);
