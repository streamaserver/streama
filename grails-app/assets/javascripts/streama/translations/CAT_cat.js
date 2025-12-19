//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Improved translation by @agustinpallares94 on 23/11/21
 */
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('cat', {
		LOGIN: {
			TITLE: 'Introduïu el vostre usuari',
			USERNAME: 'Usuari',
			PASSWORD: 'Contrasenya',
			FIRST_TIME_HINT: 'És la teva primera vegada? Prova \'*admin\' en els dos camps.',
			SUBMIT: 'Entrar',
      SESSION_EXPIRED: 'La seva sessió va expirar des de la seva última activitat. Si us plau iniciï sessió de nou.'
		},
		DASHBOARD: {
      HOME: 'Casa',
      TV_SHOWS: 'Programes',
      MOVIES: 'Pel·lícules',
      MY_LIST:'La meva llista',
			TITLE: 'Panell de control',
      TITLE_COUNTER_OF: 'of',
			NEW_RELEASES: 'Noves Publicacions',
			CONTINUE_WATCHING: 'Continuar Veient',
			DISCOVER_SHOWS: 'Descobreix Sèries',
			DISCOVER_MOVIES: 'Descobreix Sèries',
			DISCOVER_OTHER_VIDEOS: 'Descobreix altres vídeos',
			SORT: 'Ordenar:',
			SEARCH_BY_NAME: 'Buscar per Nom...',
			FILTER_BY_TAG: 'Filtrar per Etiqueta...',
			BROWSE_GENRES: 'Buscar',
			LOOKING_AT_GENRE: 'Estàs explorant el gènere:',
			MARK_COMPLETED: 'Marcar com Completat',
			NO_TVSHOWS_FOUND: 'No s han trobat Sèries',
      NO_WATCHLIST_FOUND: 'Res aquí encara',
			NO_MOVIES_FOUND: 'No s han trobat Pel·lícules',
      WATCHLIST: 'veure més tard'
		},
		VIDEO: {
			RELEASED: 'Publicat',
			IMDB: 'IMDB',
			RATING: 'Puntuació',
      STATUS: 'Estatus',
      STATUS_VALUE: {
        'completed': 'Completat',
        'viewing': 'Visualització',
        'unviewed': 'No vist'
      },
			VOTES: 'Vots',
			OVERVIEW: 'Sinopsi',
			GENRE: 'Gènere',
			TRAILER: 'Trailer',
			SEASON: 'Temporada',
      NO_SUBTITLE: 'Sense subtítols'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Creant una sessió nova, seràs redirigit de tornada a aquest reproductor, però aquesta vegada tindràs un codi de sessió únic en la URL. Comparteix aquest enllaç per a tenir una experiència de visió sincronitzada!',
			FILE_MISSING: 'Hi ha un problema amb aquest contingut. Sembla que l arxiu associat al mateix ha estat eliminat.',
			CODEC_PROBLEM: 'Sembla que hi ha un problema afegint l arxiu de vídeo al reproductor. *Ésto sol deure s a un problema amb els còdecs. Prova convertint-ho a un còdec compatible amb HTML5, elimina el fitxer associat, i afegeix-lo de nou. Si els còdecs són els correctes, comprova el *log del servidor i la URL basi en les opcions.',
			WRONG_BASEPATH: 'El teu vídeo ha estat inclòs usant una ruta incorrecta, però estàs accedint a la pàgina a *traves de la ruta "{{*basePath}}". Assegura t d escriure la ruta correcta en les propietats i que estàs usant-la per a accedir a l aplicació.'
		},
		MANAGE_CONTENT: 'Gestionar Contingut',
    MANAGE_SUB_PROFILES: 'Gestionar Perfils',
    WHOS_WATCHING: 'Qui està veient?',
    ADD_SUB_PROFILE: 'Afegir perfil',
    EDIT_BTN: 'Editar',
    DONE_BTN: 'Fet',
    SAVE_BTN: 'Guardar',
    CREATE_BTN: 'Crear',
    CANCEL_BTN: 'Cancel·lar',
    DELETE_BTN: 'Esborrar',
    ENTER_NAME: 'Ingressi el seu nom',
    EDIT_PROFILE: 'Editar perfil',
    CREATE_PROFILE: 'Crear perfil',
		ADMIN: 'Admin',
		HELP: 'Ajuda',
		HELP_FAQ: 'Ajuda / Preguntes Freqüents',
		PROFILE_SETTINGS: 'Opcions de Perfil',
		LOGOUT: 'Sortir',
		CHANGE_PASSWORD: 'Canviar Contrasenya',
	LANGUAGE_en: 'English/Anglès',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Rus',
    LANGUAGE_de: 'Deutsch/Alemany',
    LANGUAGE_fr: 'Français/Francès',
    LANGUAGE_es: 'Español/Castellà',
    LANGUAGE_cat: 'Català',
    LANGUAGE_kr: '한국어/Coreà',
    LANGUAGE_nl: 'Nederlands/Holandès',
    LANGUAGE_pt: 'Português/Portuguès',
    LANGUAGE_ja: '日本語/Japonès',
    LANGUAGE_it: 'Italiano/Italià',
    LANGUAGE_da: 'Dansk/Danès',
    LANGUAGE_ar: 'عربى/Àrab',
    LANGUAGE_hu: 'Magyar/Hongarès',
		PROFIlE: {
			USERNAME: 'Nom d usuari',
			FULL_NAME: 'Nom complet',
			LANGUAGE: 'Idioma',
			PAUSE_ON_CLICK: 'Clic en vídeo per a *pausar',
			FAVORITE_GENRES: 'Gèneres Favorits',
			SAVE: 'Guardar Perfil',
			OLD_PASS: 'Antiga Contrasenya',
			NEW_PASS: 'Nova Contrasenya',
			NEW_PASS_PLACEHOLDER: 'Nova Contrasenya (min. 6 Caràcters)',
			REPEAT_PASS: 'Repeteix la teva Contrasenya',
			SAVE_PASS: 'Desar Nova Contrasenya',
      AMOUNT_OF_MEDIA_ENTRIES: 'Quantitat de vídeos en la pàgina principal (abans que aparegui el botó "Carregar Més")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Afegits Recentment',
			OLDEST_ADDED: 'Afegits Primer',
			NEWEST_RELEASED: 'Últims Publicats',
			OLDEST_RELEASED: 'Primers Publicats',
			NEWEST_AIRED: 'Transmesos Recentment',
			OLDEST_AIRED: 'Transmesos Primer'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Com puc pujar un vídeo?',
				TEXT: "Pots pujar un vídeo accedint al menú Gestionar Contingut. Tria si vols pujar una Pel·lícula, una Sèrie o qualsevol altre vídeo. Fes clic en l'opció corresponent del menú" +
                      				" vertical en el lateral esquerre de l'aplicació. Pots pujar un vídeo fent clic en el botó de Crear Nova Pel·lícula/Sèrie/Un altre o escrivint" +
                      				" el nom del vídeo que vols pujar en la barra de cerca i seleccionant l'entrada desitjada d'entre els resultats. Després d'això, pots triar emplenar la informació del vídeo" +
                      				" manualment. Posteriorment, pots pujar el vídeo i els arxius de subtítols prement sobre el botó Gestionar Arxius."
			},
			DELETE_VIDEO: {
				TITLE: 'Com puc esborrar un vídeo?',
				TEXT: "Pots esborrar un vídeo anant a la pàgina d'informació d'aquest vídeo, fent clic a Gestionar Arxius i seleccionant la icona d'una paperera vermella. Una altra manera és fent clic a Editar Pel·lícula" +
                       				" i seleccionant Esborrar pel·lícula. També pots usar el Gestor d'Arxius que es troba en el menú de Gestionar Contingut. D'aquesta manera pots veure tots els arxius pujats. Fes clic en Clic" +
                       				" en la icona de la paperera vermella per a eliminar un fitxer."
			},
			VIDEO_FORMATS: {
				TITLE: 'Quins formats de vídeo estan suportats?',
				TEXT: "*Streama suporta actualment només aquells formats de vídeo suportats pel reproductor HTML5. Pots comprovar si un arxiu de vídeo és compatible amb HTML5 arrossegant-ho" +
                       				" a una pestanya buida del teu navegador."
			},
			SUBTITLES: {
				TITLE: 'Com puc afegir subtítols a un vídeo?',
				TEXT: "Pots afegir subtítols als vídeos fent clic en el botó Gestionar Arxius que es troba en la pàgina d'informació del vídeo. Arrossega els arxius aquí." +
                       				" Antigament havíem de convertir-los manualment a un format d'arxiu compatible, però ja no! Ara l'aplicació s'encarrega d'això per tu."
			},
			INVITE_USERS: {
				TITLE: 'Com puc convidar als meus amics a veure els meus vídeos?',
				TEXT:"Pots compartir els teus vídeos amb els teus amics convidant-los a usar el teu *SalutFlix. Veu al menú d'Usuaris i fes clic en el botó de Convidar Usuari. Emplena el formulari d'invitació i" +
                       				" selecciona el rol del convidat. Els usuaris amb el rol d'Administradors poden editar Usuaris i Configuracions. Els usuaris amb el rol de Gestor de Contingut poden editar el contingut. El teu amic serà notificat" +
                       				" a través del seu correu electrònic. També pots compartir una sessió de vídeo amb els teus amics fent clic sobre el botó Compartir del reproductor i enviant-los l'enllaç corresponent."
              			},
			BASE_URL: {
				TITLE: "Què és la URL basi i com hauria de configurar-la?",
				TEXT: "La URL base s'utilitza en els vídeos i en els enllaços que s'envien en les invitacions per correu."
			},
			NOTIFICATIONS: {
				TITLE: "Què són les notificacions?",
				TEXT: "Pots notificar als amics que convidis enviant-los missatges de notificació. Pots enviar-les afegint-les a la cua de notificacions fent clic en" +
                      				" el botó d'Afegir Notificació que es troba en la pàgina d'informació del vídeo i accedint al menú de Notificacions i *clickando en el botó d'Enviar Cua."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "El reproductor té tecles d'accés ràpid?",
				TEXT: "Si. *Pausar/Continuar: espai. Controlar el *volúmen: fletxes de dalt i a baix. Avançar el vídeo avanci/enrere: fletxes de dreta i esquerra. Salt gran:" +
                       				" control + fletxes de dreta i esquerra. Pantalla completa *on/*off: *alt + *enter. Subtítols *on/*off: S, Silenciar: M, Tornar a l'anterior" +
                       				" pantalla: *delete o *backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "Com afecten a *Streama els gèneres favorits de l'usuari?",
				TEXT: "Pròximament..."
			},
			USEFUL_LINKS: {
				TITLE: "Enllaços útils",
				TEXT: "Pròximament..."
			}
		}
	});
});
