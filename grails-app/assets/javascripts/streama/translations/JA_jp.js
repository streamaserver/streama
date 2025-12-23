//= wrapped
/**
* Translated by @DragonShura  on 22/01/17
            and @kokarare1212 on 24/02/03.
*/
angular.module('streama.translations').config(function ($translateProvider) {
  $translateProvider.translations('ja', {
    LOGIN: {
      TITLE: 'ログインしてください',
      USERNAME: 'ユーザー名',
      PASSWORD: 'パスワード',
      FIRST_TIME_HINT: '初めてのログインですか？ \'admin\'をユーザー名とパスワードにしてログインしてみてください。',
      SUBMIT: 'ログイン',
      SESSION_EXPIRED: '前回のアクティビティから時間が経過し、セッションが切れました。再度ログインしてください。'
    },
    DASHBOARD: {
      HOME: 'ホーム',
      TV_SHOWS: 'テレビ番組',
      MOVIES: '映画',
      MY_LIST: 'マイリスト',
      TITLE: 'ダッシュボード',
      TITLE_COUNTER_OF: 'の',
      NEW_RELEASES: '新作',
      CONTINUE_WATCHING: '視聴を続ける',
      DISCOVER_SHOWS: '新たなショーを探す',
      DISCOVER_MOVIES: '新たな映画を探す',
      DISCOVER_OTHER_VIDEOS: '他の動画を探す',
      SORT: '並び替え :',
      SEARCH_BY_NAME: '名前で検索...',
      FILTER_BY_TAG: 'タグでフィルタ...',
      BROWSE_GENRES: 'ジャンルを探す',
      LOOKING_AT_GENRE: 'ジャンルを見ています :',
      MARK_COMPLETED: '視聴完了マーク',
      NO_TVSHOWS_FOUND: 'テレビ番組が見つかりません',
      NO_MOVIES_FOUND: '映画が見つかりません',
      NO_WATCHLIST_FOUND: 'ここにはまだ何もありません',
      WATCHLIST: '後で見るリスト'
    },
    VIDEO: {
      RELEASED: 'リリース日',
      IMDB: 'IMDB',
      RATING: '評価',
      STATUS: '状態',
      STATUS_VALUE: {
        'completed': '視聴完了',
        'viewing': '視聴中',
        'unviewed': '未視聴'
      },
      VOTES: '投票数',
      OVERVIEW: '概要',
      GENRE: 'ジャンル',
      TRAILER: '予告編',
      SEASON: 'シーズン',
      NO_SUBTITLE: '字幕なし'
    },

    MESSAGES: {
      SHARE_SOCKET: '新しいセッションを作成すると、このプレーヤーにリダイレクトされます。一意のセッションIDがURLに含まれていますので、このセッションを友人と共有し、一緒に視聴することができます。',
      FILE_MISSING: 'このコンテンツに問題があります。関連するビデオファイルが削除されたようです。',
      CODEC_PROBLEM: 'ビデオファイルをプレーヤーに追加する際に問題が発生しているようです。これはコーデックの問題が原因の可能性があります。互換性のあるHTML5コーデックに変換してみて、現在添付されているファイルを削除し再度追加してみてください。コーデックに問題がない場合は、サーバーのエラーログでベースURLの設定を確認してみてください。',
      WRONG_BASEPATH: 'ビデオを取得する際に間違った基本パスを使用しているようです。\'{{basePath}}\'が表示されています。設定で正しい基本パスを設定し、アプリケーションの閲覧に使用していることを確認してください。'
    },
    MANAGE_CONTENT: 'コンテンツ管理',
    MANAGE_SUB_PROFILES: 'プロファイル管理',
    WHOS_WATCHING: '誰が視聴中？',
    ADD_SUB_PROFILE: 'プロフィール追加',
    EDIT_BTN: '編集',
    DONE_BTN: '完了',
    SAVE_BTN: '保存',
    CREATE_BTN: '作成',
    CANCEL_BTN: 'キャンセル',
    DELETE_BTN: '削除',
    ENTER_NAME: '名前を入力',
    EDIT_PROFILE: 'プロファイル編集',
    CREATE_PROFILE: 'プロファイル作成',
    ADMIN: '管理者',
    HELP: 'ヘルプ',
    HELP_FAQ: 'ヘルプ/FAQ',
    PROFILE_SETTINGS: 'プロファイル設定',
    LOGOUT: 'ログアウト',
    CHANGE_PASSWORD: 'パスワード変更', 
    LANGUAGE_en: 'English/英語',
    LANGUAGE_cn: 'Chinese/中国語',
    LANGUAGE_ru: 'Русский/ロシア語',
    LANGUAGE_de: 'Deutsch/ドイツ語',
    LANGUAGE_fr: 'Français/ランス語',
    LANGUAGE_es: 'Español/スペイン語',
    LANGUAGE_kr: '한국어/韓国語',
    LANGUAGE_nl: 'Nederlands/オランダ語',
    LANGUAGE_pt: 'Português/ポルトガル語',
    LANGUAGE_ja: '日本語',
    LANGUAGE_it: 'Italiano/イタリア語',
    LANGUAGE_da: 'Dansk/デンマーク語',
    LANGUAGE_ar: 'عربى/アラビア語',
    LANGUAGE_hu: 'Magyar/ハンガリー語',
    LANGUAGE_sk: 'Slovensky/スロバキア語',
    PROFILE: {
      USERNAME: 'ユーザー名',
      FULL_NAME: 'フルネーム',
      LANGUAGE: '言語',
      PAUSE_ON_CLICK: 'クリックで一時停止',
      FAVORITE_GENRES: '好きなジャンル',
      SAVE: '保存',
      OLD_PASS: '古いパスワード',
      NEW_PASS: '新しいパスワード',
      NEW_PASS_PLACEHOLDER: '新しいパスワード (最低6文字)',
      REPEAT_PASS: 'パスワード再入力',
      PASS_ERROR_EMPTY: 'パスワードは空欄にできません',
      PASS_ERROR_LENGTH: 'パスワードは最低でも6文字必要です',
      PASS_ERROR_REPEAT: 'パスワードが一致しません',
      SAVE_PASS: 'パスワードを保存',
      AMOUNT_OF_MEDIA_ENTRIES: 'ダッシュボード上のビデオの数（"Load More"を押す前）'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: '最新追加順',
      OLDEST_ADDED: '最古追加順',
      NEWEST_RELEASED: '最新リリース順',
      OLDEST_RELEASED: '最古リリース順',
      NEWEST_AIRED: '最新放送順',
      OLDEST_AIRED: '最古放送順'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'ビデオのアップロード方法は？',
        TEXT: "ビデオをアップロードするには、まずコンテンツ管理メニューに行きます。次に映画、テレビ番組、またはその他のビデオをアップロードしたい項目を選択します。これにより、画面の左側に表示されるナビゲーションバーに関連するサブメニューが表示されます。新しい映画、テレビ番組、またはその他のビデオを作成するには、「新規作成」ボタンをクリックします。また、検索バーにビデオの名前を入力して検索結果から関連するビデオを選択し、アップロードすることもできます。その後、ビデオの情報を手動で入力するか、TheMovieDBから情報を読み込むことができます。最後に、「ファイル管理」をクリックしてビデオと字幕ファイルをアップロードします。"
      },
      DELETE_VIDEO: {
        TITLE: 'ビデオの削除方法は？',
        TEXT: "ビデオを削除するには、まずビデオの情報ページに行きます。次に、「ファイル管理」をクリックし、赤いゴミ箱アイコンを選択します。また、映画の編集をクリックして、映画を削除することもできます。さらに、コンテンツ管理メニューの「ファイルマネージャー」を使用して、アップロードしたすべてのファイルを確認し、赤いゴミ箱アイコンをクリックしてファイルを削除することも可能です。"
      },
      VIDEO_FORMATS: {
        TITLE: 'どのビデオフォーマットがサポートされていますか？',
        TEXT: "Streamaは現在、HTML5プレーヤーでサポートされているビデオファイル形式のみをサポートしています。ビデオファイルがHTML5プレーヤーと互換性があるかどうかは、ブラウザの空のタブにファイルをドラッグアンドドロップしてテストできます。"
      },
      SUBTITLES: {
        TITLE: 'ビデオに字幕を追加する方法は？',
        TEXT: "字幕を追加するには、ビデオの情報ページに行き、「ファイル管理」をクリックします。次に、字幕ファイルをドラッグアンドドロップします。これにより、字幕ファイルが互換性のあるファイル形式に自動的に変換されます。"
      },
      INVITE_USERS: {
        TITLE: '友人を招待して自分がホストするビデオを視聴する方法は？',
        TEXT: "あなたがホストするStreamaに友人を招待してビデオを共有するには、「ユーザー」メニューから「ユーザーの招待」ボタンをクリックします。招待フォームに記入し、招待される人の役割を選択します。管理者の役割を持つユーザーはユーザー設定を編集でき、コンテンツマネージャーの役割を持つユーザーはコンテンツを編集できます。招待はメールで通知されます。また、ビデオプレーヤーの「共有」ボタンをクリックしてセッションURLを共有し、リンクしたビデオセッションを共有することもできます。"
      },
      BASE_URL: {
        TITLE: 'ベースURLとは何ですか？それはどのように設定する必要がありますか？',
        TEXT: "ベースURLは、ビデオと招待メール内のリンクに使用されます。"
      },
      NOTIFICATIONS: {
        TITLE: '通知とは何ですか？',
        TEXT: "アップロードしたビデオについて友人に通知することができます。これは、ビデオの情報ページにある通知ボタンをクリックして通知キューに追加し、通知メニューから送信することで行います。"
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: 'ビデオプレーヤーのショートカットキーは何ですか？',
        TEXT: "はい、あります。一時停止/再開はスペースキーで、ボリューム調整は上下矢印キーで、ビデオの前後にスキップするには左右矢印キーを、長くスキップするには左または右の矢印キーとCtrlキーを同時に、全画面表示のオン/オフはAltキーとEnterキーを同時に、字幕のオン/オフはSキー、ミュートはMキー、前の画面に戻るにはDeleteキーやBackspaceキーを使用します。"
      },
      FAVORITE_GENRES: {
        TITLE: 'ユーザーの好きなジャンルはStreamaにどのように影響しますか？',
        TEXT: "近日公開..."
      },
      USEFUL_LINKS: {
        TITLE: '役立つリンク',
        TEXT: "近日公開..."
      }
    }
  });
});