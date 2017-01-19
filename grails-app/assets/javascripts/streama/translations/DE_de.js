//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Translation by @ManuGithubSteam and @bastilimbach on 14/01/17
 */
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('de', {
		LOGIN: {
			TITLE: 'Bitte einloggen',
			USERNAME: 'Benutzername',
			PASSWORD: 'Passwort',
			FIRST_TIME_HINT: 'Erstes mal hier? Versuche \'admin\' für Benutzername und Passwort.',
			SUBMIT: 'Login'
		},
		DASHBOARD: {
			TITLE: 'Dashboard',
			NEW_RELEASES: 'Neuerscheinungen',
			CONTINUE_WATCHING: 'Weiterschauen',
			DISCOVER_SHOWS: 'Entdecke Serien',
			DISCOVER_MOVIES: 'Entdecke Filme',
			DISCOVER_OTHER_VIDEOS: 'Entdecke Videos',
			SORT: 'Sortiere:',
			SEARCH_BY_NAME: 'Nach Namen suchen...',
			FILTER_BY_TAG: 'Mit Tags filtern...',
			BROWSE_GENRES: 'Durchsuchen',
			LOOKING_AT_GENRE: 'Ausgewähltes Genre:',
			MARK_COMPLETED: 'Markiere als gesehen',
			NO_TVSHOWS_FOUND: 'Keine Serien verfügbar',
			NO_MOVIES_FOUND: 'Keine Filme verfügbar'
		},
		VIDEO: {
			RELEASED: 'Veröffentlicht',
			IMDB: 'IMDB',
			RATING: 'Bewertung',
			VOTES: 'Stimmen',
			OVERVIEW: 'Überblick',
			GENRE: 'Genre',
			TRAILER: 'Vorschau',
			SEASON: 'Staffel'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Mit dem erstellen einer neuen Sitzung bekommst de eine eindeutige ID, welche du dann an deine Freunde weiterleiten kannst um den Film mit ihnen synchron zu genießen!',
			FILE_MISSING: 'Es gibt ein Problem mit dem Video. Es scheint als sei die dazugehörig Videodatei entfernt worden.',
			CODEC_PROBLEM: 'Es gibt ein Problem beim hinzufügen des Videos zum Player. Dies ist meist ein Kodierungs-Problem. Versuche deine Videos in einen HTML5 fähigen Codec zu konvertieren. Lösche die aktuelle Datei und füge die recodierte hinzu. Wenn der Codec korrekt ist, überprüfe die Error-Logs und die Servereinstellungen.',
			WRONG_BASEPATH: 'Dein Video wird mit einem falschen Basispfad eingefügt. Du besuchst diese Seite über "{{basePath}}". Vergewissere dich, ob der korrekte Basispfad in den Einstellungen hinterlegt ist, und du diesen beim nächsten mal besuchst.'
		},
		MANAGE_CONTENT: 'Inhalte verwalten',
		ADMIN: 'Verwaltung',
		HELP: 'Hilfe',
		HELP_FAQ: 'HILFE / FAQ',
		PROFILE_SETTINGS: 'Profil Einstellungen',
		LOGOUT: 'Ausloggen',
		CHANGE_PASSWORD: 'Passwort ändern',
		LANGUAGE_en: 'English',
		LANGUAGE_de: 'Deutsch',
		LANGUAGE_fr: 'Französisch',
		LANGUAGE_es: 'Spanisch',
		LANGUAGE_kr: 'Koreanisch',
		LANGUAGE_nl: 'Niederländisch',
		LANGUAGE_pt: 'Portugiesisch',
		
		PROFIlE: {
			USERNAME: 'Benutzername',
			FULL_NAME: 'Vollständiger Name',
			LANGUAGE: 'Sprache',
			PAUSE_ON_CLICK: 'Pausiere Video bei Klick',
			FAVORITE_GENRES: 'Lieblings-Genres',
			SAVE: 'Profil speichern',
			OLD_PASS: 'Altes Passwort',
			NEW_PASS: 'Neues Passwort',
			NEW_PASS_PLACEHOLDER: 'Neues Passwort  (min. 6 Zeichen)',
			REPEAT_PASS: 'Passwort wiederholen',
			SAVE_PASS: 'Neues Passwort setzen'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Zuletzt hinzugefügt',
			OLDEST_ADDED: 'Zuerst hinzugefügt',
			NEWEST_RELEASED: 'Neuste Veröffentlichung',
			OLDEST_RELEASED: 'Älteste Veröffentlichung',
			NEWEST_AIRED: 'Zuletzt ausgestrahlt',
			OLDEST_AIRED: 'Zuerst ausgestrahlt'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Wie kann ich ein Video hochladen?',
				TEXT: "Du kannst Videos hochladen indem du auf Inhalte verwalten klickst. Wähle aus, ob du eine Serie, einen Film oder ein Video hochladen möchtest. Klicke auf die relevante Option" +
				"auf der linken Seite. Dann klicke auf den Button rechts. Danach öffent sich die Suchleiste, in den du den Titel des Film eingibst. Dies kannst du auch manuell machen, falls keine Vorschläge kommen." +
				"Im Anschluss kannst du das Video mit einer Datei verknüpfen oder eine Datei hochladen."

			},
			DELETE_VIDEO: {
				TITLE: 'Wie kann ich ein Video löschen?',
				TEXT: "Du kannst Videos in der Video Informationsseite löschen, wenn du Inhalte verwalten anklickst und dann auf den roten Mülleimer. Video editieren anklicken und dann Video löschen" +
				" an zu klicken ist ein anderer Weg ein Video zu löschen. Du kannst auch den Filemanager benutzen, der sich im Inhalte Verwalten Menü befindet." +
				" Auch hier den roten Mülleimer verwenden."
			},
			VIDEO_FORMATS: {
				TITLE: 'Welche Video Formate werden unterstützt?',
				TEXT: "Streama unterstützt im Moment nur Formate für den HTML5 player. Du kannst testen ob deine Videodatei HTML5 kompatiebel ist, indem du diese in ein/en leeren " +
				" Browsertab/fenster ziehst und fallen lässt."
			},
			SUBTITLES: {
				TITLE: 'Wie kann ich Untertitel zu Videos hinzufügen?',
				TEXT: "Du kannst Untetertitel in der Videos Infromationsseite unter Inhalte verwalten. Du kannst dort Untetitel durch Drag and Drop hinzufügen." +
				"Die Untertitel müssen nicht mehr konvertiert werden."
			},
			INVITE_USERS: {
				TITLE: 'Wie kann ich Freunde einladen um meine gehosteten Videos an zu schauen?',
				TEXT:"Du kannst deine Videos auf Streama teilen, indem du deine Frende einlädst. Gehe zum Benutzer Menu und klicke auf den Einladen Button. Fülle das Formular aus" +
				" und wähle die Rollen. Benutzer mit der Rolle Admin können Benutzer und Einstellungen ändern. Benutzer mit der Rolle role Content Manager können Inhalte verwalten." +
				" Deine Freunde werden über E-Mail benachrichtigt, dass du Sie eingeladen hast. Du kannst auch Videositzung teilen indem du auf den Teilen Button des Videoplayers drückst und die Sitzungs URL teilst."
			},
			BASE_URL: {
				TITLE: "Was ist die basis URL und wie sollte Sie konfiguriert werden?",
				TEXT: "Die base URL wird für Email Einladungen benutzt."
			},
			NOTIFICATIONS: {
				TITLE: "Was sind Benachrichtigungen?",
				TEXT: "Du kannst deine eingeladenen Freunde über hochgeladene Videos mit Benachrichtigungen informieren. Du kannst diese zur Benachrichtigungswarteschlange hinzufügen, indem du den Benachrichtigungsknopf in der Informationsseite drücken und im Benachrichtungsmenu auf Senden klicken."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Hat der Player Tastaturkurzbefehle?",
				TEXT: "Ja. Pause/Weiter: Leertaste. Lautstärke: Pfeiltasten hoch oder runter. Videospünge vor/zurück: Pfeiltasten rechts oder links. Langer Sprung:" +
				" Steuerung + Pfeiltasten links oder rechts. Vollbildschirm an/aus: Alt + Enter. Untertitel an/aus: S, Mute: M, Zurück zum vohergehenden Bildschirm" +
				" : Enf oder Rücktaste."
			},
			FAVORITE_GENRES: {
				TITLE: "Wie beeinflussen die Lieblings-Genres des Nutzers Streama?",
				TEXT: "Kommt bald..."
			},
			USEFUL_LINKS: {
				TITLE: "Nützliche links",
				TEXT: "Kommt bald..."
			}
		}
	});
});
