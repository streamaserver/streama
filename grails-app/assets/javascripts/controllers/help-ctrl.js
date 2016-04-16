
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
    $scope.questions = [
      {
        id: 1,
        name: "What's an API-key and why do I need one?",
        answer: ''
      },
      {
        id: 2,
        name: 'Which video formats are supported?',
        answer: ''
      },
      {
        id: 3,
        name: 'How should I configure the base URL?',
        answer: ''
      },
      {
        id: 4,
        name: 'How does the video sharing work?',
        answer: ''
      },
      {
        id: 5,
        name: "What are the video player's shortcut keys?",
        answer: ''
      },
      {
        id: 6,
        name: 'What are the notifications?',
        answer: ''
      },
      {
        id: 7,
        name: 'How can I add Subtitles to videos?',
        answer: ''
      },
      {
        id: 8,
        name: 'Useful links',
        answer: ""
      }

    ]



  }
]);
