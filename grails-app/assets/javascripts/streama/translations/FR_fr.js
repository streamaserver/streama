//= wrapped
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('fr', {
		LOGIN: {
			TITLE: 'Veuillez vous connecter',
			USERNAME: 'Nom d\'utilisateur',
			PASSWORD: 'Mot de passe',
			FIRST_TIME_HINT: 'Première connexion ? Connectez-vous avec \'admin\'/\'admin\'.',
			SUBMIT: 'Connexion'
		},
		DASHBOARD: {
			TITLE: 'Tableau de bord',
			NEW_RELEASES: 'Nouvelles sorties',
			CONTINUE_WATCHING: 'Continuer le visionnage',
			DISCOVER_SHOWS: 'Découvrez des séries',
			DISCOVER_MOVIES: 'Découvrez des films',
			DISCOVER_OTHER_VIDEOS: 'Découvrez d\'autres vidéos',
			SORT: 'Tri :',
			SEARCH_BY_NAME: 'Chercher par nom...',
			FILTER_BY_TAG: 'Chercher par tag...',
			BROWSE_GENRES: 'Parcourir',
			LOOKING_AT_GENRE: 'Vous regardez le genre :',
			MARK_COMPLETED: 'Marquer comme fini',
			NO_TVSHOWS_FOUND: 'Aucune série disponible',
			NO_MOVIES_FOUND: 'Aucun film disponible'
		},
		VIDEO: {
			RELEASED: 'Sorti',
			IMDB: 'IMDB',
			RATING: 'Note',
			VOTES: 'Votes',
			OVERVIEW: 'Résumé',
			GENRE: 'Genre',
			TRAILER: 'Bande annonce',
			SEASON: 'Saison'
		},

		MESSAGES: {
			SHARE_SOCKET: 'En créant une nouvelle session, vous serez rediriger vers ce lecteur vidéo avec un identifiant de session unique dans l\'adresse. Partagez cette adresse avec vos amis pour regarder une vidéo de façon synchronisée !',
			FILE_MISSING: 'Il y\'a un problème avec ce contenu. Il semblerait que vous ayez supprimé le fichier vidéo associé.',
			CODEC_PROBLEM: 'Il semblerait qu\'il y ai un problème pour lire ce fichier. Cela est probablement dû à un problème de codec. Essayez de convertir votre vidéo en un format compatible HTML5, supprimez le fichier actuellement attaché et réajoutez le. Si le codec est bon, vérifier les logs d\'erreur sur le serveur et l\'URL racine dans les paramètres.',
			WRONG_BASEPATH: 'Votre vidéo a été ajouté avec un mauvais chemin racine, mais vous naviguez en utilisant "{{basePath}}". Vérifiez que le chemin racine est correct dans les paramètres et qu\'il correspond bien à l\'URL que vous utilisez pour naviguer cette application.'
		},
		MANAGE_CONTENT: 'Gérer le contenu',
		ADMIN: 'Paramètres',
		HELP: 'Aide',
		HELP_FAQ: 'Aide / FAQ',
		PROFILE_SETTINGS: 'Paramètres du profil',
		LOGOUT: 'Déconnexion',
		CHANGE_PASSWORD: 'Modifier le mot de passe',
		LANGUAGE_en: 'Angais',
		LANGUAGE_de: 'Allemand',
		LANGUAGE_fr: 'Français',
		LANGUAGE_es: 'Espagnol',
		LANGUAGE_kr: 'Coréen',
		LANGUAGE_nl: 'Néerlandais',
		LANGUAGE_pt: 'Portugais',
		
		PROFIlE: {
			USERNAME: 'Nom d\'utilisateur',
			FULL_NAME: 'Nom complet',
			LANGUAGE: 'Langue',
			PAUSE_ON_CLICK: 'Mettre la vidéo en pause au clic',
			FAVORITE_GENRES: 'Genres favoris',
			SAVE: 'Enregistrer le profil',
			OLD_PASS: 'Ancien mot de passe',
			NEW_PASS: 'Nouveau mot de passe',
			NEW_PASS_PLACEHOLDER: 'Nouveau mot de pass (min. 6 caractères)',
			REPEAT_PASS: 'Répétez le mot de passe',
			SAVE_PASS: 'Enregistrer le nouveau mot de passe'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Ajoutés récemment',
			OLDEST_ADDED: 'Premiers ajoutés',
			NEWEST_RELEASED: 'Dernières sorties',
			OLDEST_RELEASED: 'Premières sorties',
			NEWEST_AIRED: 'Dernières sorties',
			OLDEST_AIRED: 'Premières sorties'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Comment ajouter une vidéo ?',
				TEXT: "Vous pouvez ajouter une vidéo en allant dans le menu Gérer le contenu. Choisissez si vous voulez ajouter un film, une série ou une autre vidéo. Cliquez sur le sous-menu correspondant" +
				" dans la barre de navigation verticale sur le coté gauche de l'écran. Vous pouvez ajouter une vidéo en cliquant sur le bouton Créer un film/série/autre vidéo ou en tapant" +
				" le nom de la vidéo que vous voulez ajouter dans la barre de recherche et en sélectionnant le film correspondant dans les résultats de recherche. Ensuite, vous pouvez choisir de renseigner les informations" +
				" sur la vidéo soit manuellement soit en chargeant les informations de TheMovieDB. Finalement, vous pouvez ajouter la vidéo et les sous-titres en cliquant sur le bouton Gérer les fichiers."
			},
			DELETE_VIDEO: {
				TITLE: 'Comment supprimer une vidéo ?',
				TEXT: "Vous pouvez supprimer une vidéo en allant sur la page des les informations d'une vidéo et en cliquant sur Gérer les fichiers puis en sélectionnant l'icône de corbeille rouge. Cliquer sur Modifier un film et sélectionner Supprimer le film" +
				" est un autre moyen. Vous pouvez également utiliser le Gestionnaire de fichiers dans le menu Gérer le contenu. Vous pouvez voir tous les fichiers ajoutés ici. Cliquez" +
				" sur l'icône de corbeille rouge pour supprimer un fichier."
			},
			VIDEO_FORMATS: {
				TITLE: 'Quels formats vidéos sont supportés ?',
				TEXT: "Streama supporte actuellement seulement les formats vidéos supportés par le lecteur HTML5. Vous pouvez tester si votre fichier vidéo est compatible HTML5 en le glissant déplaçant dans un onglet vide" +
				" de votre navigateur."
			},
			SUBTITLES: {
				TITLE: 'Comment ajouter des sous-titres à une vidéo ?',
				TEXT: "Vous pouvez ajouter des sous-titres aux vidéos en cliquant sur le bouton Gérer les fichiers situé dans la page d'information de la vidéo. Vous pouvez glisser déplacer les fichiers de sous-titres ici." +
				" Précedemment, vous deviez les convertir dans un format compatible, mais ce n'est plus nécessaire ! L'application s'en charge pour vous."
			},
			INVITE_USERS: {
				TITLE: 'Comment inviter un ami à voir mes vidéos ?',
				TEXT:"Vous pouvez partager vos vidéos avec vos amis en les invitant sur votre Streama. Allez dans le menus Utilisateurs et cliquer sur le bouton Inviter un utilisateur. Remplissez le formulaire d'invitation et" +
				" sélectionner le/les rôle(s) de l'invité. Les utilisateurs avec le rôle Administateur peuvent modifier les utilisateurs et les paramètres. Les utilisateurs avec le rôle Gestionnaire de contenu peuvent modifier le contenu. Votre ami sera notifié de l'invitation" +
				" par email. Vous pouvez également partager une session vidéo avec vos amis en cliquant sur le bouton Partager sur le lecteur vidéo et en leur envoyant le lien vers la session."
			},
			BASE_URL: {
				TITLE: "Quelle est l\'URL racine et comment doit-je la configurer ?",
				TEXT: "L\'URL racine est utilisée pour les vidéos et les liens dans les e-mails d'invitation."
			},
			NOTIFICATIONS: {
				TITLE: "Que sont les notifications ?",
				TEXT: "Vous pouvez notifier vos amis à propos de vidéos ajoutées en leur envoyant un message de notification. Vous pouvez les envoyer en les ajoutant dans votre liste de notification en cliquant" +
				" sur le bouton Ajouter une notification sur la page d'information de la vidéo puis en allant dans le menu des notifications et en cliquant sur le bouton Envoyer la liste."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Est-ce que le lecteur vidéo a des raccourcis clavier ?",
				TEXT: "Oui. Pause/reprendre : espace. Modifier le volume : Flèche haut/bas. Vidéo suivante/précédente : Flèche gauche/droite. Avance rapide :" +
				" Ctrl + flèche gauche/droite. Plein écran oui/non : Alt + Entrée. Sous-titres oui/non : S, Muet : M, Retour à l'écran précédent" +
				" : Suppr ou Retour."
			},
			FAVORITE_GENRES: {
				TITLE: "En quoi les genres favoris d'un utilisateur affectent Streama ?",
				TEXT: "A venir..."
			},
			USEFUL_LINKS: {
				TITLE: "Liens utiles",
				TEXT: "A venir..."
			}
		}
	});
});
