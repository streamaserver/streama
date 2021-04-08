//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(function ($translateProvider) {
  $translateProvider.translations('en', {
    LOGIN: {
      TITLE: 'Please Login',
      USERNAME: 'E-mail',
      PASSWORD: 'Password',
      FIRST_TIME_HINT: 'Please login with your E-mail and created Password',
      SUBMIT: 'Login',
      SESSION_EXPIRED: 'Your session expired since your last activity. Please login again.'
    },
    DASHBOARD: {
      HOME: 'Home',
      TV_SHOWS: 'TV Shows',
      MOVIES: 'Movies',
      MY_LIST:'My list',
      TITLE: 'Dashboard',
      TITLE_COUNTER_OF: 'of',
      RECOMMENDATIONS: 'Recommendations for you',
      NEW_RELEASES: 'SHOWCASE',
      CONTINUE_WATCHING: 'Continue Watching',
      DISCOVER_SHOWS: 'Discover Shows',
      DISCOVER_MOVIES: 'Discover Movies',
      DISCOVER_OTHER_VIDEOS: 'Discover other videos',
      SORT: 'Sort:',
      SEARCH_BY_NAME: 'Search by Film Name...',
      SEARCH_BY_NAME2: 'Search by Student Name...',
      FILTER_BY_TAG: 'Filter by Specialty...',
      FILTER_BY_GENRE: 'Filter by Pipeline...',
      BROWSE_GENRES: 'Browse Pipelines',
      LOOKING_AT_GENRE: 'You\'re looking at the Pipeline:',
      MARK_COMPLETED: 'Mark completed',
      NO_TVSHOWS_FOUND: 'No Tv-Shows Available',
      NO_WATCHLIST_FOUND: 'Nothing here yet',
      NO_MOVIES_FOUND: 'No Movies Available',
      WATCHLIST: 'Watchlist'
    },
    VIDEO: {
      RELEASED: 'Released',
      IMDB: 'IMDB',
      RATING: 'Rating',
      STATUS: 'Status',
      STATUS_VALUE: {
        'completed': 'Completed',
        'viewing': 'Viewing',
        'unviewed': 'Unviewed'
      },
      VOTES: 'Votes',
      OVERVIEW: 'Overview',
      GENRE: 'Pipeline',
      TRAILER: 'Trailer',
      SEASON: 'Season',
      SUBTITLES: 'Subtitles',
      NO_SUBTITLE: 'No Subtitle',
      SUBTITLE_SIZE: 'Subtitle Sizes',
      VIDEO_FILES: 'Video Sources',
      UPNEXT: 'Up Next...'
    },

    MESSAGES: {
      SHARE_SOCKET: 'By creating a new session you will be redirected back to this player, but this time you will have a unique session ID in the url. Share this with your friends to have a synchronized watching experience with them!',
      FILE_MISSING: 'There is a problem with this content. It seems you removed the associated video file from it.',
      CODEC_PROBLEM: 'There seems to be a problem adding the video-file to the player. This is most likely due to a codec-problem. Try converting it to a compatible HTML5 codec, remove the currently attached file and re-add it. If the codecs are fine, check the error log of the server and the base URL in the settings.',
      WRONG_BASEPATH: 'Your video get\'s included using the wrong Base Path, but you are browsing the page via "{{basePath}}". Make sure you set the correct Base Path in the settings and that you are using it to browse the application.',
      FILE_IN_FS_NOT_FOUND: 'Your video cannot be found in any of the locations available to the application. Please check your settings and your file system to make sure that the files are accessible by the application.'
    },
    MANAGE_CONTENT: 'Manage Content',
    MANAGE_SUB_PROFILES: 'Manage profiles',
    WHOS_WATCHING: 'Position Profiles',
    ADD_SUB_PROFILE: 'Add Profile',
    EDIT_BTN: 'Edit',
    DONE_BTN: 'Done',
    SAVE_BTN: 'Save',
    CREATE_BTN: 'Create',
    CANCEL_BTN: 'Cancel',
    DELETE_BTN: 'Delete',
    ENTER_NAME: 'Enter name',
    EDIT_PROFILE: 'Edit profile',
    CREATE_PROFILE: 'Create profile',
    ADMIN: 'Admin',
    HELP: 'Help',
    HELP_FAQ: 'HELP / FAQ',
    PROFILE_SETTINGS: 'User Settings',
    LOGOUT: 'Logout',
    CHANGE_PASSWORD: 'Change Password',
    LANGUAGE_en: 'English',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russian',
    LANGUAGE_de: 'Deutsch/German',
    LANGUAGE_fr: 'Français/French',
    LANGUAGE_es: 'Español/Spanish',
    LANGUAGE_kr: '한국어/Korean',
    LANGUAGE_nl: 'Nederlands/Dutch',
    LANGUAGE_pt: 'Português/Portuguese',
    LANGUAGE_ja: '日本語/Japanese',
    LANGUAGE_it: 'Italiano/Italian',
    LANGUAGE_da: 'Dansk/Danish',
    LANGUAGE_ar: 'عربى/Arabic',
    LANGUAGE_hu: 'Magyar/Hungarian',
    PROFIlE: {
      USERNAME: 'Username',
      FULL_NAME: 'Full Name',
      LANGUAGE: 'Language',
      PAUSE_ON_CLICK: 'Pause Video on Click',
      FAVORITE_GENRES: 'Favorite Genres',
      AMOUNT_OF_MEDIA_ENTRIES: 'Amount of Videos on Dashboard (Before "Load More")',
      SAVE: 'Save Profile',
      PASS: 'Password',
      OLD_PASS: 'Old Password',
      NEW_PASS: 'New Password',
      NEW_PASS_PLACEHOLDER: 'New Password  (min. 6 Characters)',
      REPEAT_PASS: 'Repeat Password',
      PASS_ERROR_EMPTY: 'The password can not be empty',
      PASS_ERROR_LENGTH: 'The password must be at least 6 characters long',
      PASS_ERROR_REPEAT: 'The passwords need to match',
      SAVE_PASS: 'Set new password'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Most Recently Added',
      OLDEST_ADDED: 'First Added',
      NEWEST_RELEASED: 'Latest Release',
      OLDEST_RELEASED: 'Oldest Release',
      NEWEST_AIRED: 'Most Recently Aired',
      OLDEST_AIRED: 'Oldest Air-Date',
      NEWEST_REPORTED: 'Most Recently Reported',
      OLDEST_REPORTED: 'Oldest Report',
      NEWEST_UPDATED: 'Most Recently Updated',
      OLDEST_UPDATED: 'Oldest Update'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'How can I create a new Position-profile?',
        TEXT: " When you log into the Sheridan Industry Day app for the first time you will be brought to a " +
          " position profile page.  On this page you can create profiles for different positions that you wish " +
          " to find candidates for.  You can also return to the Position profiles page by selecting the Profile " +
          " Drop-down menu and selecting the “Manage profiles” option. "
      },
      DELETE_VIDEO: {
        TITLE: 'How can I filter and search the films?',
        TEXT: " To find the right candidates for the positions you are hiring for you can filter the student films by " +
          " Pipeline, Specialties and search by the Student-name or Film-name.  The search bars are found " +
          " at the top of the Student Films area of the sites home page. "
      },
      VIDEO_FORMATS: {
        TITLE: 'How can I create a Watchlist?',
        TEXT: " Each profile you create enables you to build and save a watchlist for films to be reviewed.  You" +
          " can add and subtract from the watchlist but suing the “+” and “–“ icons located at the bottom " +
          " left corner of the film's poster Image. "
      },
      SUBTITLES: {
        TITLE: 'How can I see the Film and Film-makers information?',
        TEXT: " To access the Film and Film-makers information select the “i” icon to the bottom right of the " +
          " film's poster image. "
      },
      INVITE_USERS: {
        TITLE: 'How can I contact a student filmmaker?',
        TEXT: " Near the bottom of the information card there are selectable social media icons, as well as a " +
          " portfolio link to direct you to the contact information of the student filmmaker. "
      },
      BASE_URL: {
        TITLE: 'Who can I contact for technical support?',
        TEXT: " For technical assistance please contact Banimationtechs@sheridancollege.ca "
      },
      NOTIFICATIONS: {
        TITLE: "What are notifications?",
        TEXT: "You can notify your invited friends about uploaded videos by sending them notification messages. You can send them by adding them your notification queue by clicking" +
          " Add Notification button which is in your video's information page and going to the Notifications menu and clicking Send Queue button."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Does the video player have shortcut keys?",
        TEXT: "Yes. Pause/unpause: space. Manage volume: arrow keys up or down. Skip video forward/backward: arrow keys left or right. Long skip:" +
          " control + arrow keys left or right. Fullscreen on/off: alt + enter. Subtitles on/off: S, Mute: M, Return to previous" +
          " screen: delete or backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "How do user's favorite genres affect Streama?",
        TEXT: "Coming soon..."
      },
      USEFUL_LINKS: {
        TITLE: "Useful links",
        TEXT: "Coming soon..."
      }
    }
  });
});
