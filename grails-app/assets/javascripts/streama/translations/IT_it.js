//= wrapped
/**
 * Created by antonia on 14/05/16.
 *Translated by @DragonShura 23/01/17.
 */
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('it', {
		LOGIN: {
			TITLE: 'Effettua il login',
			USERNAME: 'Nome utente',
			PASSWORD: 'Password',
			FIRST_TIME_HINT: 'Prima volta log-in? Provare \'admin\' per entrambi i campi.',
			SUBMIT: 'Account di accesso',
      SESSION_EXPIRED: 'La sessione è scaduta dall\'ultima attività. Per favore esegui l\'accesso di nuovo.'
		},
		DASHBOARD: {
			TITLE: 'Cruscotto',
			NEW_RELEASES: 'Nuove uscite',
			CONTINUE_WATCHING: 'Continuare a guardare',
			DISCOVER_SHOWS: 'Scopri spettacoli',
			DISCOVER_MOVIES: 'Scopri i film',
			DISCOVER_OTHER_VIDEOS: 'Scopri altri video',
			SORT: 'Ordinamento:',
			SEARCH_BY_NAME: 'Ricerca per nome...',
			FILTER_BY_TAG: 'Filtra per Tag...',
			BROWSE_GENRES: 'Sfoglia',
			LOOKING_AT_GENRE: 'si sta guardando il genere:',
			MARK_COMPLETED: 'Mark completato',
			NO_TVSHOWS_FOUND: 'No Tv-Show disponibili',
			NO_MOVIES_FOUND: 'Nessun film disponibile'
		},
		VIDEO: {
			RELEASED: 'Rilasciato',
			IMDB: 'IMDB',
			RATING: 'Voto',
			VOTES: 'Voti',
			OVERVIEW: 'Panoramica',
			GENRE: 'Genere',
			TRAILER: 'Rimorchio',
			SEASON: 'Stagione',
      NO_SUBTITLE: 'Nessun sottotitolo'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Con la creazione di una nuova sessione Verrai reindirizzato torna a questo giocatore, ma questa volta avrete un ID di sessione univoco nell url. Condividi con i tuoi amici di avere una visione sincronizzata esperienza con loro!',
			FILE_MISSING: 'Cè un problema con questo contenuto. Sembra che è stato rimosso il file video associato da esso... Condividi con i tuoi amici di avere una visione sincronizzata esperienza con loro!',
			CODEC_PROBLEM: 'Sembra esserci un problema aggiungendo il file video sul lettore. Questo è probabilmente a causa di un problema di codec. Prova a convertirlo a un codec compatibile HTML5, rimuovere il file attualmente allegato e aggiungerlo nuovamente. Se i codec sono belle, controllare il log degli errori del server e URL di base nelle impostazioni.',
			WRONG_BASEPATH: 'Hai dei video get incluso utilizzando il percorso di Base sbagliato, ma si sta visualizzando la pagina via "{{basePath}}". Assicurarsi che si imposta il percorso di Base corretto nelle impostazioni e che si sta utilizzando per esplorare applicazione.'
		},
		MANAGE_CONTENT: 'Gestire i contenuti',
    MANAGE_SUB_PROFILES: 'Gestire i profili',
    WHOS_WATCHING: 'Chi sta guardando',
    ADD_SUB_PROFILE: 'Aggiungi profilo',
    EDIT_BTN: 'Modificare',
    DONE_BTN: 'Fatto',
    SAVE_BTN: 'Salvare',
    CREATE_BTN: 'Creare',
    CANCEL_BTN: 'Annulla',
    DELETE_BTN: 'Elimina',
    ENTER_NAME: 'Inserisci il nome',
    EDIT_PROFILE: 'Modifica Profilo',
    CREATE_PROFILE: 'Crea un profilo',
		ADMIN: 'Admin',
		HELP: 'Guida',
		HELP_FAQ: 'Guida / FAQ',
		PROFILE_SETTINGS: 'Impostazioni del profilo',
		LOGOUT: 'Logout',
		CHANGE_PASSWORD: 'Cambia Password',
    LANGUAGE_en: 'English/Inglese',
    LANGUAGE_ru: 'Русский/Russo',
    LANGUAGE_de: 'Deutsch/Tedesco',
    LANGUAGE_fr: 'Français/Francese',
    LANGUAGE_es: 'Español/Spagnolo',
    LANGUAGE_kr: '한국어/Coreano',
    LANGUAGE_nl: 'Nederlands/Olandese',
    LANGUAGE_pt: 'Português/Portoghese',
    LANGUAGE_ja: '日本語/Giapponese',
    LANGUAGE_it: 'Italiano',
    LANGUAGE_da: 'Dansk/danese',
    LANGUAGE_ar: 'عربى/Arabo',
		PROFIlE: {
			USERNAME: 'Nome Utente',
			FULL_NAME: 'Nome e cognome',
			LANGUAGE: 'Lingua',
			PAUSE_ON_CLICK: 'Pausa Video su Click',
			FAVORITE_GENRES: 'Generi preferiti',
			SAVE: 'Salva il profilo',
			PASS: 'Parola d ordine',
			OLD_PASS: 'Vecchia password',
			NEW_PASS: 'Nuova password',
			NEW_PASS_PLACEHOLDER: 'Nuova password (min. 6 caratteri)',
			REPEAT_PASS: 'Ripeti la password',
			PASS_ERROR_EMPTY: 'La password non può essere vuoto',
			PASS_ERROR_LENGTH: 'La password deve essere lunga almeno 6 caratteri',
			PASS_ERROR_REPEAT: 'Le password devono corrispondere',
      AMOUNT_OF_MEDIA_ENTRIES: 'Quantità di video su Dashboard (prima di "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Aggiunto di recente',
			OLDEST_ADDED: 'Prima Aggiunto',
			NEWEST_RELEASED: 'Ultima uscita',
			OLDEST_RELEASED: 'I più vecchi di uscita',
			NEWEST_AIRED: 'In onda di recente',
			OLDEST_AIRED: 'I più vecchi Air-Date'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Come faccio a caricare un video?',
				TEXT: "È possibile caricare i video andando al menu Gestisci contenuti. Scegliere se si desidera caricare un film, show televisivo o altri video. Fare clic sull'opzione relativo sottomenu" +
					  "Sulla barra di navigazione verticale sul lato sinistro dello schermo. È possibile caricare un video cliccando sul TV Show Altro pulsante Nuovo Film / / Video Creare o digitando" +
					  "Il nome del video che si desidera caricare la barra di ricerca e selezionare il filmato in questione dai risultati di ricerca. Dopo di che, si può scegliere di compilare il del video" +
					  "Le informazioni manualmente o caricando le sue informazioni dal TheMovieDB. Dopo di che, è possibile caricare il file di sottotitoli video e facendo clic sul pulsante File di Gestione."
			},
			DELETE_VIDEO: {
				TITLE: 'Come posso eliminare un video?',
				TEXT: "È possibile eliminare un video andando alla pagina di informazioni del video e facendo clic su Gestione di file e selezionando l'icona del cestino rosso. Facendo clic su Modifica filmato e selezionando" +
					  "Elimina film è un altro modo per farlo. È anche possibile utilizzare il File Manager, che si trova nel menu Gestione contenuto. È possibile visualizzare tutti i file che hai caricato lì. Fai clic su" +
					  "Cestino rosso può icona per eliminare un file."
			},
			VIDEO_FORMATS: {
				TITLE: 'Quali formati video sono supportati?',
				TEXT: "Streama supporta attualmente solo i formati di file video supportati da player HTML5. È possibile verificare se il file video è compatibile con player HTML5 trascinando" +
					  "Il file a una scheda vuota sul tuo browser."
			},
			SUBTITLES: {
				TITLE: 'Come posso aggiungere sottotitoli ai video?',
				TEXT: "È possibile aggiungere i sottotitoli ai video facendo clic sul pulsante file che si trova nella pagina di informazioni del video Gestisci. È possibile trascinare e rilasciare i file di sottotitoli là " +
					  "in precedenza era necessario convertirli manualmente in un formato file compatibile, ma ora non più! Ora l'applicazione gestisce che per voi."
			},
			INVITE_USERS: {
				TITLE: 'Come posso invitare gli amici a guardare i miei video ospitati?',
				TEXT:"È possibile condividere i video con i tuoi amici, invitandoli a utilizzare il ospitato Streama. Vai al menu utenti e fare clic sul pulsante User Invita. Compila il modulo invitare e" +
					 "Selezionare il ruolo (s) del invitato. Gli utenti con il ruolo di amministratore possono modificare Utenti e Impostazioni. Gli utenti con il ruolo Content Manager possono modificare il contenuto. Il tuo amico verrà notificato di" +
					 "L'invito via e-mail. È inoltre possibile condividere le sessioni video con i tuoi amici cliccando del lettore video pulsante Condividi e che collega l'URL della sessione a loro."
			},
			BASE_URL: {
				TITLE: "Qual è l'URL di base e come devo configurarlo?",
				TEXT: "La Base-URL viene utilizzato per i video e il collegamento nell'invito-mail."
			},
			NOTIFICATIONS: {
				TITLE: "Quali sono le notifiche?",
				TEXT: "È possibile avvisare i tuoi amici invitati circa i video caricati inviando loro messaggi di notifica. È possibile inviare con l'aggiunta di loro la vostra coda di notifica facendo clic su" +
					  "Pulsante di notifica che si trova nella pagina di informazioni del tuo video e andando al menu Notifiche e cliccando il pulsante Invia Queue Aggiungi."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Ha il lettore video sono tasti di scelta rapida?",
				TEXT: "Sì. Pausa / Riattiva: lo spazio. Gestire il volume: i tasti freccia su o giù. Skip video in avanti / indietro: i tasti freccia a destra oa sinistra. Skip Long:" +
					  "Controllo + tasti freccia a sinistra oa destra a tutto schermo on / off:. Alt + Invio sottotitoli ON / OFF:. S, Mute: M, tornare alla precedente" +
					  "Schermo: eliminare o backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "Come generi preferiti dell'utente influenzano Streama?",
				TEXT: "Prossimamente..."
			},
			USEFUL_LINKS: {
				TITLE: "Link utili",
				TEXT: "Prossimamente..."
			}
		}
	});
});
