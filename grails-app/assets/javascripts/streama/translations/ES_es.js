//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Improved translation by @Norwelian on 23/05/19
 */
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('es', {
		LOGIN: {
			TITLE: 'Introduzca su usuario',
			USERNAME: 'Usuario',
			PASSWORD: 'Contraseña',
			FIRST_TIME_HINT: '¿Es tu primera vez? Prueba \'admin\' en ambos campos.',
			SUBMIT: 'Entrar',
      SESSION_EXPIRED: 'Su sesión expiró desde su última actividad. Por favor inicie sesión de nuevo.'
		},
		DASHBOARD: {
      HOME: 'Casa',
      TV_SHOWS: 'Programas de televisión',
      MOVIES: 'Películas',
      MY_LIST:'Mi lista',
			TITLE: 'Panel de control',
      TITLE_COUNTER_OF: 'of',
			NEW_RELEASES: 'Nuevas Publicaciones',
			CONTINUE_WATCHING: 'Continuar Viendo',
			DISCOVER_SHOWS: 'Descubre Series',
			DISCOVER_MOVIES: 'Descubre Películas',
			DISCOVER_OTHER_VIDEOS: 'Descubre otros vídeos',
			SORT: 'Ordenar:',
			SEARCH_BY_NAME: 'Buscar por Nombre...',
			FILTER_BY_TAG: 'Filtrar por Etiqueta...',
			BROWSE_GENRES: 'Buscar',
			LOOKING_AT_GENRE: 'Estás explorando el género:',
			MARK_COMPLETED: 'Marcar como Completado',
			NO_TVSHOWS_FOUND: 'No se han encontrado Series',
      NO_WATCHLIST_FOUND: 'Nada aquí todavía',
			NO_MOVIES_FOUND: 'No se han encontrado Películas',
      WATCHLIST: 'ver más tarde'
		},
		VIDEO: {
			RELEASED: 'Publicado',
			IMDB: 'IMDB',
			RATING: 'Puntuación',
      STATUS: 'Status',
      STATUS_VALUE: {
        'completed': 'Completed',
        'viewing': 'Viewing',
        'unviewed': 'Unviewed'
      },
			VOTES: 'Votos',
			OVERVIEW: 'Sinopsis',
			GENRE: 'Género',
			TRAILER: 'Trailer',
			SEASON: 'Temporada',
      NO_SUBTITLE: 'Sin subtítulos'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Creando una sesión nueva, seras redirigido de vuelta a este reproductor, pero esta vez tendrás un código de sesión único en la URL. ¡Comparte éste enlace con tus amigos para tener una experiencia de visión sincronizada con ellos!',
			FILE_MISSING: 'Hay un problema con este contenido. Parece el archivo asociado al mismo ha sido eliminado.',
			CODEC_PROBLEM: 'Parece que hay un problema añadiendo el archivo de vídeo al reproductor. Ésto suele deberse a un problema con los códecs. Prueba convirtiéndolo a un códec compatible con HTML5, elimina el fichero asociado, y añádelo de nuevo. Si los códecs son los correctos, comprueba el log del servidor y la URL base en las opciones.',
			WRONG_BASEPATH: 'Tu vídeo ha sido incluido usando una ruta incorrecta, pero estás accediendo a la página a traves de la ruta "{{basePath}}". Asegúrate de escribir la ruta correcta en las propiedades y de que estás usándola para acceder a la aplicación.'
		},
		MANAGE_CONTENT: 'Gestionar Contenido',
    MANAGE_SUB_PROFILES: 'Gestionar Perfiles',
    WHOS_WATCHING: '¿Quién está viendo?',
    ADD_SUB_PROFILE: 'Añadir perfil',
    EDIT_BTN: 'Editar',
    DONE_BTN: 'Hecho',
    SAVE_BTN: 'Guardar',
    CREATE_BTN: 'Crear',
    CANCEL_BTN: 'Cancelar',
    DELETE_BTN: 'Borrar',
    ENTER_NAME: 'Ingrese su nombre',
    EDIT_PROFILE: 'Editar perfil',
    CREATE_PROFILE: 'Crear perfil',
		ADMIN: 'Admin',
		HELP: 'Ayuda',
		HELP_FAQ: 'Ayuda / Preguntas Frecuentes',
		PROFILE_SETTINGS: 'Opciones de Perfil',
		LOGOUT: 'Salir',
		CHANGE_PASSWORD: 'Cambiar Contraseña',
	LANGUAGE_en: 'English/Inglés',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Ruso',
    LANGUAGE_de: 'Deutsch/Alemán',
    LANGUAGE_fr: 'Français/Francés',
    LANGUAGE_es: 'Español',
    LANGUAGE_kr: '한국어/Coreano',
    LANGUAGE_nl: 'Nederlands/Holandés',
    LANGUAGE_pt: 'Português/Portugués',
    LANGUAGE_ja: '日本語/Japonés',
    LANGUAGE_it: 'Italiano/Italiano',
    LANGUAGE_da: 'Dansk/Danés',
    LANGUAGE_ar: 'عربى/Árabe',
    LANGUAGE_hu: 'Magyar/Húngaro',
		LANGUAGE_sk: 'Slovensky/Slovak',
		PROFIlE: {
			USERNAME: 'Nombre de usuario',
			FULL_NAME: 'Nombre completo',
			LANGUAGE: 'Idioma',
			PAUSE_ON_CLICK: 'Click en video para pausar',
			FAVORITE_GENRES: 'Géneros Favoritos',
			SAVE: 'Guardar Perfil',
			OLD_PASS: 'Antigua Contraseña',
			NEW_PASS: 'Nueva Contraseña',
			NEW_PASS_PLACEHOLDER: 'Nueva Contraseña  (min. 6 Caracteres)',
			REPEAT_PASS: 'Repite tu Contraseña',
			SAVE_PASS: 'Guardar Nueva Contraseña',
      AMOUNT_OF_MEDIA_ENTRIES: 'Cantidad de videos en la página principal (antes de que aparezca el botón "Cargar Más")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Añadidos Recientemente',
			OLDEST_ADDED: 'Añadidos Primero',
			NEWEST_RELEASED: 'Últimos Publicados',
			OLDEST_RELEASED: 'Primeros Publicados',
			NEWEST_AIRED: 'Transmitidos Recientemente',
			OLDEST_AIRED: 'Transmitidos Primero'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: '¿Cómo puedo subir un vídeo?',
				TEXT: "Puedes subir un vídeo accediendo al menú Gestionar Contenido. Elige si quieres subir una Película, una Serie o cualquier otro vídeo. Haz click en la opción correspondiente del menú" +
				" vertical en el lateral izquierdo de la aplicación. Puedes subir un vídeo haciendo click en el botón de Crear Nueva Película/Serie/Otro o escribiendo" +
				" el nombre del vídeo que quieres subir en la barra de búsqueda y seleccionando la entrada deseada de entre los resultados. Después de eso, puedes elegir rellenar la información del vídeo" +
				" manualmente o cargar la información desde TheMovieDB automáticamente. Posteriormente, puedes subir el vídeo y los archivos de subtítulos pulsando sobre el botón Gestionar Archivos."
			},
			DELETE_VIDEO: {
				TITLE: '¿Cómo puedo borrar un vídeo?',
				TEXT: "Puedes borrar un vídeo yendo a la página de información de dicho video, haciendo click en Gestionar Archivos y seleccionando el icono de una papelera roja. Otra manera es haciendo click en Editar Película" +
				" y seleccionando Borrar película. También puedes usar el Gestor de Archivos que se encuentra en el menú de Gestionar Contenido. De ésta manera puedes ver todos los archivos subidos. Haz click en Click" +
				" en el icono de la papelera roja para eliminar un fichero."
			},
			VIDEO_FORMATS: {
				TITLE: '¿Qué formatos de vídeo están soportados?',
				TEXT: "Streama soporta actualmente solo aquellos formatos de vídeo soportados por el reproductor HTML5. Puedes comprobar si un archivo de vídeo es compatible con HTML5 arrastrándolo" +
				" a una pestaña vacía de tu navegador."
			},
			SUBTITLES: {
				TITLE: '¿Cómo puedo añadir subtítulos a un vídeo?',
				TEXT: "Puedes añadir subtítulos a los vídeos haciendo click en el botón Gestionar Archivos que se encuentra en la página de información del vídeo. Arrastra los archivos ahí." +
				" Antiguamente teníamos que convertirlos manualmente a un formato de archivo compatible, ¡pero ya no! Ahora la aplicación se encarga de ello por ti."
			},
			INVITE_USERS: {
				TITLE: '¿Cómo puedo invitar a mis amigos a ver mis vídeos?',
				TEXT:"Puedes compartir tus vídeos con tus amigos invitándoles a usar tu Streama. Ve al menú de Usuarios y haz click en el botón de Invitar Usuario. Rellena el formulario de invitación y" +
				" selecciona el rol del invitado. Los usuarios con el rol de Administradores pueden editar Usuarios y Configuraciones. Los usuarios con el rol de Gestor de Contenido pueden editar el contenido. Tu amigo será notificado" +
				" a través de su correo electrónico. También puedes compartir una sesión de vídeo con tus amigos haciendo click sobre el botón Compartir del reproductor y enviándoles el enlace correspondiente."
			},
			BASE_URL: {
				TITLE: "¿Qué es la URL base y cómo debería configurarla?",
				TEXT: "LA URL base se utiliza en los vídeos y en los enlaces que se envían en las invitaciones por correo."
			},
			NOTIFICATIONS: {
				TITLE: "¿Qué son las notificaciones?",
				TEXT: "Puedes notificar a los amigos que invites mandándoles mensajes de notificación. Puedes enviarlas añadiéndolas a la cola de notificaciones haciendo click en" +
				" el botón de Añadir Notificación que se encuentra en la página de información del vídeo y accediendo al menú de Notificaciones y clickando en el botón de Enviar Cola."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "¿El reproductor tiene teclas de acceso rápido?",
				TEXT: "Si. Pausar/Continuar: espacio. Controlar el volúmen: flechas de arriba y abajo. Avanzar el vídeo adelante/atrás: flechas de derecha e izquierda. Salto grande:" +
				" control + flechas de derecha e izquierda. Pantalla completa on/off: alt + enter. Subtítulos on/off: S, Silenciar: M, Volver a la anterior" +
				" pantalla: delete o backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "¿Cómo afectan a Streama los géneros favoritos del usuario?",
				TEXT: "Próximamente..."
			},
			USEFUL_LINKS: {
				TITLE: "Enlaces útiles",
				TEXT: "Próximamente..."
			}
		}
	});
});
