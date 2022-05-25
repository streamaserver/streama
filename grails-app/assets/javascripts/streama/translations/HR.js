//= wrapped
angular.module('streama.translations').config(function ($translateProvider) {
  $translateProvider.translations('hr', {
      LOGIN: {
        TITLE: "Molimo prijavite se",
        USERNAME: "Korisničko Ime",
        PASSWORD: "Lozinka",
        FIRST_TIME_HINT: "Prva prijava? Pokušajte 'admin' za oba polja.",
        SUBMIT: "Prijavi se",
        SESSION_EXPIRED: "Vaša je sesija istekla od vaše posljednje aktivnosti. Molimo prijavite se ponovo."
      },
      DASHBOARD: {
        HOME: "Početna",
        TV_SHOWS: "TV Serije",
        MOVIES: "Filmovi",
        MY_LIST: "Moj popis",
        TITLE: "Nadzorna ploča",
        TITLE_COUNTER_OF: 'of',
        RECOMMENDATIONS: "Preporuke za vas",
        NEW_RELEASES: "Nova izdanja",
        CONTINUE_WATCHING: "Nastavite gledati",
        DISCOVER_SHOWS: "Otkrijte serije",
        DISCOVER_MOVIES: "Otkrijte Filmove",
        DISCOVER_OTHER_VIDEOS: "Otkrijte ostale videe",
        SORT: "Sortiraj:",
        SEARCH_BY_NAME: "Pretraži po naslovu...",
        FILTER_BY_TAG: "Filtriraj po oznaci...",
        FILTER_BY_GENRE: "Filtriraj po žanru...",
        BROWSE_GENRES: "Pretraži žanrove",
        LOOKING_AT_GENRE: "Gledate žanr:",
        MARK_COMPLETED: "Označi pogledanim",
        NO_TVSHOWS_FOUND: "Nema dostupnih TV serija",
        NO_WATCHLIST_FOUND: "Ovdje nema ničega.",
        NO_MOVIES_FOUND: "Nema dostupnih filmova",
        WATCHLIST: "Popis gledanja"
      },
      VIDEO: {
        RELEASED: "Izdano",
        IMDB: "IMDB",
        RATING: "Rating",
        STATUS: "Status",
        STATUS_VALUE: {completed: "Pogledano", viewing: "Gleda se", unviewed: "Nepregledano"},
        VOTES: "Glasovi",
        OVERVIEW: "Pregled",
        GENRE: "Žanr",
        TRAILER: "Trailer",
        SEASON: "Sezona",
        SUBTITLES: "Podnaslovi",
        NO_SUBTITLE: "Nema podnaslova",
        SUBTITLE_SIZE: "Veličina podnaslova",
        VIDEO_FILES: "Video izvori",
        UPNEXT: "Slijedi..."
      },
      MESSAGES: {
        SHARE_SOCKET: "Stvaranjem nove sesije bit ćete preusmjereni natrag na ovu stranicu, ali ovaj put ćete na url-u imati jedinstveni ID sesije. Podijelite ovo sa svojim prijateljima kako biste s njima imali sinkronizirano iskustvo gledanja!",
        FILE_MISSING: "Postoji problem s ovim sadržajem. Čini se da ste uklonili povezanu video datoteku.",
        CODEC_PROBLEM: "Čini se da postoji problem s dodavanjem video datoteke u uređaj za reprodukciju. To je najvjerojatnije zbog problema s kodekom. Pokušajte ga pretvoriti u kompatibilni HTML5 kodek, uklonite trenutno priloženu datoteku i ponovo je dodajte. Ako su kodeci u redu, provjerite zapis pogrešaka poslužitelja i osnovni URL u postavkama.",
        WRONG_BASEPATH: 'Vaš videozapis uključen je pogrešnim osnovnim putem, ali stranicu pregledavate putem "{{basePath}}". Obavezno postavite točan osnovni put u postavkama i koristite li ga za pregledavanje programa.',
        FILE_IN_FS_NOT_FOUND: "Vaš videozapis nije moguće pronaći ni na jednom mjestu dostupnom aplikaciji. Provjerite postavke i datotečni sustav kako biste bili sigurni da je datotekama program dostupan."
      },
      MANAGE_CONTENT: "Upravljanje sadržajem",
      MANAGE_SUB_PROFILES: "Upravljanje profilima",
      WHOS_WATCHING: "Tko gleda?",
      ADD_SUB_PROFILE: "Dodaj profil",
      EDIT_BTN: "Uredi",
      DONE_BTN: "Gotovo",
      SAVE_BTN: "Spremi",
      CREATE_BTN: "Kreiraj",
      CANCEL_BTN: "Otkaži",
      DELETE_BTN: "Obriši",
      ENTER_NAME: "Upiši ime",
      EDIT_PROFILE: "Uredi profil",
      CREATE_PROFILE: "Kreiraj profil",
      ADMIN: "Admin",
      HELP: "Pomoć",
      HELP_FAQ: "POMOĆ / FAQ",
      PROFILE_SETTINGS: "Korisničke postavke",
      LOGOUT: "Odjavi se",
      CHANGE_PASSWORD: "Promijeni lozinku",
      LANGUAGE_en: "Engleski",
      LANGUAGE_cn: "Kineski/\u4e2d\u6587",
      LANGUAGE_ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439/Ruski",
      LANGUAGE_de: "Njemački",
      LANGUAGE_fr: "Francuski",
      LANGUAGE_es: "Španjolski",
      LANGUAGE_kr: "Koreski",
      LANGUAGE_nl: "Nizozemski",
      LANGUAGE_pt: "Portugalski",
      LANGUAGE_ja: "Japanski",
      LANGUAGE_it: "Talijanski",
      LANGUAGE_da: "Danski",
      LANGUAGE_ar: "Arapski",
      LANGUAGE_hu: "Mađarski",
		  LANGUAGE_sk: "Slovensky/Slovak",
      PROFIlE: {
        USERNAME: "Korisničko ime",
        FULL_NAME: "Puno ime",
        LANGUAGE: "Jezik",
        PAUSE_ON_CLICK: "Pauziraj video na klik",
        FAVORITE_GENRES: "Omiljeni žanrovi",
        AMOUNT_OF_MEDIA_ENTRIES: 'Količina videozapisa na nadzornoj ploči (prije "Učitaj više")',
        SAVE: "Spremi profil",
        PASS: "Lozinka",
        OLD_PASS: "Stara lozinka",
        NEW_PASS: "Nova lozinka",
        NEW_PASS_PLACEHOLDER: "Nova lozinka  (min. 6 znakova)",
        REPEAT_PASS: "Ponovi lozinku",
        PASS_ERROR_EMPTY: "Lozinka ne može biti ništa",
        PASS_ERROR_LENGTH: "Lozinka mora sadržavati barem 6 znakova",
        PASS_ERROR_REPEAT: "Lozinke se moraju podudarati",
        SAVE_PASS: "Postavi novu lozinku"
      },
      SORT_OPTIONS: {
        AZ: "A-Z",
        ZA: "Z-A",
        NEWEST_ADDED: "Zadnje dodano",
        OLDEST_ADDED: "Prvo dodano",
        NEWEST_RELEASED: "Najnovije izdanje",
        OLDEST_RELEASED: "Najstarije izdanje",
        NEWEST_AIRED: "Najnovije emitirano",
        OLDEST_AIRED: "Najstarije emitirano",
        NEWEST_REPORTED: "Najnovije prijavljeno",
        OLDEST_REPORTED: "Najstarije prijavljeno",
        NEWEST_UPDATED: "Najnovije ažurirano",
        OLDEST_UPDATED: "Najstarije ažurirano"
      },
      FAQ: {
        UPLOAD_VIDEO: {
          TITLE: "Kako mogu prenijeti videozapis?",
          TEXT: "Videozapise možete prenijeti na izbornik Upravljanje sadržajem. Odaberite želite li prenijeti film, TV emisiju ili drugi video. Kliknite odgovarajuću opciju podizbornika na vertikalnoj navigacijskoj traci s lijeve strane zaslona. Videozapis možete prenijeti klikom na gumb Stvori novi film / TV emisiju / Drugi videozapis ili upisivanjem naziva videozapisa koji želite prenijeti na traku za pretraživanje i odabirom odgovarajućeg filma iz rezultata pretraživanja. Nakon toga, podatke o videozapisu možete popuniti ručno ili učitavanje podataka iz TheMovieDB. Nakon toga, datoteke videozapisa i titlova možete prenijeti klikom na gumb Upravljanje datotekama."
        },
        DELETE_VIDEO: {
          TITLE: "Kako mogu izbrisati videozapis?",
          TEXT: "Video možete izbrisati tako da odete na stranicu s informacijama o videozapisu i kliknete Manage Files i odaberete ikonu crvenog koša za smeće. Klik na Edit Movie i odabir Delete Movie još je jedan način za to. Također možete koristiti Upravitelj datoteka koji se nalazi u izborniku Upravljanje sadržajem. Tamo možete vidjeti sve datoteke koje ste prenijeli. Kliknite ikonu crvene kante za smeće da biste izbrisali datoteku."
        },
        VIDEO_FORMATS: {
          TITLE: "Koji su video formati podržani?",
          TEXT: "Croflix trenutno podržava samo formate video datoteka koje podržava HTML5 player. Možete testirati je li vaša video datoteka kompatibilna s HTML5 playerom povlačenjem i ispuštanjem datoteke na praznu karticu preglednika."
        },
        SUBTITLES: {
          TITLE: "Kako mogu dodati titlove videozapisima?",
          TEXT: "Videozapisima možete dodati titlove klikom na gumb Upravljanje datotekama koji se nalazi na stranici s informacijama o videozapisu. Tamo možete povući i ispustiti datoteke titlova. Prije ste ih morali ručno pretvoriti u kompatibilni format datoteke, ali više ne! Sada aplikacija to rješava umjesto vas."
        },
        INVITE_USERS: {
          TITLE: "Kako mogu pozvati prijatelje da gledaju videozapise skupa samnom?",
          TEXT: "Svoje videozapise možete podijeliti s prijateljima pozivom da koriste Croflix. Idite na izbornik Korisnici i kliknite gumb Pozovi korisnika. Ispunite obrazac za pozivnicu i odaberite uloge pozvanog. Korisnici s ulogom Administrator mogu uređivati korisnike i postavke. Korisnici s ulogom Content Manager mogu uređivati sadržaj. O pozivu će vaš prijatelj biti obaviješten e-poštom. Također možete podijeliti video sesije sa svojim prijateljima tako što ćete kliknuti gumb Podijeli videoplayer i povezati URL sesije s njima."
        },
        BASE_URL: {
          TITLE: "Koji je osnovni URL i kako ga treba konfigurirati?",
          TEXT: "Osnovni URL koristi se za videozapise i vezu u e-poruci s pozivnicom."
        },
        NOTIFICATIONS: {
          TITLE: "Što su obavijesti?",
          TEXT: "Pozvane prijatelje možete obavijestiti o prenesenim videozapisima slanjem poruka obavijesti. Možete ih poslati tako da im dodate svoj red obavijesti klikom na gumb Dodaj obavijest koji se nalazi na stranici s informacijama o vašem videozapisu i odlaskom na izbornik Obavijesti i klikom na gumb Pošalji red čekanja."
        },
        VIDEO_PLAYER_SHORTCUTS: {
          TITLE: "Ima li video uređaj tipke prečaca?",
          TEXT: "Da. Pauza / pauza: razmak. Upravljanje glasnoćom: tipke sa strelicama gore ili dolje. Preskakanje videozapisa naprijed / natrag: tipke sa strelicama lijevo ili desno. Dugo preskakanje: kontrola + tipke sa strelicama lijevo ili desno. Uključivanje / isključivanje preko cijelog zaslona: alt + enter. Uključivanje / isključivanje titlova: S, Prigušivanje zvuka: M, Povratak na prethodni zaslon: brisanje ili vraćanje unazad."
        },
        FAVORITE_GENRES: {TITLE: "Kako korisnici dodaju omiljeni žanr?", TEXT: "Dolazi uskoro..."},
        USEFUL_LINKS: {TITLE: "Korisne poveznice", TEXT: "Dolazi uskoro..."}
      }
    }
  );
});
