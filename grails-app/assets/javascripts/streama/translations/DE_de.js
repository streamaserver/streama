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
			FIRST_TIME_HINT: 'Erstes mal hier? Versuche \'admin\' als Benutzername und Passwort.',
			SUBMIT: 'Login',
      SESSION_EXPIRED: 'Deine Sitzung ist abgelaufen. Bitte logge dich erneut ein.'
		},
		DASHBOARD: {
      HOME: 'Startseite',
      TV_SHOWS: 'Fernsehshows',
      MOVIES: 'Filme',
      MY_LIST:'Meine Liste',
			TITLE: 'Dashboard',
      TITLE_COUNTER_OF: 'von',
			NEW_RELEASES: 'Neuerscheinungen',
			CONTINUE_WATCHING: 'Weiterschauen',
			DISCOVER_SHOWS: 'Entdecke Serien',
			DISCOVER_MOVIES: 'Entdecke Filme',
			DISCOVER_OTHER_VIDEOS: 'Entdecke Videos',
			SORT: 'Sortierung:',
			SEARCH_BY_NAME: 'Nach Namen suchen...',
			FILTER_BY_TAG: 'Nach Tag filtern...',
      FILTER_BY_GENRE: 'Nach Genre filtern...',
			BROWSE_GENRES: 'Genres',
			LOOKING_AT_GENRE: 'Ausgewähltes Genre:',
			MARK_COMPLETED: 'Als gesehen Markieren',
			NO_TVSHOWS_FOUND: 'Keine Serien verfügbar',
      NO_WATCHLIST_FOUND: 'Noch keine Einträge',
			NO_MOVIES_FOUND: 'Keine Filme verfügbar',
      WATCHLIST: 'Beobachtungsliste'
    },
		VIDEO: {
			RELEASED: 'Veröffentlichung',
			IMDB: 'IMDB',
			RATING: 'Bewertungen',
      STATUS: 'Status',
      STATUS_VALUE: {
        'completed': 'Angeschaut',
        'viewing': 'Weiterschauen',
        'unviewed': 'Ungesehen'
      },
			VOTES: 'Stimmen',
			OVERVIEW: 'Zusammenfassung',
			GENRE: 'Genre',
			TRAILER: 'Trailer',
			SEASON: 'Staffel',
      NO_SUBTITLE: 'Keine Untertitel'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Mit dem erstellen einer neuen Sitzung bekommst du eine eindeutige ID, welche du dann an deine Freunde weiterleiten kannst um den Film mit ihnen synchron zu genießen!',
			FILE_MISSING: 'Es gibt ein Problem mit dem Video. Es scheint als sei die dazugehörig Videodatei entfernt worden.',
			CODEC_PROBLEM: 'Es gibt ein Problem beim hinzufügen des Videos zum Player. Dies ist meist ein Kodierungsproblem. Versuche deine Videos in einen HTML5 fähigen Codec zu konvertieren. Lösche die aktuelle Datei und füge die recodierte hinzu. Wenn der Codec korrekt ist, überprüfe die Error-Logs und die Servereinstellungen.',
			WRONG_BASEPATH: 'Dein Video wird mit einem falschen Basispfad eingefügt. Du besuchst diese Seite über "{{basePath}}". Vergewissere dich, ob der korrekte Basispfad in den Einstellungen hinterlegt ist, und du diesen beim nächsten mal besuchst.'
		},
		MANAGE_CONTENT: 'Inhalte verwalten',
    MANAGE_SUB_PROFILES: 'Profile verwalten',
    WHOS_WATCHING: 'Wer ist gerade aktiv?',
    ADD_SUB_PROFILE: 'Profil hinzufügen',
    EDIT_BTN: 'Bearbeiten',
    DONE_BTN: 'Fertig',
    SAVE_BTN: 'Speichern',
    CREATE_BTN: 'Erstellen',
    CANCEL_BTN: 'Abbrechen',
    DELETE_BTN: 'Löschen',
    ENTER_NAME: 'Namen eingeben',
    EDIT_PROFILE: 'Profil bearbeiten',
    CREATE_PROFILE: 'Profil erstellen',
		ADMIN: 'Administratorenbereich',
		HELP: 'Hilfe',
		HELP_FAQ: 'Hilfe / FAQ',
		PROFILE_SETTINGS: 'Profileinstellungen',
		LOGOUT: 'Ausloggen',
		CHANGE_PASSWORD: 'Passwort ändern',
	LANGUAGE_cn: 'Chinese/中文',
	LANGUAGE_en: 'English/Englisch',
    LANGUAGE_ru: 'Русский/Russisch',
    LANGUAGE_de: 'Deutsch',
    LANGUAGE_fr: 'Français/Französisch',
    LANGUAGE_es: 'Español/Spanisch',
    LANGUAGE_kr: '한국어/Koreanisch',
    LANGUAGE_nl: 'Nederlands/Niederländisch',
    LANGUAGE_pt: 'Português/Portugiesisch',
    LANGUAGE_ja: '日本語/Japanisch',
    LANGUAGE_it: 'Italiano/Italienisch',
    LANGUAGE_da: 'Dansk/Dänisch',
    LANGUAGE_ar: 'عربى/Arabisch',
    LANGUAGE_hu: 'Magyar/Ungarisch',
		LANGUAGE_sk: 'Slovensky/Slovak',
		PROFIlE: {
			USERNAME: 'Benutzername',
			FULL_NAME: 'Echter Name',
			LANGUAGE: 'Sprache',
			PAUSE_ON_CLICK: 'Videos durch klicken pausieren',
			FAVORITE_GENRES: 'Lieblingsgenres',
			SAVE: 'Profil speichern',
			OLD_PASS: 'Altes Passwort',
			NEW_PASS: 'Neues Passwort',
			NEW_PASS_PLACEHOLDER: 'Neues Passwort  (mindestens 6 Zeichen)',
			REPEAT_PASS: 'Passwort wiederholen',
			SAVE_PASS: 'Passwort speichern',
      AMOUNT_OF_MEDIA_ENTRIES: 'Aktivitäten auf dem Dashboard (Bevor per Button mehr geladen werden können)'
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
				TEXT: "Du kannst Videos hochladen indem du auf Inhalte verwalten klickst. Wähle aus, ob du eine Serie, einen Film oder ein Video hochladen möchtest. Klicke auf die relevante Option " +
				"auf der linken Seite. Dann klicke auf den Button rechts. Danach öffent sich die Suchleiste, in den du den Titel des Film eingibst. Dies kannst du auch manuell machen, falls keine Vorschläge geladen werden. " +
				"Im Anschluss kannst du das Video mit einer Datei verknüpfen oder eine Datei hochladen."

			},
			DELETE_VIDEO: {
				TITLE: 'Wie kann ich ein Video löschen?',
				TEXT: "Du kannst Videos in der Videoinformationsseite löschen, wenn du Inhalte verwalten anklickst und dann auf den roten Mülleimer. Video editieren anklicken und dann Video löschen" +
				" an zu klicken ist ein anderer Weg ein Video zu löschen. Du kannst auch den Filemanager benutzen, der sich im Inhalte Verwalten Menü befindet." +
				" Auch hier den roten Mülleimer verwenden."
			},
			VIDEO_FORMATS: {
				TITLE: 'Welche Video Formate werden unterstützt?',
				TEXT: "Streama unterstützt im Moment nur Formate für den HTML5 player. Du kannst testen ob deine Videodatei HTML5 kompatiebel ist, indem du diese in einem Browsertab/Browserfenster öffnest."
			},
			SUBTITLES: {
				TITLE: 'Wie kann ich Untertitel zu Videos hinzufügen?',
				TEXT: "Du kannst Untertitel in der Videosinformationsseite unter Inhalte verwalten. Du kannst dort Untertitel durch Drag and Drop hinzufügen. " +
				"Die Untertitel müssen nicht mehr konvertiert werden."
			},
			INVITE_USERS: {
				TITLE: 'Wie kann ich gehostete Videos mit Freunden teilen?',
				TEXT:"Du kannst deine Videos auf Streama teilen, indem du deine Freunde einlädst. Gehe zum Benutzermenü und klicke auf den Einladen-Button. Fülle das Formular aus" +
				" und wähle die Rollen. Benutzer mit der Rolle \"Admin\" können Benutzer und Einstellungen ändern. Benutzer mit der Rolle \"Content Manager\" können Inhalte verwalten." +
				" Deine Freunde werden durch eine E-Mail benachrichtigt, dass du sie eingeladen hast. Du kannst auch Videositzungen teilen (also Synchron gucken) indem du auf den Teilen Button des Videoplayers drückst und die Sitzungs-URL teilst."
			},
			BASE_URL: {
				TITLE: "Was ist die base URL und wie sollte sie konfiguriert werden?",
				TEXT: "Die base URL wird für Email Einladungen benutzt."
			},
			NOTIFICATIONS: {
				TITLE: "Was sind Benachrichtigungen?",
				TEXT: "Du kannst deine eingeladenen Freunde über hochgeladene Videos mit Benachrichtigungen informieren. Du kannst diese zur Benachrichtigungswarteschlange hinzufügen, indem du den Benachrichtigungsknopf in der Informationsseite drückst und im Benachrichtungsmenu auf Senden klickst."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Unterstützt der Player Tastaturkurzbefehle?",
				TEXT: "Ja. Pause/Weiter: Leertaste. Lautstärke: Pfeiltasten hoch oder runter. Videosprünge vor/zurück: Pfeiltasten rechts oder links. Langer Sprung:" +
				" Steuerung + Pfeiltasten links oder rechts. Vollbildschirm an/aus: Alt + Enter. Untertitel an/aus: S, Mute: M, Zurück zum vorherigen Bildschirm" +
				" : Enf oder Rücktaste."
			},
			FAVORITE_GENRES: {
				TITLE: "Wie beeinflussen die Lieblings-Genres des Nutzers Streama?",
				TEXT: "Noch gar nicht, es wird daran gearbeitet."
			},
			USEFUL_LINKS: {
				TITLE: "Nützliche links",
				TEXT: "Auch hieran wird gearbeitet."
			}
		}
	});
});
