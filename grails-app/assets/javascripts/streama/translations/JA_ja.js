//= wrapped
/**
* Translated by @DragonShura on 22/01/17.
*/
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('ja', {
		LOGIN: {
			TITLE: 'ログインしてください',
			USERNAME: 'ユーザー名',
			PASSWORD: 'パスワード',
			FIRST_TIME_HINT: '最初のログイン ? ログイン \'admin\' ユーザー名とパスワード。',
			SUBMIT: 'ログイン',
      SESSION_EXPIRED: 'あなたの最後の活動以来あなたのセッションは期限切れです。もう一度ログインしてください。'
		},
		DASHBOARD: {
			TITLE: 'ダッシュ ボード',
			NEW_RELEASES: '新しいリリース',
			CONTINUE_WATCHING: '続きを見る',
			DISCOVER_SHOWS: 'ショーを発見します',
			DISCOVER_MOVIES: '映画を発見します',
			DISCOVER_OTHER_VIDEOS: '他の動画を発見します',
			SORT: '並べ替え :',
			SEARCH_BY_NAME: '名前で検索します...',
			FILTER_BY_TAG: 'タグで検索します...',
			BROWSE_GENRES: 'ジャンルを参照します',
			LOOKING_AT_GENRE: 'ジャンルを見てください :',
			MARK_COMPLETED: '完成品マーク',
			NO_TVSHOWS_FOUND: 'テレビ番組発見なし',
			NO_MOVIES_FOUND: 'ない映画'
		},
		VIDEO: {
			RELEASED: 'リリース',
			IMDB: 'IMDB',
			RATING: '評価',
			VOTES: '投票',
			OVERVIEW: '概要',
			GENRE: 'ジャンル',
			TRAILER: 'トレーラー',
			SEASON: 'シーズン',
      NO_SUBTITLE: '字幕なし'
		},

		MESSAGES: {
			SHARE_SOCKET: '新しいセッションを作成することによってこのプレーヤーにリダイレクトされますが、今回は url に一意のセッション ID があります。同期見て彼らと経験を持ってお友達とこれを共有!',
			FILE_MISSING: 'このコンテンツに問題があります。それから関連するビデオ ファイルを削除したようだ.同期見て彼らと経験を持ってお友達とこれを共有!',
			CODEC_PROBLEM: 'プレーヤーにビデオ ファイルを追加する問題があるようです。これはコーデックの問題が原因らしいです。互換性のある HTML5 コーデックに変換してみてください、現在添付されているファイルを削除し、再度追加。コーデックは、罰金は場合、は、サーバーとの設定でベース URL のエラー ログを確認します。',
			WRONG_BASEPATH: 'あなたビデオ取得の間違った基本パスを使用してが \'{{ベースパス}}\' を介してページを拾い読みしています。設定で基本の正しいパスを設定して、あなたがアプリケーションの閲覧に使用していることを確認します。'
		},
		MANAGE_CONTENT: 'コンテンツを管理します',
    MANAGE_SUB_PROFILES: 'プロファイルを管理する',
    WHOS_WATCHING: '誰が見ている？',
    ADD_SUB_PROFILE: 'プロフィールを追加',
    EDIT_BTN: '編集',
    DONE_BTN: '完了',
    SAVE_BTN: '保存する',
    CREATE_BTN: '作成する',
    CANCEL_BTN: 'キャンセル',
    DELETE_BTN: '削除',
    ENTER_NAME: '名前を入力',
    EDIT_PROFILE: 'プロファイル編集',
    CREATE_PROFILE: 'プロフィール作成',
		ADMIN: '管理者',
		HELP: 'ヘルプ',
		HELP_FAQ: 'ヘルプ / FAQ',
		PROFILE_SETTINGS: 'プロファイルの設定',
		LOGOUT: 'ログアウト',
		CHANGE_PASSWORD: 'パスワードを変更します',
    LANGUAGE_en: 'English/英語',
    LANGUAGE_ru: 'Русский/ロシア',
    LANGUAGE_de: 'Deutsch/ドイツ語',
    LANGUAGE_fr: 'Français/フランス語',
    LANGUAGE_es: 'Español/スペイン語',
    LANGUAGE_kr: '한국어/韓国語',
    LANGUAGE_nl: 'Nederlands/オランダ語',
    LANGUAGE_pt: 'Português/ポルトガル語',
    LANGUAGE_ja: '日本語',
    LANGUAGE_it: 'Italiano/イタリアの',
    LANGUAGE_da: 'Dansk/デンマーク語',
    LANGUAGE_ar: 'عربى/アラビア語',
		PROFIlE: {
			USERNAME: 'ユーザー名',
			FULL_NAME: '完全な名前',
			LANGUAGE: '言語',
			PAUSE_ON_CLICK: 'クリックでビデオを一時停止します',
			FAVORITE_GENRES: '好きなジャンル',
			SAVE: '保存',
			OLD_PASS: '古いパスワード',
			NEW_PASS: '新しいパスワード',
			NEW_PASS_PLACEHOLDER: '新しいパスワード (最低 6 文字)',
			REPEAT_PASS: 'パスワードを再入力します',
			PASS_ERROR_EMPTY: 'パスワードは空にできません',
			PASS_ERROR_LENGTH: 'パスワードは少なくとも 6 文字の長さにする必要があります',
			PASS_ERROR_REPEAT: 'パスワードは一致する必要があります',
			SAVE_PASS: 'パスワードを保存します',
      AMOUNT_OF_MEDIA_ENTRIES: 'ダッシュボード上のビデオの量（前 "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: '最新の追加',
			OLDEST_ADDED: '最古の付加',
			NEWEST_RELEASED: '最新のリリース',
			OLDEST_RELEASED: '最も古いリリース',
			NEWEST_AIRED: '最新放映',
			OLDEST_AIRED: '最も古い放映'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'どのようにビデオをアップロードできますか ?',
				TEXT: "動画をアップロードするにはコンテンツの管理メニューに行くことによって。映画、テレビ番組または他のビデオをアップロードしたいかどうかに選択します。関連するサブメニューのオプションをクリックして" +
				" 画面の左側の垂直ナビゲーション バー。作成新しい映画/テレビ番組をクリックしてビデオをアップロードすることができます/その他ビデオ ボタンまたは入力して" +
				"検索バーと検索結果から関連する動画を選択してアップロードするビデオの名前。その後、ビデオの入力することができます" +
				" 情報どちらか手動で TheMovieDB からの情報を読み込んだりします。その後、ファイルの管理] をクリックして、動画と字幕ファイルをアップロードできます"
			},
			DELETE_VIDEO: {
				TITLE: 'どのようにビデオを削除できますか。',
				TEXT: "動画の情報ページに行くことによってビデオを削除することができ、ファイルの管理をクリックし、赤いゴミ箱を選択することができますアイコン。ムービーの編集をクリックし、選択" +
				" 削除映画は、それを行う別の方法です。また、コンテンツの管理メニューでファイル マネージャーを使用できます。アップロードしたすべてのファイルを見ることができます。クリックします。" +
				" 赤のゴミ箱では、アイコン ファイルを削除することができます。"
			},
			VIDEO_FORMATS: {
				TITLE: 'どのビデオ フォーマットをサポートしていますか ?',
				TEXT: "Streama は、現在、HTML5 プレーヤーでサポートされているビデオ ファイル形式のみをサポートしています。ビデオ ファイルのドラッグ アンド ドロップによって HTML5 プレーヤーの互換性のある場合をテストすることができます" +
				" お使いのブラウザーに空のタブにファイル。"
			},
			SUBTITLES: {
				TITLE: '動画に字幕を追加する方法 ?',
				TEXT: "動画の情報ページにあるファイルの管理] をクリックして、動画に字幕を追加できます。ドラッグ アンド ドロップで字幕ファイルができます。" +
				" 互換性のあるファイル形式に手動で変換するにいたが今はもうない!今アプリケーションを処理します。"
			},
			INVITE_USERS: {
				TITLE: '私のホストのビデオを視聴するお友達を招待する方法はできますか ?',
				TEXT:"お友達とあなたのビデオを共有するにはホストの Streama を使用してもらう。[ユーザー] メニューの [ユーザの招待] ボタンをクリックします。招待フォームに記入し、" +
				"出席者の役割を選択します。管理者の役割を持つユーザーは、ユーザーの設定を編集できます。コンテンツ マネージャーの役割を持つユーザーは、コンテンツを編集できます。あなたの友人が通知されます。" +
				" メールで招待状。お友達とビデオ プレーヤーの [共有] ボタンをクリックし、セッション URL をリンク ・ ビデオ ・ セッションを共有することも。"
			},
			BASE_URL: {
				TITLE: "ベース URL とどのようにそれを構成する必要がありますか ?",
				TEXT: "ベース URL は、ビデオと招待メール内のリンクに使用されます。"
			},
			NOTIFICATIONS: {
				TITLE: "通知とは何ですか ?",
				TEXT: "アップロードした動画について、招待された友人は、通知メッセージを送信して通知できます。クリックして、通知キューを追加することによってそれらを送信できます" +
				" 動画の情報ページと通知メニューに行くことおよびキューの送信ボタンをクリックすると、通知ボタンを追加します。"
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "ビデオ プレーヤーのショートカットキーですか ?",
				TEXT: "うん。一時停止/再開: スペース。ボリュームの管理: 矢印キーを上下に移動します。ビデオ前方/後方スキップ: 左または右矢印キー。長いスキップ :" +
				" 左または右の矢印キーを制御します。全画面表示オン/オフ: alt キーを入力してください。字幕オン/オフ: S、ミュート: M、前に戻る '' 画面: 削除またはバック スペースします。"
			},
			FAVORITE_GENRES: {
				TITLE: "ユーザーの好きなジャンルは Streama をどのように影響するのか ?",
				TEXT: "近日公開..."
			},
			USEFUL_LINKS: {
				TITLE: "役に立つリンク",
				TEXT: "近日公開..."
			}
		}
	});
});

