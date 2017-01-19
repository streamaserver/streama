/**
 * Created by antonia on 14/05/16.
 * Translated by Steyn Guelen on 15/05/16.
 */
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('nl', {
		LOGIN: {
			TITLE: 'Graag inloggen',
			USERNAME: 'Gebruikersnaam',
			PASSWORD: 'Wachtwoord',
			FIRST_TIME_HINT: 'Eerste keer inloggen? Probeer \'admin\' voor gebruikersnaam en wachtwoord.',
			SUBMIT: 'Login',
		},
		DASHBOARD: {
			TITLE: 'Dashboard',
			NEW_RELEASES: 'Nieuw uitgebracht',
			CONTINUE_WATCHING: 'Verder kijken',
			DISCOVER_SHOWS: 'Ontdek series',
			DISCOVER_MOVIES: 'Ontdek films',
			DISCOVER_OTHER_VIDEOS: 'Ontdek andere videos.',
			SORT: 'Sorteer op',
			SEARCH_BY_NAME: 'Zoek met naam...',
			FILTER_BY_TAG: 'Filter op tag...',
			BROWSE_GENRES: 'Verken',
			LOOKING_AT_GENRE: 'Je zoekt op genre',
			MARK_COMPLETED: 'Markeer als bekeken',
			NO_TVSHOWS_FOUND: 'Geen series beschikbaar',
			NO_MOVIES_FOUND: 'Geen films beschikbaar',
		},
		VIDEO: {
			RELEASED: 'Uitgebracht op',
			IMDB: 'IMDB',
			RATING: 'Waardering',
			VOTES: 'Aantal stemmen',
			OVERVIEW: 'Overzicht',
			GENRE: 'Genre',
			TRAILER: 'Trailer',
			SEASON: 'Seizoen',
		},

		MESSAGES: {
			SHARE_SOCKET: 'By creating a new session you will be redirected back to this player, but this time you will have a unique session ID in the url. Share this with your friends to have a syncronized watching experience with them!',
			FILE_MISSING: 'Er is een probleem met deze video. Het lijkt erop dat het bestand verwijderd is. Deel dit met je vrienden om een tegelijkertijd te kijken!',
			CODEC_PROBLEM: 'Het lijkt er op dat er een probleem is met het toevoegen van het bestand. Dit komt waarschijnlijk door een verkeerde codec. Converteer het bestand naar een HTML5-codec, verwijder het huidige bestand en probeer het nieuwe bestand opnieuw toe te voegen. Is de codec wel geschikt? Check de server log en Base URL.',
			WRONG_BASEPATH: 'You video get\'s included using the wrong Base Path, but you are browsing the page via "{{basePath}}". Make sure you set the correct Base Path in the settings and that you are using it to browse the application.',
		},
		MANAGE_CONTENT: 'Beheer content',
		ADMIN: 'Administrator',
		HELP: 'Help',
		HELP_FAQ: 'HELP/FAQ',
		PROFILE_SETTINGS: 'Profiel instellingen',
		LOGOUT: 'Uitloggen',
		CHANGE_PASSWORD: 'Wachtwoord wijzigen',
		LANGUAGE_en: 'Engels',
		LANGUAGE_de: 'Duits',
		LANGUAGE_fr: 'Frans',
		LANGUAGE_es: 'Spaans',
		LANGUAGE_kr: 'Koreaans',
		LANGUAGE_nl: 'Nederlands',
		LANGUAGE_pt: 'Portugees',
		
		PROFIlE: {
			USERNAME: 'Gebruikersnaam',
			FULL_NAME: 'Volledige naam',
			LANGUAGE: 'Taal',
			PAUSE_ON_CLICK: 'Pauzeer video met klik',
			FAVORITE_GENRES: 'Favoriete Genres',
			SAVE: 'Opslaan',
			OLD_PASS: 'Oud wachtwoord',
			NEW_PASS: 'Nieuw wachtwoord',
			NEW_PASS_PLACEHOLDER: 'Nieuw wachtwoord (minimaal 6 karakters',
			REPEAT_PASS: 'Herhaal wachtwoord',
			SAVE_PASS: 'Opslaan',
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Meest recent toegevoegd',
			OLDEST_ADDED: 'Als eerste toegevoegd',
			NEWEST_RELEASED: 'Laatst uitgebracht',
			OLDEST_RELEASED: 'Als eerste uitgebracht',
			NEWEST_AIRED: 'Meest recent uitgezonden',
			OLDEST_AIRED: 'Als eerste uitgezonden',
		}
	});
});
