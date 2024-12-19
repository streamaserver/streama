//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(function ($translateProvider) {
  $translateProvider.translations('en', {
    LOGIN: {
      TITLE: "Zaloguj się",
      USERNAME: "Nazwa użytkownika",
      PASSWORD: "Hasło",
      FIRST_TIME_HINT: "Pierwszy raz logujesz się? Spróbuj wpisać 'admin' w obu polach.",
      SUBMIT: "Zaloguj",
      SESSION_EXPIRED: "Twoja sesja wygasła z powodu braku aktywności. Proszę zaloguj się ponownie."
    },
    DASHBOARD: {
      HOME: "Strona główna",
      TV_SHOWS: "Seriale",
      MOVIES: "Filmy",
      MY_LIST: "Moja lista",
      TITLE: "Panel główny",
      TITLE_COUNTER_OF: "z",
      RECOMMENDATIONS: "Polecane dla Ciebie",
      NEW_RELEASES: "Nowości",
      CONTINUE_WATCHING: "Kontynuuj oglądanie",
      DISCOVER_SHOWS: "Odkrywaj seriale",
      DISCOVER_MOVIES: "Odkrywaj filmy",
      DISCOVER_OTHER_VIDEOS: "Odkrywaj inne wideo",
      SORT: "Sortuj:",
      SEARCH_BY_NAME: "Szukaj po nazwie...",
      FILTER_BY_TAG: "Filtruj według tagu...",
      FILTER_BY_GENRE: "Filtruj według gatunku...",
      BROWSE_GENRES: "Przeglądaj gatunki",
      LOOKING_AT_GENRE: "Przeglądasz gatunek:",
      MARK_COMPLETED: "Oznacz jako ukończone",
      NO_TVSHOWS_FOUND: "Brak dostępnych seriali",
      NO_WATCHLIST_FOUND: "Jeszcze nic tu nie ma",
      NO_MOVIES_FOUND: "Brak dostępnych filmów",
      WATCHLIST: "Lista do obejrzenia"
    },
    VIDEO: {
      RELEASED: "Premiera",
      IMDB: "IMDB",
      RATING: "Ocena",
      STATUS: "Status",
      STATUS_VALUE: {
        completed: "Ukończony",
        viewing: "Oglądany",
        unviewed: "Nieoglądany"
      },
      VOTES: "Głosy",
      OVERVIEW: "Opis",
      GENRE: "Gatunek",
      TRAILER: "Zwiastun",
      SEASON: "Sezon",
      SUBTITLES: "Napisy",
      NO_SUBTITLE: "Brak napisów",
      SUBTITLE_SIZE: "Rozmiar napisów",
      VIDEO_FILES: "Źródła wideo",
      UPNEXT: "Następne..."
    },
    MESSAGES: {
      SHARE_SOCKET: "Tworząc nową sesję, zostaniesz przekierowany z powrotem do tego odtwarzacza, ale tym razem w adresie URL znajdzie się unikalny identyfikator sesji. Udostępnij go znajomym, aby oglądać zsynchronizowane treści razem!",
      FILE_MISSING: "Wystąpił problem z tą zawartością. Wygląda na to, że usunąłeś powiązany plik wideo.",
      CODEC_PROBLEM: "Wygląda na to, że wystąpił problem z dodaniem pliku wideo do odtwarzacza. Najprawdopodobniej jest to problem z kodekiem. Spróbuj przekonwertować plik na kompatybilny kodek HTML5, usuń obecnie załączony plik i dodaj go ponownie. Jeśli kodeki są prawidłowe, sprawdź dziennik błędów serwera i podstawowy adres URL w ustawieniach.",
      WRONG_BASEPATH: "Twoje wideo jest dołączane przy użyciu nieprawidłowej ścieżki podstawowej, ale przeglądasz stronę pod adresem '{{basePath}}'. Upewnij się, że ustawiono prawidłową ścieżkę podstawową w ustawieniach i że korzystasz z niej, przeglądając aplikację.",
      FILE_IN_FS_NOT_FOUND: "Twoje wideo nie może zostać znalezione w żadnej z lokalizacji dostępnych dla aplikacji. Proszę sprawdź ustawienia i system plików, aby upewnić się, że pliki są dostępne dla aplikacji."
    },
    MANAGE_CONTENT: "Zarządzaj treścią",
    MANAGE_SUB_PROFILES: "Zarządzaj profilami",
    WHOS_WATCHING: "Kto ogląda?",
    ADD_SUB_PROFILE: "Dodaj profil",
    EDIT_BTN: "Edytuj",
    DONE_BTN: "Gotowe",
    SAVE_BTN: "Zapisz",
    CREATE_BTN: "Utwórz",
    CANCEL_BTN: "Anuluj",
    DELETE_BTN: "Usuń",
    ENTER_NAME: "Wprowadź imię",
    EDIT_PROFILE: "Edytuj profil",
    CREATE_PROFILE: "Utwórz profil",
    ADMIN: "Administrator",
    HELP: "Pomoc",
    HELP_FAQ: "POMOC / FAQ",
    PROFILE_SETTINGS: "Ustawienia użytkownika",
    LOGOUT: "Wyloguj się",
    CHANGE_PASSWORD: "Zmień hasło",
    LANGUAGE_en: "Angielski",
    LANGUAGE_cn: "Chiński/中文",
    LANGUAGE_ru: "Rosyjski/Русский",
    LANGUAGE_de: "Niemiecki/Deutsch",
    LANGUAGE_fr: "Francuski/Français",
    LANGUAGE_es: "Hiszpański/Español",
    LANGUAGE_cat: "Kataloński/Català",
    LANGUAGE_kr: "Koreański/한국어",
    LANGUAGE_nl: "Niderlandzki/Nederlands",
    LANGUAGE_pt: "Portugalski/Português",
    LANGUAGE_ja: "Japoński/日本語",
    LANGUAGE_it: "Włoski/Italiano",
    LANGUAGE_da: "Duński/Dansk",
    LANGUAGE_ar: "Arabski/عربى",
    LANGUAGE_hu: "Węgierski/Magyar",
    LANGUAGE_sk: "Słowacki/Slovensky",
    LANGUAGE_pl: 'Polski/Polski',
    PROFIlE: {
      USERNAME: "Nazwa użytkownika",
      FULL_NAME: "Pełne imię i nazwisko",
      LANGUAGE: "Język",
      PAUSE_ON_CLICK: "Wstrzymaj wideo po kliknięciu",
      FAVORITE_GENRES: "Ulubione gatunki",
      AMOUNT_OF_MEDIA_ENTRIES: "Liczba filmów na panelu (przed opcją 'Załaduj więcej')",
      SAVE: "Zapisz profil",
      PASS: "Hasło",
      OLD_PASS: "Stare hasło",
      NEW_PASS: "Nowe hasło",
      NEW_PASS_PLACEHOLDER: "Nowe hasło (min. 6 znaków)",
      REPEAT_PASS: "Powtórz hasło",
      PASS_ERROR_EMPTY: "Hasło nie może być puste",
      PASS_ERROR_LENGTH: "Hasło musi mieć co najmniej 6 znaków",
      PASS_ERROR_REPEAT: "Hasła muszą się zgadzać",
      SAVE_PASS: "Ustaw nowe hasło"
    },
    
    SORT_OPTIONS: {
      AZ: "A-Z",
      ZA: "Z-A",
      NEWEST_ADDED: "Ostatnio dodane",
      OLDEST_ADDED: "Najwcześniej dodane",
      NEWEST_RELEASED: "Najnowsze wydanie",
      OLDEST_RELEASED: "Najstarsze wydanie",
      NEWEST_AIRED: "Najnowsza emisja",
      OLDEST_AIRED: "Najstarsza emisja",
      NEWEST_REPORTED: "Najnowszy raport",
      OLDEST_REPORTED: "Najstarszy raport",
      NEWEST_UPDATED: "Najnowsza aktualizacja",
      OLDEST_UPDATED: "Najstarsza aktualizacja"
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: "Jak mogę przesłać wideo?",
        TEXT: "Możesz przesyłać wideo, przechodząc do menu Zarządzaj treścią. Wybierz, czy chcesz przesłać Film, Program telewizyjny czy inne wideo. Kliknij odpowiednią opcję" +
          " w menu nawigacji po lewej stronie ekranu. Możesz przesłać wideo, klikając przycisk Utwórz nowy film/program telewizyjny/inne wideo lub wpisując" +
          " nazwę wideo, które chcesz przesłać, w pasku wyszukiwania i wybierając odpowiedni film z wyników wyszukiwania. Następnie możesz wybrać, czy wypełnić informacje o wideo" +
          " ręcznie, czy załadować je z TheMovieDB. Po tym możesz przesłać plik wideo i napisy, klikając przycisk Zarządzaj plikami."
      },
      DELETE_VIDEO: {
        TITLE: "Jak mogę usunąć wideo?",
        TEXT: "Możesz usunąć wideo, przechodząc do strony z informacjami o wideo, klikając Zarządzaj plikami i wybierając ikonę czerwonego kosza. Kliknięcie Edytuj film i wybór" +
          " Usuń film to kolejny sposób na to. Możesz również skorzystać z Menedżera plików, który znajduje się w menu Zarządzaj treścią. Widzisz tam wszystkie przesłane pliki. Kliknij" +
          " ikonę czerwonego kosza, aby usunąć plik."
      },
      VIDEO_FORMATS: {
        TITLE: "Jakie formaty wideo są obsługiwane?",
        TEXT: "Streama obsługuje obecnie tylko formaty plików wideo obsługiwane przez odtwarzacz HTML5. Możesz sprawdzić, czy twój plik wideo jest kompatybilny z odtwarzaczem HTML5, przeciągając i upuszczając" +
          " plik na pustą kartę w przeglądarce."
      },
      SUBTITLES: {
        TITLE: "Jak mogę dodać napisy do wideo?",
        TEXT: "Możesz dodać napisy do wideo, klikając przycisk Zarządzaj plikami, który znajduje się na stronie informacji o wideo. Możesz tam przeciągnąć i upuścić pliki z napisami." +
          " Wcześniej musiałeś ręcznie konwertować je na kompatybilny format pliku, ale teraz aplikacja robi to za ciebie!"
      },
      INVITE_USERS: {
        TITLE: "Jak mogę zaprosić znajomych do oglądania moich filmów?",
        TEXT: "Możesz udostępniać swoje filmy znajomym, zapraszając ich do korzystania z hostowanej przez ciebie Streamy. Przejdź do menu Użytkownicy i kliknij przycisk Zaproś użytkownika. Wypełnij formularz zaproszenia i" +
          " wybierz rolę(e) zaproszonego. Użytkownicy z rolą Admin mogą edytować użytkowników i ustawienia. Użytkownicy z rolą Menedżer treści mogą edytować treści. Twój znajomy zostanie powiadomiony o" +
          " zaproszeniu za pomocą e-maila. Możesz również udostępniać sesje wideo znajomym, klikając przycisk Udostępnij w odtwarzaczu wideo i przesyłając im adres URL sesji."
      },
      BASE_URL: {
        TITLE: "Co to jest podstawowy URL i jak go skonfigurować?",
        TEXT: "Podstawowy URL jest używany dla wideo i linku w e-mailu z zaproszeniem."
      },
      NOTIFICATIONS: {
        TITLE: "Czym są powiadomienia?",
        TEXT: "Możesz powiadomić zaproszonych znajomych o przesłanych wideo, wysyłając im wiadomości z powiadomieniami. Możesz to zrobić, dodając je do kolejki powiadomień, klikając" +
          " przycisk Dodaj powiadomienie na stronie informacji o wideo, a następnie przechodząc do menu Powiadomienia i klikając przycisk Wyślij kolejkę."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Czy odtwarzacz wideo ma skróty klawiszowe?",
        TEXT: "Tak. Pauza/wznów: spacja. Zarządzanie głośnością: strzałki w górę lub w dół. Przewijanie wideo do przodu/do tyłu: strzałki w lewo lub w prawo. Długie przewijanie:" +
          " kontrola + strzałki w lewo lub w prawo. Pełny ekran włącz/wyłącz: alt + enter. Napisy włącz/wyłącz: S, Wycisz: M, Powrót do poprzedniego" +
          " ekranu: delete lub backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "Jak ulubione gatunki użytkownika wpływają na Streamę?",
        TEXT: "Już wkrótce..."
      },
      USEFUL_LINKS: {
        TITLE: "Przydatne linki",
        TEXT: "Już wkrótce..."
      }
    }    
  });
});
