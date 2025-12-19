//= wrapped
/**
 * Created by panlazy on 28/09/20.
 */
angular.module("streama.translations").config(function ($translateProvider) {
  $translateProvider.translations("tr", {
    LOGIN: {
      TITLE: "Giriş Yap",
      USERNAME: "Kullanıcı adı",
      PASSWORD: "Şifre",
      FIRST_TIME_HINT:
        "İlk defa mı giriş yapıyorsun? Kullanıcı adı ve şifre için 'admin'i dene.",
      SUBMIT: "Giriş",
      SESSION_EXPIRED:
        "Son etkinliğinizden bu yana oturumunuz sona erdi. Lütfen tekrar giriş yapın.",
    },
    DASHBOARD: {
      HOME: "Ana Sayfa",
      TV_SHOWS: "Diziler",
      MOVIES: "Filmler",
      MY_LIST: "Listem",
      TITLE: "Sayfam",
      TITLE_COUNTER_OF: 'of',
      RECOMMENDATIONS: "Senin için öneriler",
      NEW_RELEASES: "Yeni Çıkanlar",
      CONTINUE_WATCHING: "İzlemeye devam et",
      DISCOVER_SHOWS: "Dizileri Keşfet",
      DISCOVER_MOVIES: "Filmleri Keşfet",
      DISCOVER_OTHER_VIDEOS: "Diğer Videoları Keşfet",
      SORT: "Sırala:",
      SEARCH_BY_NAME: "İsme göre ara...",
      FILTER_BY_TAG: "Etikete göre ara...",
      FILTER_BY_GENRE: "Türe göre ara...",
      BROWSE_GENRES: "Türlere Gözat",
      LOOKING_AT_GENRE: "Şu türe göz atıyorsun:",
      MARK_COMPLETED: "Tamamlandı olarak işaretle",
      NO_TVSHOWS_FOUND: "Dizi mevcut değil",
      NO_WATCHLIST_FOUND: "Burada herhangi birşey yok",
      NO_MOVIES_FOUND: "Film mevcut değil",
      WATCHLIST: "İzleme Listesi",
    },
    VIDEO: {
      RELEASED: "Yayınlandı",
      IMDB: "IMDB",
      RATING: "Derece",
      VOTES: "Oy",
      OVERVIEW: "Genel Bakış",
      GENRE: "Tür",
      TRAILER: "Fragman",
      SEASON: "Sezon",
      SUBTITLES: "Altyazılar",
      NO_SUBTITLE: "Altyazı Yok",
      SUBTITLE_SIZE: "Altyazı Boyutu",
      VIDEO_FILES: "Video Kaynakları",
      UPNEXT: "Bir Sonraki ...",
    },

    MESSAGES: {
      SHARE_SOCKET:
        "Yeni bir oturum oluşturarak bu oynatıcıya geri yönlendirileceksiniz, ancak bu sefer url'de benzersiz bir oturum kimliğine sahip olacaksınız. Senkronize bir izleme deneyimi yaşamak için bunu arkadaşlarınızla paylaşın!",
      FILE_MISSING:
        "Bu içerikle ilgili bir sorun var. İlişkili video dosyasını ondan kaldırmışsınız gibi görünüyor.",
      CODEC_PROBLEM:
        "Oynatıcıya video dosyasını eklerken bir sorun var gibi görünüyor. Bu büyük olasılıkla bir codec sorunundan kaynaklanmakta. Uyumlu bir HTML5 codec bileşenine dönüştürmeyi deneyin, şu anda ekli olan dosyayı kaldırın ve yeniden ekleyin. Codec bileşenlerinde sorun yoksa, sunucunun hata günlüğünü ve ayarlarda temel URL'yi kontrol edin.",
      WRONG_BASEPATH:
        'Videonuz yanlış Temel Yol kullanılarak dahil ediliyor, ancak sayfaya "{{basePath}}" üzerinden göz atıyorsunuz. Ayarlarda doğru Temel Yolu ayarladığınızdan ve uygulamaya göz atmak için bunu kullandığınızdan emin olun.',
      FILE_IN_FS_NOT_FOUND:
        "Videonuz, uygulamanın kullanabileceği konumların hiçbirinde bulunamıyor. Dosyalara uygulama tarafından erişilebildiğinden emin olmak için lütfen ayarlarınızı ve dosya sisteminizi kontrol edin.",
    },
    MANAGE_CONTENT: "İçerikleri Yönet",
    MANAGE_SUB_PROFILES: "Profilleri Yönet",
    WHOS_WATCHING: "Kim İzliyor?",
    ADD_SUB_PROFILE: "Profil Ekle",
    EDIT_BTN: "Düzenle",
    DONE_BTN: "Tamam",
    SAVE_BTN: "Kaydet",
    CREATE_BTN: "Oluştur",
    CANCEL_BTN: "İptal Et",
    DELETE_BTN: "Sil",
    ENTER_NAME: "İsim gir",
    EDIT_PROFILE: "Profili düzenle",
    CREATE_PROFILE: "Profil oluştur",
    ADMIN: "Yönetici",
    HELP: "Yardım",
    HELP_FAQ: "YARDIM / S.S.S.",
    PROFILE_SETTINGS: "Kullanıcı Ayarları",
    LOGOUT: "Oturumu Kapat",
    CHANGE_PASSWORD: "Şifreni Değiştir",
    LANGUAGE_en: "English",
    LANGUAGE_cn: "Chinese/中文",
    LANGUAGE_ru: "Русский/Russian",
    LANGUAGE_de: "Deutsch/German",
    LANGUAGE_fr: "Français/French",
    LANGUAGE_es: "Español/Spanish",
    LANGUAGE_kr: "한국어/Korean",
    LANGUAGE_nl: "Nederlands/Dutch",
    LANGUAGE_pt: "Português/Portuguese",
    LANGUAGE_ja: "日本語/Japanese",
    LANGUAGE_it: "Italiano/Italian",
    LANGUAGE_da: "Dansk/Danish",
    LANGUAGE_ar: "عربى/Arabic",
    LANGUAGE_hu: "Magyar/Hungarian",
    LANGUAGE_tr: "Turkish/Türkçe",
    PROFIlE: {
      USERNAME: "Kullanıcı adı",
      FULL_NAME: "Ad Soyad",
      LANGUAGE: "Dil",
      PAUSE_ON_CLICK: "Tıklandığında Videoyu Duraklat",
      FAVORITE_GENRES: "Favori Türler",
      AMOUNT_OF_MEDIA_ENTRIES:
        'Sayfam\'daki toplam video sayısı ("Daha Fazla Yükle" den önce)',
      SAVE: "Profili Kaydet",
      PASS: "Şifre",
      OLD_PASS: "Eski Şifre",
      NEW_PASS: "Yeni Şifre",
      NEW_PASS_PLACEHOLDER: "Yeni Şifre  (min. 6 karakter)",
      REPEAT_PASS: "Şifreyi Tekrar Girin",
      PASS_ERROR_EMPTY: "Şifre boş olamaz",
      PASS_ERROR_LENGTH: "Şifre en az 6 karakter uzunluğunda olmalı",
      PASS_ERROR_REPEAT: "Şifreler birbiriyle eşleşmeli",
      SAVE_PASS: "Yeni şifre oluştur",
    },

    SORT_OPTIONS: {
      AZ: "A-Z",
      ZA: "Z-A",
      NEWEST_ADDED: "En Son Eklenen",
      OLDEST_ADDED: "İlk Eklenen",
      NEWEST_RELEASED: "En Son Çıkan",
      OLDEST_RELEASED: "En Eski Çıkan",
      NEWEST_AIRED: "En Son Yayınlanan",
      OLDEST_AIRED: "En Eski Yayınlanan",
      NEWEST_REPORTED: "En Son Bildirilenler",
      OLDEST_REPORTED: "En Eski Rapor",
      NEWEST_UPDATED: "En Son Güncellenen",
      OLDEST_UPDATED: "En Eski Güncellenen",
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: "Nasıl video yükleyebilirim?",
        TEXT:
          "İçeriği Yönet menüsüne giderek video yükleyebilirsiniz. Bir Film, Dizi veya Başka bir video yüklemek isteyip istemediğinizi seçin. İlgili alt menü seçeneğine tıklayın" +
          " ekranın sol tarafındaki dikey gezinme çubuğunda. Yeni Film / Dizi / Diğer Video Oluştur düğmesini tıklayarak veya yazarak bir video yükleyebilirsiniz." +
          " arama çubuğuna yüklemek istediğiniz videonun adı ve arama sonuçlarından ilgili filmi seçin. Bundan sonra, videonun" +
          " bilgileri manuel olarak veya TheMovieDB'den yükleyerek. Bundan sonra, Dosyaları Yönet düğmesine tıklayarak video ve altyazı dosyalarını yükleyebilirsiniz.",
      },
      DELETE_VIDEO: {
        TITLE: "Bir videoyu nasıl silebilirim?",
        TEXT:
          "Videonun bilgi sayfasına gidip Dosyaları Yönet'i tıklayıp kırmızı çöp kutusu simgesini seçerek videoyu silebilirsiniz. Filmi Düzenle'yi tıklayıp" +
          " Filmi Sil, bunu yapmanın başka bir yoludur. İçeriği Yönet menüsündeki Dosya Yöneticisini de kullanabilirsiniz. Orada yüklediğiniz tüm dosyaları görebilirsiniz. " +
          " bir dosyayı silmek için kırmızı çöp kutusu simgesine tıklayın.",
      },
      VIDEO_FORMATS: {
        TITLE: "Hangi video formatları destekleniyor?",
        TEXT:
          "Streama şu anda yalnızca HTML5 oynatıcı tarafından desteklenen video dosyası biçimlerini desteklemektedir. Dosyanızı tarayıcınızdaki boş bir sekmeye sürükleyip bırakarak video dosyanızın HTML5 oynatıcı ile uyumlu olup olmadığını test edebilirsiniz.",
      },
      SUBTITLES: {
        TITLE: "Videolara nasıl altyazı ekleyebilirim?",
        TEXT:
          "Videonun bilgi sayfasındaki Dosyaları Yönet düğmesini tıklayarak videolara altyazı ekleyebilirsiniz. Altyazı dosyalarını buraya sürükleyip bırakabilirsiniz." +
          " Önceden bunları manuel olarak uyumlu bir dosya biçimine dönüştürmeniz gerekiyordu, ancak artık değil! Şimdi uygulama bunu sizin için hallediyor.",
      },
      INVITE_USERS: {
        TITLE:
          "Arkadaşlarımı barındırılan videolarımı izlemeye nasıl davet edebilirim?",
        TEXT:
          "Videolarınızı, barındırılan Streama'nızı kullanmaya davet ederek arkadaşlarınızla paylaşabilirsiniz. Kullanıcılar menüsüne gidin ve Kullanıcı Davet Et düğmesini tıklayın. Davet formunu doldurun ve" +
          " davetlinin rolünü / rollerini seçin. Yönetici rolüne sahip kullanıcılar, Kullanıcıları ve Ayarları düzenleyebilir. İçerik Yöneticisi rolüne sahip kullanıcılar içeriği düzenleyebilir. " +
          " Arkadaşınız e-posta yoluyla davet hakkında bilgilendirilecek. Ayrıca video oynatıcının Paylaş düğmesini tıklayarak ve oturum URL'sini onlara bağlayarak video oturumlarını arkadaşlarınızla paylaşabilirsiniz.",
      },
      BASE_URL: {
        TITLE: "Temel URL nedir ve bunu nasıl yapılandırmalıyım?",
        TEXT:
          "Temel URL, videolar ve davet e-postasındaki bağlantı için kullanılır.",
      },
      NOTIFICATIONS: {
        TITLE: "Bildirimler nedir?",
        TEXT:
          "Davet ettiğiniz arkadaşlarınıza yüklenen videolar hakkında bildirim mesajları göndererek onları bilgilendirebilirsiniz." +
          " Videonuzun bilgi sayfasındaki Bildirim Ekle düğmesine tıklayıp Bildirimler menüsüne gidip Sırayı Gönder düğmesine tıklayarak bildirim sıranıza ekleyerek gönderebilirsiniz.",
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Video oynatıcıda kısayol tuşları var mı?",
        TEXT:
          "Evet. Duraklat/devam ettir: boşluk. Ses düzeyini yönetme: yukarı veya aşağı ok tuşları. Videoyu ileri/geri atlama: sol veya sağ ok tuşları. Uzun atlama:" +
          " CTRL + ok tuşları sola veya sağa. Tam ekran açık/kapalı: ALT + Enter. Altyazı açık/kapalı: S, Sustur: M," +
          " Önceki ekrana dön: Delete veya Backspace.",
      },
      FAVORITE_GENRES: {
        TITLE: "Kullanıcının favori türleri Streama'yı nasıl etkiler?",
        TEXT: "Yakında...",
      },
      USEFUL_LINKS: {
        TITLE: "Kullanışlı bağlantılar",
        TEXT: "Yakında...",
      },
    },
  });
});
