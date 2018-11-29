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
      FIRST_TIME_HINT: 'Eerste keer dat u inlogt? Probeer \'admin\' voor gebruikersnaam en wachtwoord.',
      SUBMIT: 'Login',
      SESSION_EXPIRED: 'Je sessie is verlopen sinds je laatste activiteit. Log alsjeblieft nogmaals in.'
    },
    DASHBOARD: {
      TITLE: 'Dashboard',
      RECOMMENDATIONS: 'Aanbevelingen voor u',
      NEW_RELEASES: 'Nieuw uitgebracht',
      CONTINUE_WATCHING: 'Verder kijken',
      DISCOVER_SHOWS: 'Ontdek series',
      DISCOVER_MOVIES: 'Ontdek films',
      DISCOVER_OTHER_VIDEOS: 'Ontdek andere videos.',
      SORT: 'Sorteer op',
      SEARCH_BY_NAME: 'Zoek met naam...',
      FILTER_BY_TAG: 'Filter op tag...',
      BROWSE_GENRES: 'Verken',
      LOOKING_AT_GENRE: 'Je kijkt naar het genre',
      MARK_COMPLETED: 'Markeer als bekeken',
      NO_TVSHOWS_FOUND: 'Geen series beschikbaar',
      NO_MOVIES_FOUND: 'Geen films beschikbaar'
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
      NO_SUBTITLE: 'Geen ondertiteling'
    },

    MESSAGES: {
      SHARE_SOCKET: 'Door een nieuwe sessie te starten zal je teruggestuurd worden naar dit venster, maar deze keer zal de url een unieke sessie id bevatten. Deel deze met je vrienden om een gesynchroniseerde kijkervaring te beleven!',
      FILE_MISSING: 'Er is een probleem met deze video. Het lijkt erop dat het bestand verwijderd is.',
      CODEC_PROBLEM: 'Het lijkt er op dat er een probleem is met het toevoegen van het bestand. Dit komt waarschijnlijk door een verkeerde codec. Converteer het bestand naar een HTML5-codec, verwijder het huidige bestand en probeer het nieuwe bestand opnieuw toe te voegen. Is de codec wel geschikt? Check de server log en Base URL.',
      WRONG_BASEPATH: 'Uw video wordt toegevoegd met het verkeerde basispad, u bekijkt de pagina via "{{basePath}}". Wees er weker van dat u het juiste basispad instelt en dat je dit gebruikt om de applicatie te bereiken.',
      FILE_IN_FS_NOT_FOUND: 'Uw video kan niet gevonden worden op een van de locaties die beschikbaar zijn voor de toepassing. Herzie uw instellingen en uw bestandssyteem om er zeker van te zijn dat alle bestanden bereikbaar zijn voor de applicatie.'
    },
    MANAGE_CONTENT: 'Beheer content',
    MANAGE_SUB_PROFILES: 'Profielen beheren',
    WHOS_WATCHING: 'Wie kijkt?',
    ADD_SUB_PROFILE: 'Profiel toevoegen',
    EDIT_BTN: 'Bewerk',
    DONE_BTN: 'Gedaan',
    SAVE_BTN: 'Opslaan',
    CREATE_BTN: 'creëren',
    CANCEL_BTN: 'annuleren',
    DELETE_BTN: 'Verwijder',
    ENTER_NAME: 'Voer naam in',
    EDIT_PROFILE: 'Bewerk profiel',
    CREATE_PROFILE: 'Maak een profiel aan',
    ADMIN: 'Administrator',
    HELP: 'Help',
    HELP_FAQ: 'HELP / FAQ',
    PROFILE_SETTINGS: 'Profielinstellingen',
    LOGOUT: 'Uitloggen',
    CHANGE_PASSWORD: 'Wachtwoord wijzigen',
    LANGUAGE_en: 'English/Engels',
    LANGUAGE_ru: 'Русский/Russisch',
    LANGUAGE_de: 'Deutsch/Duits',
    LANGUAGE_fr: 'Français/Frans',
    LANGUAGE_es: 'Español/Spaans',
    LANGUAGE_kr: '한국어/Koreaans',
    LANGUAGE_nl: 'Nederlands',
    LANGUAGE_pt: 'Português/Portugees',
    LANGUAGE_ja: '日本語/Japans',
    LANGUAGE_it: 'Italiano/Italiaans',
    LANGUAGE_da: 'Dansk/Deens',
    LANGUAGE_ar: 'عربى/Arabisch',
    PROFIlE: {
      USERNAME: 'Gebruikersnaam',
      FULL_NAME: 'Volledige naam',
      LANGUAGE: 'Taal',
      PAUSE_ON_CLICK: 'Pauzeer video met klik',
      FAVORITE_GENRES: 'Favoriete Genres',
      AMOUNT_OF_MEDIA_ENTRIES: 'Aantal video\'s op dashboard (voorheen "Meer laden")',
      SAVE: 'Opslaan',
      PASS: 'Wachtwoord',
      OLD_PASS: 'Oud wachtwoord',
      NEW_PASS: 'Nieuw wachtwoord',
      NEW_PASS_PLACEHOLDER: 'Nieuw wachtwoord (minimaal 6 karakters',
      REPEAT_PASS: 'Herhaal wachtwoord',
      PASS_ERROR_EMPTY: 'Het wachtwoord mag niet leeg zijn',
      PASS_ERROR_LENGTH: 'Het wachtwoord moet minstens 6 karakters lang zijn',
      PASS_ERROR_REPEAT: 'De wachtwoorden moeten overeenstemmen',
      SAVE_PASS: 'Opslaan'
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
      NEWEST_REPORTED: 'Laatst Gerapporteerd',
      OLDEST_REPORTED: 'Als eerste gerapporteerd',
      NEWEST_UPDATED: 'Laatst Bijgewerkt',
      OLDEST_UPDATED: 'Als eerste bijgewerkt'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'Hoe kan ik een video uploaden?',
        TEXT: "U kan een video oploaden door naar het Beheer Content menu te gaan. Kies tussen het uploaden van een Film, Serie of andere soort video. Klik op de relevante sub-menu optie" +
          " te vinden op de verticale navigatiebar op de linkerkant van het scherm. Je kan een nieuwe video toevoegen door te klikken op Create New Movie/TV Show/Other Video knop" +
          " of door de film te zoeken via de zoekbalk en het relevante resultaat te kiezen. Nadien kan je de informatie van de video manueel invullen of de informatie laden vanuit TheMovieDB." +
          " Als laatste voegt u de video en mogelijke ondertitels toe via de Mqnqge Files knop."
      },
      DELETE_VIDEO: {
        TITLE: 'Hoe kan ik een video verwijderen?',
        TEXT: "U kan een video verwijderen door naar de infromatie pagina van de videos te gaan en op Manage Files te klikken. Daar klikt op het icoon van de rode vuilbak." +
          " Klikken op Edit Movie en Delete Movie selecteren is een tweede manier. Een derde manier is naar het Manage Content Menu te gaan en te klikken op het rode vuilbak icoon van" +
          " het te verwijderen bestand."
      },
      VIDEO_FORMATS: {
        TITLE: 'Welke video indelingen worden ondersteund?',
        TEXT: "Streama ondersteund momenteel enkel de video indelingen die ondersteund zijn door de HTML5 Player. U kan testen of uw video HTML5 compatibel is door uw bestand" +
          " naar een leeg browsertablad te slepen."
      },
      SUBTITLES: {
        TITLE: 'Hoe kan ik ondertitels toevoegen aan videos?',
        TEXT: "U kan ondertitels toevoegen voor een bepaalde video door naar de informatiepagina van de video te gaan en de knop Manage Files in te drukken." +
          " U kan hier simpelweg ondertitel bestanden naartoe slepen. Voordien moest u de bestanden converteren naar een gekende bestandsindeling, maar niet langer!" +
          " De applicatie zorgt hier nu volledig zelf voor."
      },
      INVITE_USERS: {
        TITLE: 'Hoe kan ik vrienden uitnodigen om mijn gehoste video te bekijken?',
        TEXT: "U kan uw videos delen met uw vrienden door ze uit te nodigen om uw Streama te gebruiken. Ga naar het Users Menu en klik op Invite User. Vul het uitnodigingsformulier" +
          " in en selecteer de rol(len) van de genodigde. Gebuikers met de rol Admin kunnen gebruikers en instellen aanpassen. Gebruikers met de rol Content Manager kunnen materiaal" +
          " beheren. Uw vriend zal op de hoogte gebracht worden van de uitnodiging via mail. U kan ook video sessies delen met vrienden door de Share-knop in te drukken tijdens het" +
          " spelen van de video. De getoonde link kan u delen met hen."
      },
      BASE_URL: {
        TITLE: "Wat is de basis URL en hoe moet ik deze configureren?",
        TEXT: "De basis URL wordt gebruikt voor de videos en de link in de invitatie email."
      },
      NOTIFICATIONS: {
        TITLE: "Wat zijn notificaties?",
        TEXT: "U kan uw uitgenodigde vrienden op de hoogte brengen van nieuw materiaal door hen notificaties te sturen. U kan deze sturen door ze toe te voegen aan de notificatierij." +
          " Dit door te klikken op Add Notification in de video\'s informatiepagina en naar het notificatiemenu te gaan en te klikken op Send Queue."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Heeft de videospeler shortcut knoppen?",
        TEXT: "Ja. Pauze/hervatten: spatiebalk. Volume regelen: Pijltjestoetsen op en neer. Videos overslaan vooruit/achteruit: Pijltjestoetsen links en rechts. Lang overslaan:" +
          " control + Pijltjestoetsen links en rechts. Volledig scherm aan/uit: alt + enter. Ondertitels aan/uit: S, Mute: M, Naar het vorige scherm: delete or backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "Welk effect heeft uw favoriete genre op Streama?",
        TEXT: "Komt Binnenkort..."
      },
      USEFUL_LINKS: {
        TITLE: "Handige links",
        TEXT: "Komt Binnenkort..."
      }
    }
  });
});
