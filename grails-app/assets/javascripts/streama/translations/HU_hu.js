//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Translated by Nargren 09/12/19.
 */
angular.module('streama.translations').config(function ($translateProvider) {
  $translateProvider.translations('hu', {
    LOGIN: {
      TITLE: 'Jelentkezzen be',
      USERNAME: 'Felhasználónév',
      PASSWORD: 'Jelszó',
      FIRST_TIME_HINT: 'Első bejelentkezés? Próbálja meg az \'admin\'-t mindkét mezőbe.',
      SUBMIT: 'Bejelentkezés',
      SESSION_EXPIRED: 'Az ülése lejárt a legutóbbi aktivitás óta. Jelentkezzen be újra.'
    },
    DASHBOARD: {
      TITLE: 'Főoldal',
      TITLE_COUNTER_OF: 'of',
      RECOMMENDATIONS: 'Ajánlatok',
      NEW_RELEASES: 'Nemrég megjelent',
      CONTINUE_WATCHING: 'Megtekintés folytatása',
      DISCOVER_SHOWS: 'TV sorozatok felfedezése',
      DISCOVER_MOVIES: 'Filmek felfedezése',
      DISCOVER_OTHER_VIDEOS: 'Egyéb videók felfedezése',
      SORT: 'Szűrés:',
      SEARCH_BY_NAME: 'Név szerinti szűrés...',
      FILTER_BY_TAG: 'Címke szerinti szűrés...',
      FILTER_BY_GENRE: 'Műfaj szerinti szűrés...',
      BROWSE_GENRES: 'Böngészés',
      LOOKING_AT_GENRE: 'Ezt a műfajt nézi jelenleg:',
      MARK_COMPLETED: 'Megjelölés megnézettként',
      NO_TVSHOWS_FOUND: 'Nincsenek elérhető TV sorozatok ',
      NO_WATCHLIST_FOUND: 'Még nincs itt',
      NO_MOVIES_FOUND: 'Nincsenek elérhető filmek'
    },
    VIDEO: {
      RELEASED: 'Megjelent',
      IMDB: 'IMDB',
      RATING: 'Értékelés',
      STATUS: 'Status',
      STATUS_VALUE: {
        'completed': 'Completed',
        'viewing': 'Viewing',
        'unviewed': 'Unviewed'
      },
      VOTES: 'Szavazatok',
      OVERVIEW: 'Összefoglalás',
      GENRE: 'Műfaj',
      TRAILER: 'Előzetes',
      SEASON: 'Évad',
      SUBTITLES: 'Feliratok',
      NO_SUBTITLE: 'Nincs felirat',
      SUBTITLE_SIZE: 'Felirat méret',
      VIDEO_FILES: 'Videó források',
      UPNEXT: 'Most következik...'
    },

    MESSAGES: {
      SHARE_SOCKET: ' Ha egy új ülést nyit, vissza lesz irányítva ehhez a videólejátszóhoz, de egy egyedi ülés-azonosítót fog kapni. Ossza meg ezt az azonosítót (URL-t) ismerőseivel, hogy egyidőben élvezhessék a filmet!',
      FILE_MISSING: 'Probléma merült fel ezzel a tartalommal. Úgy tűnik, eltávolította a kapcsolódó videófájlt.',
      CODEC_PROBLEM: 'Probléma van a videó hozzáadásával a lejátszóhoz. Ez valószínüleg egy kódek probléma. Próbálja meg átkonvertálni a videót egy HTML5-kompatibilitis kódekformátumba, majd pedig távolítsa el a videót és adja hozzá újra. Ha a kódekkel nincsen probléma, ellenőrizze a szerver hibaüzeneteit és az alap URL-t a beállításoknál.',
      WRONG_BASEPATH: 'A videó rossz alap útvonallal jelenik meg, viszont ön ezt az oldalt nézi "{{basePath}}". Bizonyosodjon meg róla, hogy az alapértelmezett útvonal helyes és hogy ezt használja az alkalmazáshoz.',
      FILE_IN_FS_NOT_FOUND: 'A videó nem található egyik elérhető útvonalon sem. Ellenőrizze a beállításokban és a fájlrendszerben, hogy a fájlok elérhetőek legyenek az alkalmazás számára.'
    },
    MANAGE_CONTENT: 'Tartalom kezelése',
    MANAGE_SUB_PROFILES: 'Profilok kezelése',
    WHOS_WATCHING: 'Ki van itt?',
    ADD_SUB_PROFILE: 'Profil létrehozása',
    EDIT_BTN: 'Szerkesztés',
    DONE_BTN: 'Kész',
    SAVE_BTN: 'Mentés',
    CREATE_BTN: 'Létrehozás',
    CANCEL_BTN: 'Mégse',
    DELETE_BTN: 'Törlés',
    ENTER_NAME: 'Név megadása',
    EDIT_PROFILE: 'Profil szerkesztése',
    CREATE_PROFILE: 'Profil létrehozása',
    ADMIN: 'Adminisztrátor',
    HELP: 'Súgó',
    HELP_FAQ: 'Súgó / GYIK',
    PROFILE_SETTINGS: 'Felhasználói beállítások',
    LOGOUT: 'Kijelentkezés',
    CHANGE_PASSWORD: 'Jelszó megváltoztatása',
    LANGUAGE_en: 'Angol/English',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Orosz/Russian',
    LANGUAGE_de: 'Német/German',
    LANGUAGE_fr: 'Francia/French',
    LANGUAGE_es: 'Spanyol/Spanish',
    LANGUAGE_kr: 'Koreai/Korean',
    LANGUAGE_nl: 'Holland/Dutch',
    LANGUAGE_pt: 'Portugál/Portuguese',
    LANGUAGE_ja: 'Japán/Japanese',
    LANGUAGE_it: 'Olasz/Italian',
    LANGUAGE_da: 'Dán/Danish',
    LANGUAGE_ar: 'Arab/Arabic',
    LANGUAGE_hu: 'Magyar',
		LANGUAGE_sk: 'Slovensky/Slovak',
    PROFIlE: {
      USERNAME: 'Felhasználónév',
      FULL_NAME: 'Teljes név',
      LANGUAGE: 'Nyelv',
      PAUSE_ON_CLICK: 'Videó szüneteltetése katintásra',
      FAVORITE_GENRES: 'Kedvenc műfajok',
      AMOUNT_OF_MEDIA_ENTRIES: 'Főoldalon lévő vidók száma (a \"Több betöltése\" előtt)',
      SAVE: 'Profil mentése',
      PASS: 'Jelszó',
      OLD_PASS: 'Régi jelszó',
      NEW_PASS: 'Új jelszó',
      NEW_PASS_PLACEHOLDER: 'Új jelszó  (min. 6 karakter)',
      REPEAT_PASS: 'Jelszó ismétlése',
      PASS_ERROR_EMPTY: 'A jelszó nem lehet üres',
      PASS_ERROR_LENGTH: 'A jelszó legalább 6 karakter kell legyen',
      PASS_ERROR_REPEAT: 'A jelszavaknak egyezniük kell',
      SAVE_PASS: 'Új jeszó beállítása'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Legújabban hozzáadott',
      OLDEST_ADDED: 'Legrégebben hozzáadott',
      NEWEST_RELEASED: 'Legújabban megjelent',
      OLDEST_RELEASED: 'Legrégebben megjelent',
      NEWEST_AIRED: 'Legújabban vetített',
      OLDEST_AIRED: 'Legrégebben vetített',
      NEWEST_REPORTED: 'Legújabban bejelentett',
      OLDEST_REPORTED: 'Legrégebben bejelentett',
      NEWEST_UPDATED: 'Legújabban frissített',
      OLDEST_UPDATED: 'Legrégebben frissített'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'Hogyan tölthetek fel egy vidót?',
        TEXT: "Videók a Tartalom kezelése menüből tölthetőek fel, ahol kiválaszthatja, hogy Filmet, TV sorozatot vagy Egyéb videót szeretne hozzáadni. Kattintson a megfelelő" +
          " menüpontra a függőleges navigációs sávon a képernyő bal oldalán. Itt hozzáadhat egy filmet ha az Új Film / TV sorozat / Egyéb videó gombra kattint vagy amennyiben beírja" +
          " a videó címét a keresőmezőbe majd pedig kiválasztja a kívánt találatot. Ezután kitöltheti a videó adatait kézzel vagy pedig letöltheti ezt autómatikusan a TheMovieDB" +
          " oldalról. Végül pedig feltöltheti a videófájlt és a feliratokat a Fájlok kezelése gombra kattintva."
      },
      DELETE_VIDEO: {
        TITLE: 'Hogyan törölhetek le egy videót?',
        TEXT: "Egy videó a saját információs oldalán keresztül törölhető le. Itt válassza ki a Fájlok kezelése opciót majd pedig kattintson a piros szemeteskosár ikonra. Egy másik" +
          " lehetőség a Film szerkesztése menüponton belül a Film törlése opció. A Fájlok kezelése menüpont is használató, ami a Tartalom kezelése menün belül található. Itt látható" +
          " az összes feltöltött tartalom, ahol ismét a piros szemeteskosárra kattintva törölhető egy kiválasztott fájl."
      },
      VIDEO_FORMATS: {
        TITLE: 'Melyek a támogatott videóformátumok?',
        TEXT: "A Streama jelenleg csak a HTML5 által is támogatott videóformátumokat támogatja. Egy videófájl kompatibilitása tesztelhető amennyiben a kiválasztott fájlt egy" +
        " kattintással belehúzza egy üres böngészőablakba (drag and drop)."
      },
      SUBTITLES: {
        TITLE: 'Hogyan adhatok feliratot egy videóhoz?',
        TEXT: "Feliratok a Fájlok kezelése gombra kattintás után, a videó információs oldalán adhatók hozzá. Ide egy kattintással behúzhatóak a feliratfájlok (drag and drop)." +
          " Mindeddig a megfelelő formátumba kellett konvertálni a fájlokat, de ez többé már nem szükséges. Az alkalmazás ezt mostantól megteszi ön helyett."
      },
      INVITE_USERS: {
        TITLE: 'Hogyan hívhatom meg ismerőseimet, hogy megnézhessék a megoszott videóimat?',
        TEXT:"A filmek megosztásához meg kell hogy hívja ismerőseit az ön által futtatott Streama-ra. Menjen a Felhasználók menübe majd pedig kattintson a Felhasználó meghívása gombra." +
          " Töltse ki a megfelelő mezőket és adja meg a meghívott személy beosztását. Adminisztrátor szintű felhasználók szerkeszthetik más felhasználók beállításait illetve új" +
          " felhasználókat is beállíthatnak. Felhasználók a Tartalomkezelő beosztásban pedig szerkeszthetik a feltöltött tartalmakat. Az ismerősei emailben kapják meg a meghívást. Ezen " +
          " felül, kiválasztott (egyedi) videó üléseket is megoszthat ismerőseivel amennyiben a videólejátszó Megosztás gombjára kattint majd továbbítja a kapot URL-t nekik."
      },
      BASE_URL: {
        TITLE: "Mi az alapértelmezett URL és hogyan állítsam be?",
        TEXT: "Az alapértelmezett URL a meghívó emaileknél játszik szerepet ahol a Streama szerver címét mutatja."
      },
      NOTIFICATIONS: {
        TITLE: "Mik azok az üzenetek?",
        TEXT: "A feltöltött vidókról értesitő üzenetet küldhet ismerőseinek. Ehhez adjon hozzá egy új kimenő üzenetet az Ùj üzenet gombra kattinva, amely a videó információs oldalán" +
          " található. Az üzenet elküldéséhez nyissa meg az Üzenetek menüpontot majd pedig kattintson az Üzenetek elküldése gombra."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Vannak a videólejátszónak elérhető gyorsbillentyű kombinációi?",
        TEXT: "Igen, ezek a következők. Szünet/folytatás: szövegköz. Hangerő szabályozása: felfelés és lefelé nyilak. Rövid ugrás előre/vissza: balra és jobbra nyilak." +
          " Hosszabb ugrás előre/vissza: Ctrl + balra és jobbra nyilak. Teljes képernyő be/ki: Alt + Enter. Feliratok ki/be: S. Némítás: M. Visszatérés az előző" +
          " képernyőhöz: Delete vagy Backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "Hogyan befolyásolják a felhasználók kedvenc műfajai a Streama-t?",
        TEXT: "Hamarosan..."
      },
      USEFUL_LINKS: {
        TITLE: "Hasznos linkek",
        TEXT: "Hamarosan..."
      }
    }
  });
});
