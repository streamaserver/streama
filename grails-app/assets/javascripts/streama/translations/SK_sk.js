//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(function ($translateProvider) {
  $translateProvider.translations('sk', {
    LOGIN: {
      TITLE: 'Prihláste sa, prosím',
      USERNAME: 'Meno používateľa',
      PASSWORD: 'Heslo',
      FIRST_TIME_HINT: 'Ste tu prvýkrát? Skúste \'admin\' pre obe polia.',
      SUBMIT: 'Prihlásiť sa',
      SESSION_EXPIRED: 'Vaše sedenie expirovalo z dôvodu Vašej neaktivity. Prosím, prihláste sa znovu.'
    },
    DASHBOARD: {
      HOME: 'Domov',
      TV_SHOWS: 'Seriály',
      MOVIES: 'Filmy',
      MY_LIST:'Môj zoznam',
      TITLE: 'Nástenka',
      TITLE_COUNTER_OF: 'z',
      RECOMMENDATIONS: 'Odporúčania pre Vás',
      NEW_RELEASES: 'Novinky',
      CONTINUE_WATCHING: 'Pokračovať v sledovaní',
      DISCOVER_SHOWS: 'Objavujte seriály',
      DISCOVER_MOVIES: 'Objavujte filmy',
      DISCOVER_OTHER_VIDEOS: 'Objavujte iné videá',
      SORT: 'Triedenie:',
      SEARCH_BY_NAME: 'Hľadať podľa názvu...',
      FILTER_BY_TAG: 'Filtrovať podľa značky...',
      FILTER_BY_GENRE: 'Filtrovať podľa žánru...',
      BROWSE_GENRES: 'Prehliadať žánre',
      LOOKING_AT_GENRE: 'Sledujete žáner:',
      MARK_COMPLETED: 'Označiť ako pozreté',
      NO_TVSHOWS_FOUND: 'Nie sú dostupné žiadne seriály',
      NO_WATCHLIST_FOUND: 'Ešte tu nič nie je',
      NO_MOVIES_FOUND: 'Nie sú dostupné žiadne filmy',
      WATCHLIST: 'Zoznam na pozeranie'
    },
    VIDEO: {
      RELEASED: 'Vydané',
      IMDB: 'IMDB',
      RATING: 'Hodnotenie',
      STATUS: 'Stav',
      STATUS_VALUE: {
        'completed': 'pozreté',
        'viewing': 'načaté',
        'unviewed': 'nepozreté'
      },
      VOTES: 'Hlasy',
      OVERVIEW: 'Prehľad',
      GENRE: 'Žáner',
      TRAILER: 'Ukážka',
      SEASON: 'Sezóna',
      SUBTITLES: 'Titulky',
      NO_SUBTITLE: 'Bez titulkov',
      SUBTITLE_SIZE: 'Veľkosti titulkov',
      VIDEO_FILES: 'Zdroje videa',
      UPNEXT: 'Ďalšie diely...'
    },

    MESSAGES: {
      SHARE_SOCKET: 'Po vytvorení nového sedenia Vás presmerujeme naspäť na tento prehrávač, ale tentokrát bude súčasťou URL adresy unikátny identifikátor sedenia. Pošlite ho Vašim priateľom a zdieľajte tak s nimi zážitok zo spoločného sledovania!',
      FILE_MISSING: 'Vyskytol sa problém s týmto obsahom. Zdá sa, že ste odstránili súvisiaci súbor s videom.',
      CODEC_PROBLEM: 'Zdá sa, že sa objavil problém počas pridávania video súboru do prehrávača. Pravdepodobne to súvisí s kodekom. Skúste súbor prekonvertovať do kodeku kompatibilného s HTML5, odstráňte aktuálne pripojený súbor a pridajte nový. Ak sú kodeky v poriadku, pozrite si chybové hlásenie servera a základnú adresu URL v nastaveniach.',
      WRONG_BASEPATH: 'Vaše video používa nesprávnu základnú adresu URL, stránku ale prezeráte prostredníctvom "{{basePath}}". Uistite sa, že máte správne nastavenú základnú adresu v nastaveniach a tiež, že ju používate pri navigácií v aplikácii.',
      FILE_IN_FS_NOT_FOUND: 'Vaše video sa nepodarilo nájsť v žiadnom z umiestnení, ku ktorým ma aplikácia prístup. Prosím, skontrolujte nastavenia a systém súborov a uistite sa, že aplikácia má k súborom prístup.'
    },
    MANAGE_CONTENT: 'Správa obsahu',
    MANAGE_SUB_PROFILES: 'Správa profilov',
    WHOS_WATCHING: 'Kto sleduje?',
    ADD_SUB_PROFILE: 'Pridať profil',
    EDIT_BTN: 'Upraviť',
    DONE_BTN: 'Hotovo',
    SAVE_BTN: 'Uložiť',
    CREATE_BTN: 'Vytvoriť',
    CANCEL_BTN: 'Zrušiť',
    DELETE_BTN: 'Odstrániť',
    ENTER_NAME: 'Zadajte meno',
    EDIT_PROFILE: 'Upraviť profil',
    CREATE_PROFILE: 'Vytvoriť profil',
    ADMIN: 'Administrátor',
    HELP: 'Pomocník',
    HELP_FAQ: 'POMOCNÍK / ČASTÉ OTÁZKY',
    PROFILE_SETTINGS: 'Nastavenia používateľa',
    LOGOUT: 'Odhlásiť sa',
    CHANGE_PASSWORD: 'Zmeniť heslo',
    LANGUAGE_en: 'English/Anglicky',
    LANGUAGE_cn: 'Čínsky/中文',
    LANGUAGE_ru: 'Русский/Rusky',
    LANGUAGE_de: 'Deutsch/Nemecky',
    LANGUAGE_fr: 'Français/Francúzsky',
    LANGUAGE_es: 'Español/Španielsky',
    LANGUAGE_kr: '한국어/Kórejsky',
    LANGUAGE_nl: 'Nederlands/Holandsky',
    LANGUAGE_pt: 'Português/Portugalsky',
    LANGUAGE_ja: '日本語/Japonsky',
    LANGUAGE_it: 'Italiano/Taliansky',
    LANGUAGE_da: 'Dansk/Dánsky',
    LANGUAGE_ar: 'عربى/Arabsky',
    LANGUAGE_hu: 'Magyar/Maďarsky',
		LANGUAGE_sk: 'Slovak/Slovensky',
    PROFIlE: {
      USERNAME: 'Meno používateľa',
      FULL_NAME: 'Meno a priezvisko',
      LANGUAGE: 'Jazyk',
      PAUSE_ON_CLICK: 'Pozastaviť video po kliknutí',
      FAVORITE_GENRES: 'Obľúbené žánre',
      AMOUNT_OF_MEDIA_ENTRIES: 'Počet videí na nástenke (pred "Načítať viac")',
      SAVE: 'Uložiť profil',
      PASS: 'Heslo',
      OLD_PASS: 'Staré heslo',
      NEW_PASS: 'Nové heslo',
      NEW_PASS_PLACEHOLDER: 'Nové heslo (min. 6 znakov)',
      REPEAT_PASS: 'Zopakujte heslo',
      PASS_ERROR_EMPTY: 'Heslo nesmie byť prázdne',
      PASS_ERROR_LENGTH: 'Heslo musí mať aspoň 6 znakov',
      PASS_ERROR_REPEAT: 'Heslá sa musia zhodovať',
      SAVE_PASS: 'Nastaviť nové heslo'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Najskôr pridané',
      OLDEST_ADDED: 'Najneskoršie pridané',
      NEWEST_RELEASED: 'Najskôr vydané',
      OLDEST_RELEASED: 'Najneskoršie vydané',
      NEWEST_AIRED: 'Najskôr vysielané',
      OLDEST_AIRED: 'Najneskoršie vysielané',
      NEWEST_REPORTED: 'Najskôr hlásené',
      OLDEST_REPORTED: 'Najneskoršie hlásené',
      NEWEST_UPDATED: 'Najskôr aktualizované',
      OLDEST_UPDATED: 'Najneskoršie aktualizované'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'Ako môžem nahrať video?',
        TEXT: "Videá môžete nahrať v ponuke Správa obsahu. Vyberte si, či chcete nahrať film, seriál alebo iné video. Vyberte zodpovedajúcu položku v ponuke " +
          " na zvislej lište s navigáciou v ľavej časti obrazovky. Nahrať video môžete po kliknutí na tlačidlo Vytvoriť nový film/Seriál/Iné video alebo zadaním " +
          " názvu videa, ktoré chcete nahrať do vyhľadávacej lišty a výberom príslušného videa z výsledkov hľadania. Následne môžete vyplniť informácie o videu " +
          " buď ručne alebo s použitím informácií dostupných na TheMovieDB. Potom kliknutím na tlačidlo Správa súborov nahráte súbor s videom a titulkami."
      },
      DELETE_VIDEO: {
        TITLE: 'Ako môžem odstrániť video?',
        TEXT: "Video môžete odstrániť zo stránky s informáciami o videu. Kliknite na Správa súborov a vyberte ikonu červeného odpadkového koša. Rovnako ho možno odstrániť kliknutím na Upraviť video a výberom " +
          " Odstrániť video. Použit môžete aj Správcu súborov v ponuke Správa obsahu. Tu uvidíte všetky súbory, ktoré ste nahrali. Kliknite na " +
          " ikonu červeného odpadkového koša, čím súbor odstránite."
      },
      VIDEO_FORMATS: {
        TITLE: 'Ktoré formáty videa sú podporované?',
        TEXT: "Streama aktuálne podporuje iba formáty videa, ktoré podporuje prehrávač HTML5. Pomocou potiahnutia súboru do prázdneho panelu Vášho prehliadača môžete vyskúšať, či je Váš video súbor kompatibilný s HTML5 prehrávačom."
      },
      SUBTITLES: {
        TITLE: 'Ako môžem pridať titulky k videu?',
        TEXT: "Titulky k videu môžete pridať kliknutím na tlačidlo Správa súborov, ktoré nájdete na stránke s informáciami o videu. Tu môžete potiahnuť súbory s titulkami." +
          " V minulosti ste ich museli ručne previesť do kompatibilného formátu, ale to už neplatí! Teraz sa o to postará aplikácia."
      },
      INVITE_USERS: {
        TITLE: 'Ako môžem pozvať priateľov, aby so mnou sledovali pridané videá?',
        TEXT:"Videá môžete zdieľať s Vašimi priateľmi tak, že im pošlete pozvánku na pripojenie na Váš server Streama. Prejdite do ponuky Používatelia a kliknite na tlačidlo Pozvať používateľa. Vyplňte pozvánkový formulár a " +
          " vyberte rolu/e pozvaného. Používatelia s rolou Administrátor majú právo meniť používateľov a nastavenia. Používatelia s rolou Správca obsahu môžu upravovať obsah. Váš priateľ dostane upozornenie o pozvánke " +
          "v e-mailovej správe. S Vašimi priateľmi môžete tiež zdieľať video sedenie kliknutím na tlačidlo Zdieľať v prehrávači videa a zaslaním URL adresy sedenia."
      },
      BASE_URL: {
        TITLE: "Čo je to základná URL adresa a ako ju mám nastaviť?",
        TEXT: "Základná URL adresa sa používa vo videách a v odkaze s pozvánkou."
      },
      NOTIFICATIONS: {
        TITLE: "Čo sú notifikácie?",
        TEXT: "Priateľov, ktorým ste poslali pozvánku môžete posielať upozornenia pri nahraní videa prostredníctvom notifikácií. Odoslať ich môžete tak, že ich pridáte do poradia upozornení kliknutím na tlačidlo " +
          "Pridať notifikáciu, ktoré nájdete na stránke s informáciami o videu. Potom prejdite do ponuky Notifikácie a kliknite na tlačidlo Odoslať poradie."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Podporuje prehrávač videí klávesové skratky?",
        TEXT: "Áno. Pozastaviť/pokračovať: medzera. Správa hlasitosti: šípka hore/dole. Pretáčanie videa dozadu/dopredu: šípkv vľavo/vpravo. Rýchle pretáčanie:" +
          " control + šípka vľavo/vpravo. Celá obrazovka zap/vyp: alt + enter. Titulky zap/vyp: S, Stíšiť zvuk: M, Návrat na predchádzajúcu" +
          " obrazovku: delete alebo backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "Ako fungujú obľúbené žánre používateľa v Streame?",
        TEXT: "Už onedlho..."
      },
      USEFUL_LINKS: {
        TITLE: "Užitočné odkazy",
        TEXT: "Už onedlho..."
      }
    }
  });
});
