//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(function ($translateProvider) {
  $translateProvider.translations('tk', {
    LOGIN: {
      TITLE: 'Haýyş ulgama giriň',
      USERNAME: 'Login',
      PASSWORD: 'Parol',
      FIRST_TIME_HINT: 'Ulgama ilkinji gezek girýäňizmi? Ilki meýdançada \'admin\' ulanyjy bilen synanşyp görüň.',
      SUBMIT: 'Giriş',
      SESSION_EXPIRED: 'Ulgamda siziň iň soňky hereketiňiziň dowamlylygy tamamlandy. Ulgama gaýtadan girmegiňizi haýyş edýäris.'
    },
    DASHBOARD: {
      HOME: 'Baş sahypa',
      TV_SHOWS: 'Bildirişler',
      MOVIES: 'Wideolar',
      MY_LIST:'Meniň sahypam',
      TITLE: 'Esasy Sahypa',
      TITLE_COUNTER_OF: '-',
      RECOMMENDATIONS: 'Size berilýän maslahatlar',
      NEW_RELEASES: 'Täze görnüşleri',
      CONTINUE_WATCHING: 'Dowam etmek',
      DISCOVER_SHOWS: 'Gepleşikler',
      DISCOVER_MOVIES: 'Kinofilmler',
      DISCOVER_OTHER_VIDEOS: 'Başga wideo şekiller',
      SORT: 'Saýhalla:',
      SEARCH_BY_NAME: 'Wideonyň adyna göra saýhalla...',
      FILTER_BY_TAG: 'Wideonyň tegine göra saýhalla...',
      FILTER_BY_GENRE: 'Wideonyň žanrna göra saýhalla...',
      BROWSE_GENRES: 'Žanr saýla',
      LOOKING_AT_GENRE: 'Siz şu žanry görýärsiňiz:',
      MARK_COMPLETED: 'Tamamlananlary belgile',
      NO_TVSHOWS_FOUND: 'Hiç hili Gepleşik elýeterli däl',
      NO_WATCHLIST_FOUND: 'Hiç hili maglumat ýok',
      NO_MOVIES_FOUND: 'Hiç hili Kinofilm elýeterli däl',
      WATCHLIST: 'Görülmeli sanaw'
    },
    VIDEO: {
      RELEASED: 'Çykan wagty',
      IMDB: 'IMDB',
      RATING: 'Meşhurlyk derejesi',
      STATUS: 'Statusy',
      STATUS_VALUE: {
        'completed': 'Tamamlandy',
        'viewing': 'Görülýär',
        'unviewed': 'Görülmedik'
      },
      VOTES: 'Berlen sesler',
      OVERVIEW: 'Gysgaça',
      GENRE: 'Žanr',
      TRAILER: 'Bildiriş',
      SEASON: 'Möwsüm',
      SUBTITLES: 'Hat ýazgylar',
      NO_SUBTITLE: 'Hat ýazgysy ýok',
      SUBTITLE_SIZE: 'Hat ýazgysynyň möçberi',
      VIDEO_FILES: 'Wideonyň çeşmesi',
      UPNEXT: 'Indiki...'
    },

    MESSAGES: {
      SHARE_SOCKET: 'Siz ulgama gaýtadan girseňiz hem ýene-de şu sahypa ýüzlenersiňiz, ýöne bu gezek size tapawutly ID beriler. Eger siz başgalar bilen birbada meňzeş wideo görmek isleseňiz, siz öz ID-ňizi paýlaşyp bilersiňiz!',
      FILE_MISSING: 'Bu maglumatda käbir kemçilikler ýüze çykdy. Siz ýalňyşlyk bilen bu faýlyň çeşmesini öçüren bolmagyňyz ahtimal.',
      CODEC_PROBLEM: 'Wideo görkezijä täze wideo goşmaklyk üçin kemçilikler ýüze çykdy. Bu kemçilik, kod bilen baglanyşykly bolmagy ähtimal. Faýly HTML5 bilen sazlaşykly işlär ýaly edit, gaýtadan ýükläp görüň.',
      WRONG_BASEPATH: 'Siz ýalňyş salga girizdiňiz',
      FILE_IN_FS_NOT_FOUND: 'Siziň girizen salgyňyzdaky wideo tapylmady, salgyny dogrulap gaýtadan synanyşyp görüň.'
    },
    MANAGE_CONTENT: 'Wideolary dolandyr',
    MANAGE_SUB_PROFILES: 'Şahsy maglumatlary dolandyr',
    WHOS_WATCHING: 'Häzir kim görýär?',
    ADD_SUB_PROFILE: 'Şahsy maglumat goş',
    EDIT_BTN: 'Üýtget',
    DONE_BTN: 'Tamamlandy',
    SAVE_BTN: 'Ýatda sakla',
    CREATE_BTN: 'Döret',
    CANCEL_BTN: 'Bes et',
    DELETE_BTN: 'Öçürmek',
    ENTER_NAME: 'At giriz:',
    EDIT_PROFILE: 'Şahsy maglumaty üýtget',
    CREATE_PROFILE: 'Şahsy maglumat döret',
    ADMIN: 'Administrator',
    HELP: 'Kömek',
    HELP_FAQ: 'KÖMEK / Iň köp soralýan soraglar',
    PROFILE_SETTINGS: 'Ulanyjynyň Sazlamalary',
    LOGOUT: 'Çykyş',
    CHANGE_PASSWORD: 'Paroly üýtgetmek',
    LANGUAGE_en: 'English',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russian',
    LANGUAGE_de: 'Deutsch/German',
    LANGUAGE_fr: 'Français/French',
    LANGUAGE_es: 'Español/Spanish',
    LANGUAGE_kr: '한국어/Korean',
    LANGUAGE_nl: 'Nederlands/Dutch',
    LANGUAGE_pt: 'Português/Portuguese',
    LANGUAGE_ja: '日本語/Japanese',
    LANGUAGE_it: 'Italiano/Italian',
    LANGUAGE_da: 'Dansk/Danish',
    LANGUAGE_ar: 'عربى/Arabic',
    LANGUAGE_hu: 'Magyar/Hungarian',
    LANGUAGE_tr: "Turkish/Türkçe",
    LANGUAGE_tk: 'Turkmen/Türkmençe',
    PROFIlE: {
      USERNAME: 'Ulanyjy ady',
      FULL_NAME: 'Doly ady',
      LANGUAGE: 'Dili',
      PAUSE_ON_CLICK: 'Ekrana basylanda wideony togtat',
      FAVORITE_GENRES: 'Halanan žanrlar',
      AMOUNT_OF_MEDIA_ENTRIES: 'Esasy sahypadaky ýüklenilmeli wideolaryň sany',
      SAVE: 'Şahsy maglumatlary ýatda sakla',
      PASS: 'Açar söz',
      OLD_PASS: 'Öňki açar söz',
      NEW_PASS: 'Häzirki açar söz',
      NEW_PASS_PLACEHOLDER: 'Täze açar söz  (azyndan 6 simwol)',
      REPEAT_PASS: 'Açar sözüni gaýtalaň',
      PASS_ERROR_EMPTY: 'Açar sözi boş goýup bolmaýar',
      PASS_ERROR_LENGTH: 'Açar söz azyndan 6 simwol bolmaly',
      PASS_ERROR_REPEAT: 'Açar sözüňiz gabat gelmedi',
      SAVE_PASS: 'Täze açar söz goýuň'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Iň soňky goşulan',
      OLDEST_ADDED: 'Ilkinji goşulan',
      NEWEST_RELEASED: 'Iň soňkysy',
      OLDEST_RELEASED: 'Ilkinjisi',
      NEWEST_AIRED: 'Golaýda köp gorülen',
      OLDEST_AIRED: 'Ilkinji köp görülen',
      NEWEST_REPORTED: 'Golaýda çykan',
      OLDEST_REPORTED: 'Ilkinji çykan',
      NEWEST_UPDATED: 'Golaýda täzelenen',
      OLDEST_UPDATED: 'Ilkinji täzelenen'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'Nädip wideo ýükläp bilerin?',
        TEXT: "Siz täze wideolary, 'Sahypany Dolandyr' penjiresi arkaly ýükläp bilersiňiz. Ol ýerde ilki bilen wideonyň görnüşini saýlamaly, meselem Kinofilm, Gepleşik ýa-da başga" + 
        " bir wideo. Soňra 'Döretmek' düwmesine basyň. Soňra ol wideo barada giňişleýin maglumat ýazarsyňyz. Bu ýerde, 'Faýllary Dolandyrmak' düwmesi arkaly,  siz goýmak isleýän wideoňyzyň" + 
        " hat ýazgysyny (subtitle) hem ýükläp bilersiňiz."
      },
      DELETE_VIDEO: {
        TITLE: 'Nädip wideony öçürip bilerin?',
        TEXT: "Wideony öçürmek üçin, wideonyň giňişleýin maglumat sahypasyna girip, 'Faýllary Dolandyrmak' penjiresinden, gyzyl reňki zibil gutynyň şekiljigine basmak arkaly öçürip bilersiňiz."
      },
      VIDEO_FORMATS: {
        TITLE: 'Bu ulgama haýsy formatdaky wideolary ýüklemek mümkin?',
        TEXT: "Häzirlikçe ulgam diňe HTML5 tehnologiýasynyň goldaýan wideo formatlaryny açmaga ukyply. Eger siz HTML5 tehnologiýasy haýsy formatlary goldaýanlygyny bilmek üçin, wideony syçanjyk" +
        " bilen tutup, browseriň üstüne goýsaňyz, browser şol wideony açsa, diýmek şol wideo HTML5 tehnologiýasy tarapyndan goldanýar."
      },
      SUBTITLES: {
        TITLE: 'Nädip wideonyň hat ýazgysyny (subtitle) ýükläp bilerin ?',
        TEXT: "Wideonyň hat ýazgysyny, wideonyň giňişleýin maglumat penjiresinden, 'Faýllary Dolandyrmak' düwmesi arkaly ýükläp bilersiňiz. Bu ýere siz, hat ýazgyly faýlyňyzy, syçanjyk arkaly tutup," +
        " bu meýdançada  goýup bilersiňiz. (Degişli sazlamalar, ulgam tarapyndan awtomatiki ýagdaýda ýerine ýetirilýär)." 
      },
      INVITE_USERS: {
        TITLE: 'Nädip başgalar bilen wideo paýlaşyň bilerin ?',
        TEXT:"Siz öz wideolaryňyzy başgalar bilen paýlaşyp üçin, 'Ulanyjylar' menýusyna gidip, 'Ulanyjy Çagyrmak' düwmesine basmaly. Ol ýerdäki maglumatlary dolduranyňyzdan soňra, ol ulanyjylara" +
        " mümkinçiliklerini çäklendirersiňiz. 'Dolandyryjy' hukuk bilen döredilen ulanyjylar, ähli sazlamalara üýtgeşme girizip biler. 'Maglumat Dolandyryjy' hukuk bilen döredilen ulanyjylar, wideo" +
        " degişli sazlamalary üýtgedip biler. Siziň wideo paýlaşan kişileriňize duýduryş habary e-poçta arkaly iberiler. Hatda siz wideonyň sessiýasyny hem, 'Paýlaş' düwmesi arkaly hem paýlaşyp bilersiňiz."
      },
      BASE_URL: {
        TITLE: "Esasy salgy (URL) näme, ony nähili üýtgedip bolar?",
        TEXT: "Esasy salgy wideolary saklanýan ýerini görkezýär, şeýle hem e-poçtalarda iberilen duýduryşlarda şol salgy ýerleşdirilýär."
      },
      NOTIFICATIONS: {
        TITLE: "Duýduryşlar näme?",
        TEXT: "Siz täze ýüklän wideolaryňyz barada dostlaryňyza habar berip bilersiňiz. Duýduryş ibermek üçin, wideonyň giňişleýin maglumat penjiresinden, 'Duýduryş Goş' düwmesi arkaly nobata goýup bilersiňiz." +
        " Soňra 'Duýduryşlar' penjiresinden, 'Nobatdaky duýduryşlary ibermek' arkaly iberip bilersiňiz."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: 'Ulgamyň wideo işledijisinde (player) gysga ýollary ulanmak mümkinmi?',
        TEXT: "Elbetde. Sakla/Dowam et: Boş (probel) düwmesi. Ses sazlamalary üçin: aşak/ýokaryk düwmeler. Wideony saratmak üçin: sag/çep düwmeler. Uzak saratmak üçin: Ctr+sag/çep düwmeleri. Doly ekran etmek üçin:" +
        " Alt+enter düwmeleri. Hat ýazgyzyny görkezmek üçin: S düwmesi. Sessiz: M düwmesi. Geçenki ekrana gitmek üçin: delete ýa-da backspace düwmesi."
      },
      FAVORITE_GENRES: {
        TITLE: "Ulanyjynyň halaýan žanrlaryna görä ulgam nähili mümkinçilikler döredip berýär?",
        TEXT: "Häzir elýeterli däl..."
      },
      USEFUL_LINKS: {
        TITLE: "Peýdaly salgylar",
        TEXT: "Häzir elýeterli däl..."
      }
    }
  });
});
