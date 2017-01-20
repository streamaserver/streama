//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('en', {
		LOGIN: {
			TITLE: 'Please Login',
			USERNAME: 'Username',
			PASSWORD: 'Password',
			FIRST_TIME_HINT: 'First time logging in? Try \'admin\' for both fields.',
			SUBMIT: 'Login'
		},
		DASHBOARD: {
			TITLE: 'Dashboard',
			NEW_RELEASES: 'New Releases',
			CONTINUE_WATCHING: 'Continue Watching',
			DISCOVER_SHOWS: 'Discover Shows',
			DISCOVER_MOVIES: 'Discover Movies',
			DISCOVER_OTHER_VIDEOS: 'Discover other videos',
			SORT: 'Sort:',
			SEARCH_BY_NAME: 'Search by Name...',
			FILTER_BY_TAG: 'Filter by Tag...',
			BROWSE_GENRES: 'Browse',
			LOOKING_AT_GENRE: 'You\'re looking at the genre:',
			MARK_COMPLETED: 'Mark completed',
			NO_TVSHOWS_FOUND: 'No Tv-Shows Available',
			NO_MOVIES_FOUND: 'No Movies Available'
		},
		VIDEO: {
			RELEASED: 'Released',
			IMDB: 'IMDB',
			RATING: 'Rating',
			VOTES: 'Votes',
			OVERVIEW: 'Overview',
			GENRE: 'Genre',
			TRAILER: 'Trailer',
			SEASON: 'Season'
		},

		MESSAGES: {
			SHARE_SOCKET: 'By creating a new session you will be redirected back to this player, but this time you will have a unique session ID in the url. Share this with your friends to have a synchronized watching experience with them!',
			FILE_MISSING: 'There is a problem with this content. It seems you removed the associated video file from it.. Share this with your friends to have a synchronized watching experience with them!',
			CODEC_PROBLEM: 'There seems to be a problem adding the video-file to the player. This is most likely due to a codec-problem. Try converting it to a compatible HTML5 codec, remove the currently attached file and re-add it. If the codecs are fine, check the error log of the server and the base URL in the settings.',
			WRONG_BASEPATH: 'You video get\'s included using the wrong Base Path, but you are browsing the page via "{{basePath}}". Make sure you set the correct Base Path in the settings and that you are using it to browse the application.',
			FILE_IN_FS_NOT_FOUND: 'Your video cannot be found in any of the locations available to the application. Please check your settings and your file system to make sure that the files are accessible by the application.'
		},
		MANAGE_CONTENT: 'Manage Content',
		ADMIN: 'Admin',
		HELP: 'Help',
		HELP_FAQ: 'HELP / FAQ',
		PROFILE_SETTINGS: 'Profile Settings',
		LOGOUT: 'Logout',
		CHANGE_PASSWORD: 'Change Password',
		LANGUAGE_en: 'English',
		LANGUAGE_de: 'German',
    	LANGUAGE_fr: 'French',
		LANGUAGE_es: 'Spanish',
		LANGUAGE_kr: 'Korean',
		LANGUAGE_nl: 'Dutch',
		LANGUAGE_pt: 'Portuguese',
		
		PROFIlE: {
			USERNAME: 'Username',
			FULL_NAME: 'Full Name',
			LANGUAGE: 'Language',
			PAUSE_ON_CLICK: 'Pause Video on Click',
			FAVORITE_GENRES: 'Favorite Genres',
			SAVE: 'Save Profile',
			PASS: 'Password',
			OLD_PASS: 'Old Password',
			NEW_PASS: 'New Password',
			NEW_PASS_PLACEHOLDER: 'New Password  (min. 6 Characters)',
			REPEAT_PASS: 'Repeat Password',
			PASS_ERROR_EMPTY: 'The password can not be empty',
			PASS_ERROR_LENGTH: 'The password must be at least 6 characters long',
			PASS_ERROR_REPEAT: 'The passwords need to match'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Most Recently Added',
			OLDEST_ADDED: 'First Added',
			NEWEST_RELEASED: 'Latest Release',
			OLDEST_RELEASED: 'Oldest Release',
			NEWEST_AIRED: 'Most Recently Aired',
			OLDEST_AIRED: 'Oldest Air-Date'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'How can I upload a video?',
				TEXT: "You can upload videos by going to Manage Content menu. Choose if you want to upload a Movie, TV show or Other video. Click the relevant sub-menu option" +
				" on the vertical navigation bar on the left side of the screen. You can upload a video by clicking the Create New Movie/TV Show/Other Video button or by typing" +
				" the name of the video you want to upload to the search bar and selecting the relevant movie from search results. After that, you can choose to fill in the video's" +
				" information either manually or loading its information from TheMovieDB. After that, you can upload the video and subtitle files by clicking Manage Files button."
			},
			DELETE_VIDEO: {
				TITLE: 'How can I delete a video?',
				TEXT: "You can delete a video by going to the video's information page and clicking Manage Files and selecting the red trash can icon. Clicking Edit Movie and selecting" +
				" Delete Movie is another way to do it. You can also use the File Manager which is in the Manage Content menu. You can see all the files you have uploaded there. Click" +
				" the red trash can icon to delete a file."
			},
			VIDEO_FORMATS: {
				TITLE: 'Which video formats are supported?',
				TEXT: "Streama supports currently only the video file formats supported by HTML5 player. You can test if your video file is HTML5 player compatible by dragging and dropping" +
				" your file to an empty tab on your browser."
			},
			SUBTITLES: {
				TITLE: 'How can I add subtitles to videos?',
				TEXT: "You can add subtitles to videos by clicking Manage Files button which is in the video's information page. You can drag and drop subtitle files there." +
				" Previously you had to manually convert them into a compatible file format, but not anymore! Now the application handles that for you."
			},
			INVITE_USERS: {
				TITLE: 'How can I invite friends to watch my hosted videos?',
				TEXT:"You can share your videos with your friends by inviting them to use your hosted Streama. Go to the Users menu and click Invite User button. Fill in the invite form and" +
				" select the invitee's role(s). Users with the role Admin can edit Users & Settings. Users with the role Content Manager can edit content. Your friend will be notified about" +
				" the invitation via email. You can also share video sessions with your friends by clicking the video player's Share button and linking the session URL to them."
			},
			BASE_URL: {
				TITLE: "What's the base URL and how should I configure it?",
				TEXT: "The Base-URL is used for the videos and the link in the invitation-email."
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
