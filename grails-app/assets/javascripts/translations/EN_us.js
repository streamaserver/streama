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
			SUBMIT: 'Login',
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
			NO_MOVIES_FOUND: 'No Movies Available',
		},
		VIDEO: {
			RELEASED: 'Released',
			IMDB: 'IMDB',
			RATING: 'Rating',
			VOTES: 'Votes',
			OVERVIEW: 'Overview',
			GENRE: 'Genre',
			TRAILER: 'Trailer',
			SEASON: 'Season',
		},

		MESSAGES: {
			SHARE_SOCKET: 'By creating a new session you will be redirected back to this player, but this time you will have a unique session ID in the url. Share this with your friends to have a syncronized watching experience with them!',
			FILE_MISSING: 'There is a problem with this content. It seems you removed the associated video file from it.. Share this with your friends to have a syncronized watching experience with them!',
			CODEC_PROBLEM: 'There seems to be a problem adding the video-file to the player. This is most likely due to a codec-problem. Try converting it to a compatible HTML5 codec, remove the currently attached file and re-add it. If the codecs are fine, check the error log of the server and the base URL in the settings.',
			WRONG_BASEPATH: 'You video get\'s included using the wrong Base Path, but you are browsing the page via "{{basePath}}". Make sure you set the correct Base Path in the settings and that you are using it to browse the application.',
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
		PROFIlE: {
			USERNAME: 'Username',
			FULL_NAME: 'Full Name',
			LANGUAGE: 'Language',
			PAUSE_ON_CLICK: 'Pause Video on Click',
			FAVORITE_GENRES: 'Favorite Genres',
			SAVE: 'Save Profile',
			OLD_PASS: 'Old Password',
			NEW_PASS: 'New Password',
			NEW_PASS_PLACEHOLDER: 'New Password  (min. 6 Characters)',
			REPEAT_PASS: 'Repeat Password',
			SAVE_PASS: 'Set New Password',
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
		}
	});
});

