//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(function ($translateProvider) {
  $translateProvider.translations('cn', {
    LOGIN: {
      TITLE: '请登录',
      USERNAME: '用户名',
      PASSWORD: '密码',
      FIRST_TIME_HINT: '第一次使用？ 试试用 \'admin\' 作为用户名和密码登录。',
      SUBMIT: '登录',
      SESSION_EXPIRED: '你的会话已过期，请重新登录'
    },
    DASHBOARD: {
      HOME: '主页',
      TV_SHOWS: '节目',
      MOVIES: '电影',
      MY_LIST:'我的片单',
      TITLE: '回到主页',
      TITLE_COUNTER_OF: 'of',
      RECOMMENDATIONS: '为你推荐',
      NEW_RELEASES: '最新发售',
      CONTINUE_WATCHING: '继续观看',
      DISCOVER_SHOWS: '探索更多节目',
      DISCOVER_MOVIES: '探索更多电影',
      DISCOVER_OTHER_VIDEOS: '探索更多内容',
      SORT: '排序：',
      SEARCH_BY_NAME: '输入一个名字...',
      FILTER_BY_TAG: '根据标签过滤...',
      FILTER_BY_GENRE: '根据类型过滤...',
      BROWSE_GENRES: '查看所有类型',
      LOOKING_AT_GENRE: '你正在查看：',
      MARK_COMPLETED: '标记为看过',
      NO_TVSHOWS_FOUND: '没有任何节目可用',
      NO_WATCHLIST_FOUND: '這裡什麼都沒有',
      NO_MOVIES_FOUND: '没有任何电影可用',
      WATCHLIST: '我的片单'
    },
    VIDEO: {
      RELEASED: '发布于',
      IMDB: 'IMDB',
      RATING: '评分',
      STATUS: 'Status',
      STATUS_VALUE: {
        'completed': 'Completed',
        'viewing': 'Viewing',
        'unviewed': 'Unviewed'
      },
      VOTES: '投票',
      OVERVIEW: '简介',
      GENRE: '类型',
      TRAILER: '预告',
      SEASON: '季度',
      SUBTITLES: '字幕',
      NO_SUBTITLE: '没有字幕',
      SUBTITLE_SIZE: '字幕尺寸',
      VIDEO_FILES: '视频源',
      UPNEXT: '即将播放...'
    },

    MESSAGES: {
      SHARE_SOCKET: '通过这个按钮你将会看到地址栏有一个唯一id值，请复制这个完整地址发送给您的好友，这样您的好友就会知道您的观看进度了',
      FILE_MISSING: '这个内容出现了一些问题，看起来你已经删除了相关的视频文件。',
      CODEC_PROBLEM: '向播放器中添加视频文件似乎有问题。这很可能是由于一个编解码器问题。尝试将其转换为兼容的HTML5编解码器，删除当前附加的文件并重新添加。如果编解码器没有问题，请检查服务器的错误日志和设置中的基本URL。',
      WRONG_BASEPATH: '您的视频使用了错误的基本路径，但是您正在通过“{{basePath}}”浏览页面。请确保在设置中设置了正确的基本路径，并使用它来浏览应用程序。',
      FILE_IN_FS_NOT_FOUND: '您的视频无法在任何位置可用的应用程序。请检查设置和文件系统，以确保应用程序可以访问这些文件'
    },
    MANAGE_CONTENT: '管理内容',
    MANAGE_SUB_PROFILES: '编辑个人资料',
    WHOS_WATCHING: '现在是谁在观看？',
    ADD_SUB_PROFILE: '添加个人资料',
    EDIT_BTN: '编辑',
    DONE_BTN: '好',
    SAVE_BTN: '保存',
    CREATE_BTN: '创建',
    CANCEL_BTN: '取消',
    DELETE_BTN: '抹掉',
    ENTER_NAME: '输入名字',
    EDIT_PROFILE: '编辑个人资料',
    CREATE_PROFILE: '创建个人资料',
    ADMIN: 'Admin',
    HELP: '帮助',
    HELP_FAQ: '帮助 / 常见问题',
    PROFILE_SETTINGS: '用户设置',
    LOGOUT: '登出',
    CHANGE_PASSWORD: '更改密码',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_en: 'English',
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
		LANGUAGE_sk: 'Slovensky/Slovak',
    PROFIlE: {
      USERNAME: '用户名',
      FULL_NAME: '完整名字',
      LANGUAGE: '语言',
      PAUSE_ON_CLICK: '点击画面时暂停播放',
      FAVORITE_GENRES: '收藏的类型',
      AMOUNT_OF_MEDIA_ENTRIES: '主页显示的视频数量',
      SAVE: '保存',
      PASS: '密码',
      OLD_PASS: '旧密码',
      NEW_PASS: '新密码',
      NEW_PASS_PLACEHOLDER: '新密码  (最少6位数)',
      REPEAT_PASS: '重复密码',
      PASS_ERROR_EMPTY: '密码不能为空！',
      PASS_ERROR_LENGTH: '密码最少为6位数！',
      PASS_ERROR_REPEAT: '两次密码不匹配！',
      SAVE_PASS: '保存更改'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: '最近上架',
      OLDEST_ADDED: '最初上架',
      NEWEST_RELEASED: '最新发布',
      OLDEST_RELEASED: '最初发布',
      NEWEST_AIRED: '热门选择',
      OLDEST_AIRED: '重温老片',
      NEWEST_REPORTED: '最新报道',
      OLDEST_REPORTED: '最初报道',
      NEWEST_UPDATED: '最近更新',
      OLDEST_UPDATED: '最初更新'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: '我怎样才能上传视频？',
        TEXT: "你可以通过管理内容菜单来上传视频。选择是否上传电影、电视节目或其他视频。单击相关的子菜单选项" +
          " 在屏幕左侧的垂直导航栏上。你可以通过点击“新建电影/电视节目/其他视频”按钮或输入来上传视频" +
          " 要上载到搜索栏的视频的名称，并从搜索结果中选择相关的电影。之后，你可以选择填写视频" +
          " 的信息手动或从TheMovieDB加载其信息。之后，您可以通过单击“管理文件”按钮上传视频和字幕文件。"
      },
      DELETE_VIDEO: {
        TITLE: '我怎样才能删除一个视频？',
        TEXT: "您可以通过进入视频的信息页面，点击管理文件并选择红色垃圾桶图标来删除视频。点击编辑电影和选择" +
          " 删除影片是另一种方法。您还可以使用“管理内容”菜单中的“文件管理器”。你可以看到你上传的所有文件。点击" +
          " 删除文件的红色垃圾桶图标。"
      },
      VIDEO_FORMATS: {
        TITLE: '什么样的视频格式受支持？',
        TEXT: "MoviePlace目前只支持HTML5 player支持的视频文件格式。你可以通过拖放一个视频到浏览器来测试你的视频文件是否兼容HTML5 player"
      },
      SUBTITLES: {
        TITLE: '如何为视频添加字幕?',
        TEXT: "你可以通过点击视频信息页面上的“管理文件”按钮为视频添加字幕。你可以拖放字幕文件。" +
          " 以前您必须手动将它们转换为兼容的文件格式，但现在不需要了！现在MoviePlace将为您处理这个问题。"
      },
      INVITE_USERS: {
        TITLE: '如何邀请朋友观看我的视频?',
        TEXT:"你可以邀请你的朋友使用你的MoviePlace来分享你的视频。转到用户菜单并单击邀请用户按钮。填写邀请表格" +
          " 选择受邀者的角色。具有Admin角色的用户可以编辑用户和设置。具有角色内容管理器的用户可以编辑内容。你的朋友会" +
          " 接收到我们通过电子邮件发出的邀请。您还可以通过单击视频播放器的共享按钮并将会话URL链接到您的朋友来共享视频会话。"
      },
      BASE_URL: {
        TITLE: "什么是基本URL，我应该如何配置它?",
        TEXT: "Base-URL用于邀请邮件中的视频和链接。"
      },
      NOTIFICATIONS: {
        TITLE: "通知是什么?",
        TEXT: "你可以通过发送通知消息通知你的朋友上传的视频。您可以通过单击将它们添加到通知队列来发送它们" +
          " 添加通知按钮，这是在您的视频的信息页面，并前往通知菜单和点击发送队列按钮。"
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "视频播放器有快捷键吗?",
        TEXT: "是的。暂停/继续请按空格。音量:向上或向下的箭头键。跳过视频向前/向后:箭头键左或右。长跳过:" +
          " control + 方向键. 全屏开/关:alt + 回车。字幕开/关:S，静音:M，回到上一页" +
          " screen: delete 或者退格."
      },
      FAVORITE_GENRES: {
        TITLE: "用户喜欢的类型如何影响Streama?",
        TEXT: "暂无"
      },
      USEFUL_LINKS: {
        TITLE: "有用的链接",
        TEXT: "暂无"
      }
    }
  });
});
