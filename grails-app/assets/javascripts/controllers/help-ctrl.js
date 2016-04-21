
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
        name: 'How can I upload a video?',
        answer: "You can upload videos by going to Manage Content menu. Choose if you want to upload a Movie, TV show or Other video. Click the relevant sub-menu option" +
        " on the vertical navigation bar on the left side of the screen. You can upload a video by clicking the Create new movie/TV show/other video button or by typing" +
        " the name of the video you want to upload to the search bar and selecting the relevant movie from search results. After that, you can choose to fill in the video's" +
        " information either manually or loading its information from TheMovieDB. After that, you can upload the relevant video and subtitle files by clicking Manage Files button."
      },
      {
        id: 2,
        name: 'How can I delete a video?',
        answer: "You can delete a video by going to the video's information page and clicking Manage Files and selecting the red trash can icon. Clicking Edit movie and selecting" +
        " Delete movie is another way to do it. You can also use the File Manager which is in the Manage Content menu. You can see all the files you have uploaded there. Click" +
        " the red trash can icon to delete a file."
      },
      {
        id: 3,
        name: 'Which video formats are supported?',
        answer: "Streama supports currently only the video file formats supported by HTML5 player. You can test if your video file is HTML5 player compatible by dragging and dropping" +
        " your file to an empty tab on your browser."
      },
      {
        id: 4,
        name: 'How can I add subtitles to videos?',
        answer: "You can add subtitles to videos by clicking Manage Files button which is in the video's information page. You can drag and drop subtitle files there." +
        " Please note that the subtitles must be .vtt format. You can use the website which link is in the Manage Files popup to convert .srt type subtitle files to .vtt."
      },
      {
        id: 5,
        name: "How can I invite friends to watch my hosted videos?",
        answer: "You can share your videos with your friends by inviting them to use your hosted Streama. Go to the Users menu and click Invite user button. Fill in the invite form and" +
        " select the invitee's role(s). Users with the role Admin can edit Users & Settings. Users with the role Content Manager can edit content. Your friend will be notified about" +
        " the invitation via email. You can also share video sessions with your friends by clicking the video player's share button and linking the session URL to them."

      },
      {
        id: 6,
        name: "What's the base URL and how should I configure it?",
        answer: "The Base-URL is used for the videos and the link in the invitation-email."
      },
      {
        id: 7,
        name: "What are notifications?",
        answer: "You can notify your invited friends by creating notification messages about uploaded videos."
      },
      {
        id: 8,
        name: 'Does the video player have shortcut keys?',
        answer: "Yes. Pause/unpause: space. Manage volume: arrow keys up or down. Skip video forward/backward: arrow keys left or right. Long skip:" +
        " control + arrow keys left or right. Fullscreen on/off: alt + enter. Subtitles on/off: S, Mute: M, Return to previous" +
        " screen: delete or backspace."
      },
      {
        id: 9,
        name: "How do user's favourite genres affect Streama?",
        answer: ""
      },
      {
        id: 10,
        name: 'Useful links',
        answer: ""
      }

    ]



  }
]);
