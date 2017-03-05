//= wrapped
/**
 * Created by Anderzzenn on 05/03/17.
 */
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('da', {
		LOGIN: {
			TITLE: 'Log Ind',
			USERNAME: 'Brugernavn',
			PASSWORD: 'Kodeord',
			FIRST_TIME_HINT: 'Første gang du logger ind? Prøv \'admin\' i begge felter.',
			SUBMIT: 'Log Ind'
		},
		DASHBOARD: {
			TITLE: 'Betjeningspanel',
			RECOMMENDATIONS: 'Foreslået til dig',
			NEW_RELEASES: 'Nye Udgivelser',
			CONTINUE_WATCHING: 'Se videre',
			DISCOVER_SHOWS: 'Opdag Serier',
			DISCOVER_MOVIES: 'Opdag Film',
			DISCOVER_OTHER_VIDEOS: 'Opdag Andre Videoer',
			SORT: 'Sorter:',
			SEARCH_BY_NAME: 'Søg via Navn...',
			FILTER_BY_TAG: 'Filtrer via Tag...',
			BROWSE_GENRES: 'Gennemse',
			LOOKING_AT_GENRE: 'Du ser på genren:',
			MARK_COMPLETED: 'Marker færdigt',
			NO_TVSHOWS_FOUND: 'Ingen TV-Serier tilgængelig',
			NO_MOVIES_FOUND: 'Ingen Film tilgængelig'
		},
		VIDEO: {
			RELEASED: 'Udgivet',
			IMDB: 'IMDB',
			RATING: 'Bedømmelse',
			VOTES: 'Stemmer',
			OVERVIEW: 'Oversigt',
			GENRE: 'Genre',
			TRAILER: 'Trailer',
			SEASON: 'Sæson'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Ved at lave en ny session vil du blive sendt tilbage til denne afspiller, men denne gang vil du have et unikt session ID i linket. Del dette med dine venner for at have en synkroniseret film oplevelse med dem!',
			FILE_MISSING: 'Der er et problem med dette indhold. Det virker til du har slettet video filen associeret med indholdet.',
			CODEC_PROBLEM: 'Der virker til at være et problem med at tilføje video filen til afspilleren. Det er mest sandsynligt pågrund af et kodeks problem. Prøv at konvertere til et HTML5 kompitabelt kodeks, fjern den nuværende fil og tilføj den igen. Hvis kodekset er korrekt, tjek serverns fejl log og Base URL i indstillingerne.',
			WRONG_BASEPATH: 'Din video bliver inkluderet med det forkerte base path, men du browser siden via "{{basePath}}. Vær sikker på du har sat den korrekte Base Path i indstillinger og at to bruger det til at browse applikationen.',
			FILE_IN_FS_NOT_FOUND: 'Din video kan ikke blive fundet i nogle af applikationens tilgænlige lokationer. Venligst tjek dine indstillger og dit fil system for at være sikker på at applikationen kan få adgang til filerne.'
		},
		MANAGE_CONTENT: 'Administrer Indhold',
		ADMIN: 'Admin',
		HELP: 'Hjælp',
		HELP_FAQ: 'Hjælp / FAQ',
		PROFILE_SETTINGS: 'Profil Indstillinger',
		LOGOUT: 'Log Ud',
		CHANGE_PASSWORD: 'Skift Kodeord',
		LANGUAGE_en: 'Engelsk',
		LANGUAGE_de: 'Tysk',
    	LANGUAGE_fr: 'Fransk',
		LANGUAGE_es: 'Spansk',
		LANGUAGE_kr: 'Koreansk',
		LANGUAGE_nl: 'Hollandsk',
		LANGUAGE_pt: 'Portugisisk',
    LANGUAGE_da: 'Dansk',

		PROFIlE: {
			USERNAME: 'Brugernavn',
			FULL_NAME: 'Fulde Navn',
			LANGUAGE: 'Sprog',
			PAUSE_ON_CLICK: 'Pause videon når der klikkes',
			FAVORITE_GENRES: 'Favorit Genrer',
			SAVE: 'Gem Profil',
			PASS: 'Kodeord',
			OLD_PASS: 'Gammelt Kodeord',
			NEW_PASS: 'Nye Kodeord',
			NEW_PASS_PLACEHOLDER: 'Nye Kodeord  (min. 6 Tegn)',
			REPEAT_PASS: 'Gentag Kodeord',
			PASS_ERROR_EMPTY: 'Kodeordet kan ikke være tomt',
			PASS_ERROR_LENGTH: 'Kodeordet skal være mindst 6 tegn langt',
			PASS_ERROR_REPEAT: 'Kodeordene skal være ens.'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Senest Tilføjet',
			OLDEST_ADDED: 'Tilføjet Først',
			NEWEST_RELEASED: 'Nyeste Udgivelse',
			OLDEST_RELEASED: 'Ældste Udgivelse',
			NEWEST_AIRED: 'Senest Udsendt',
			OLDEST_AIRED: 'Ældste Udsendt'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Hvordan uploader jeg en video?',
				TEXT: "Du kan uploade videoer ved at gå til Administrer Indhold menuen. Vælg om du vil uploade en Film, TV Serie eller en Anden video. Klik på den relevante undermenu mulighed" +
				"på den lodrette navigations bar på venstre side af skærmen. Du kan uploade en video ved at trykke på Opret Ny Film/TV Serie/Andre Film knappen eller ved at skrive" +
				" navnet på videoen du vil uploade til søge feltet og vælg the relevante film fra søge resultaterne. Efter det, kan du vælge at udfylde videons information" +
        " manuelt eller ved at indlæse dens information fra TheMovieDB. Efter det, kan du uploade video og undertekst filerne ved at trykke Administrer Filer knappen."
			},
			DELETE_VIDEO: {
				TITLE: 'Hvordan sletter jeg en video?',
				TEXT: "Du kan slette en video ved at gå til videoens informations side og trykke på Administrer Filer og så trykke på det røde skraldespands ikon. Du kan også trykke på" +
        " Rediger Film og så trykke på Slet Film. Du kan også bruge Filhåndtering som ligger i Administrer Indhold menuen. Du kan se alle filerne der er blevet upload der. Tryk" +
        " på det røde skraldespands ikon for at slette en fil."
			},
			VIDEO_FORMATS: {
				TITLE: 'Hvilke video typer er understøttet?',
				TEXT: "Lige nu understøtter Steama kun video typer som er understøttet af HTML5 spilleren. Du kan teste om din video fil er HTML5 kompitabel ved at trække og slippe" +
        " din fil på en tom fane i din browser."
			},
			SUBTITLES: {
				TITLE: 'Hvordan tilføjer jeg undertekster til videoer?',
				TEXT: "Du kan tilføje undertekster til videoer ved at trykke på Administrer Filer knappen som er under videoens informations side. Du kan trække og slippe" +
        " undertekst filer der. " +
        "Tidligere skulle du manuelt konvertere dem til en kompitabel fil format. Men det skal du ikke længere! Nu gør applikationen det for dig."
			},
			INVITE_USERS: {
				TITLE: 'Hvordan kan jeg invitere venner til at se mine hostede videoer?',
				TEXT:"Du kan dele dine videoer med dine venner ved at invitere dem til dit hostede Streama. Gå til Bruger menuen og klik på Inviter Bruger knappen. Udfyld invitations formen" +
        " og vælg den inviteredes rolle(r). Brugere med Admin rollen kan redigere Brugere & Indstillinger. Brugere med rollen Indholds Manager kan redigere indhold. Dine venner vil" +
        " få invitationen via email. Du kan også dele video sessioner med dine venner ved at trykke på video afspilerens Del knap og så sende dem session linket til dem."
			},
			BASE_URL: {
				TITLE: "Hvad er base URL og hvordan konfigurer jeg det?" +
        "What's the base URL and how should I configure it?",
				TEXT: "Base-URL bliver brugt til videoerne og linket i invitation-emails."
			},
			NOTIFICATIONS: {
				TITLE: "Hvad er notifikationer?",
				TEXT: "Du kan notificere dine inviterede venner omkring uploadede videoer ved at sende dem en notifikations meddelelse. Du kan sende dem ved at tilføje dem til din notifikations" +
        "kø ved at trykke på Tilføj Notifikation knappen hvilket er under din videos informations side og gå til Notifikations menuen og trykke på Send Queue knappen."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Har video afspilleren nogle genvejs taster?",
				TEXT: "Ja. Pause/Unpause: Mellemrum. Juster lyd: piletasterne op eller ned. Spol frem og tilbage i videoen: piletasterne venstre eller højere." +
        " Langt spring: kontrol + piletasterne venstre eller højere. Fuldskærm fra/til: Alt + Enter. Undertekster til/fra: S, Slå lyd fra: M," +
        " Gå tilbage til den tidligere skærm: Delete eller tilbagetasten"
			},
			FAVORITE_GENRES: {
				TITLE: "Hvordan påvirker en brugers favorit genrer Streama?",
				TEXT: "Kommer snart..."
			},
			USEFUL_LINKS: {
				TITLE: "Brugfulde links",
				TEXT: "Kommer snart..."
			}
		}
	});
});
