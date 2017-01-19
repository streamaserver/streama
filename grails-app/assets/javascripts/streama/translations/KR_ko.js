/**
 * Created by antonia on 14/05/16.
 * Translation by @imkimchi on 16/05/16
 */
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('kr', {
		LOGIN: {
			TITLE: '로그인이 필요합니다.',
			USERNAME: '아이디',
			PASSWORD: '비밀번호',
			FIRST_TIME_HINT: '처음 로그인 하시나요? \'admin\'를 입력해보세요!',
			SUBMIT: '로그인',
		},
		DASHBOARD: {
			TITLE: '대시보드',
			NEW_RELEASES: '신작',
			CONTINUE_WATCHING: '계속해서 보기',
			DISCOVER_SHOWS: '드라마 찾기',
			DISCOVER_MOVIES: '영화 찾기',
			DISCOVER_OTHER_VIDEOS: '다른 영상들을 찾아보기',
			SORT: '정렬:',
			SEARCH_BY_NAME: '제목으로 찾아보기...',
			FILTER_BY_TAG: '태그로 찾아보기...',
			BROWSE_GENRES: '장르 탐색',
			LOOKING_AT_GENRE: '장르를 보고있습니다.',
			MARK_COMPLETED: '선택 완료',
			NO_TVSHOWS_FOUND: '해당 드라마를 찾지 못했습니다.',
			NO_MOVIES_FOUND: '해당 영화를 찾지 못했습니다.',
		},
		VIDEO: {
			RELEASED: '출시',
			IMDB: 'IMDB',
			RATING: '평점',
			VOTES: '투표',
			OVERVIEW: '줄거리',
			GENRE: '장르',
			TRAILER: '트레일러',
			SEASON: '시즌',
		},

		MESSAGES: {
			SHARE_SOCKET: '새로운 세션을 만들면 이 플레이어로 다시 돌아오지만, 지금은 URL에 유니크 세션 ID가 있습니다. 세션 ID를 친구들과 공유해서 동시에 시청해보세요!',
			FILE_MISSING: '비디오 파일이 찾을 수 없습니다. 친구들과 공유해서 동시에 시청해보세요!',
			CODEC_PROBLEM: '비디오 파일을 플레이어에 추가하는데 문제가 발생했습니다. 코덱의 문제일 가능성이 높습니다. 호환 가능한 HTML5 코덱으로 변경하고, 현재 파일을 삭제하고 다시 추가해보세요. 만약 코덱에 문제가 없다면 환경설정에서 에러 로그와 base URL를 확인해보세요.',
			WRONG_BASEPATH: '잘못된 경로입니다, 현재 페이지는 "{{basePath}}" 입니다. 올바른 경로로 설정해주세요.',
		},
		MANAGE_CONTENT: '컨텐츠 관리',
		ADMIN: '관리자',
		HELP: '도움',
		HELP_FAQ: '도움 / 질문',
		PROFILE_SETTINGS: '프로필 설정',
		LOGOUT: '로그아웃',
		CHANGE_PASSWORD: '비밀번호 변경',
		LANGUAGE_en: '영어',
		LANGUAGE_de: '독일어',
		LANGUAGE_fr: '프랑스의',
		LANGUAGE_es: '스페인어',
		LANGUAGE_kr: '한국어',
		LANGUAGE_nl: '네덜란드',
		LANGUAGE_pt: '포르투갈어',
		
		PROFIlE: {
			USERNAME: '아이디',
			FULL_NAME: '이름',
			LANGUAGE: '언어',
			PAUSE_ON_CLICK: '클릭해서 재생을 멈춥니다.',
			FAVORITE_GENRES: '좋아하는 장르',
			SAVE: '저장',
			OLD_PASS: '기존 비밀번호',
			NEW_PASS: '새 비밀번호',
			NEW_PASS_PLACEHOLDER: '새 비밀번호 (최소 6글자)',
			REPEAT_PASS: '비밀번호 재입력',
			SAVE_PASS: '새 비밀번호 설정',
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: '최근 추가된 순',
			OLDEST_ADDED: '늦게 추가된 순',
			NEWEST_RELEASED: '최근 출시된 순 ',
			OLDEST_RELEASED: '늦게 출시된 순',
			NEWEST_AIRED: '최근에 방영된 순',
			OLDEST_AIRED: '늦게 방영된 순 ',
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: '비디오를 어떻게 업로드 하나요?',
				TEXT: "컨텐츠 관리 메뉴에서 비디오를 업로드 할 수 있습니다. 영화, 드라마, 영상를 업로드할건지 선택해주세요. 하위 메뉴를 클릭하세요." +
				" 화면 좌측에 있는 네비게이션 바. 새로운 영화/드라마/영상 버튼을 클릭하거나 입력해서 동영상을 업로드 할 수 있습니다" +
				" 검색 창에서 업로드 하고 싶은 동영상을 검색하세요. 검색 결과중에 원하는 영화를 클릭하면 동영상 리스트에 추가할 수 있습니다." +
				" TheMovieDB 또는 로컬 파일을 파일 관리 버튼을 클릭해서 동영상과 자막 파일을 추가할 수 있습니다."
			},
			DELETE_VIDEO: {
				TITLE: '비디오를 어떻게 삭제 하나요?',
				TEXT: "비디오 정보 페이지 -> 파일 관리 -> 빨간색 휴지통 아이콘 -> 영화 수정 -> 선택" +
				" 영화 삭제 를 통해 삭제 할 수 있습니다. 컨텐츠 관리 메뉴에 있는 파일 관리자를 사용해서 삭제할 수도 있습니다. 파일 관리자로 업로드한 영상들을 모두 확인할 수 있습니다." +
				" 빨간 휴지통 아이콘을 클릭해서 삭제하세요."
			},
			VIDEO_FORMATS: {
				TITLE: '어떤 동영상 포맷을 지원하나요?',
				TEXT: "Streama는 HTML5 플레이어가 지원하는 형식의 동영상 포맷만 지원합니다. 빈 창에 동영상을 드래그 앤 드랍을 통해 HTML5 플레이어와 호환이 되는지 확인할 수 있습니다."
			},
			SUBTITLES: {
				TITLE: '자막을 어떻게 추가 할 수 있나요?',
				TEXT: "비디오 정보 페이지에 있는 파일 관리자를 클릭해서 동영상에 자막을 추가할 수 있습니다. 드래그 앤 드랍을 통해서 추가할 수 도 있습니다." +
				" 이전에는 수동으로 파일 형식을 호환 가능한 파일 형식으로 변환해야했지만 Streama가 대신 해드립니다!"
			},
			INVITE_USERS: {
				TITLE: '내가 추가한 동영상을 친구들이 볼 수있도록 할 수있나요?',
				TEXT:" Streama를 통해 친구들을 초대하여 친구들에게 동영상을 공유할 수있습니다. 유저 메뉴에서 유저 초대 버튼을 클릭하세요. 초대 리스트를 작성하고" +
				" 초대하려는 친구의 권한을 설정하세요. 관리자 권한을 가진 유저는 유저 & 설정을 변경할 수 있습니다. 파일 관리자 권한을 가진 유저는 파일을 변경할 수 있습니다. 초대가 된 이후에, 당신의 친구들에게 이메일로 알람이 갑니다." +
				" 비디오 플레이어의 공유 버튼을 클릭한 후, 링크를 공유해서 친구들에게 동영상을 공유할 수도 있습니다."
			},
			BASE_URL: {
				TITLE: "Base URL이 어떤 것이고 어떻게 설정할 수 있나요?",
				TEXT: "Base-URL 은 동영상과 초대 이메일의 링크로 쓰입니다."
			},
			NOTIFICATIONS: {
				TITLE: "알람들이 뭔가요?",
				TEXT: "초대된 친구들한테 업로드 된 영상을 알릴 수 있습니다. 비디오 정보 페이지 -> 알람 -> 대기열 전송을 클릭 해서 알람 대기열에 추가 시킬 수 있습니다."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "단축키가 있나요?",
				TEXT: "정지: space. 볼륨 조절: 방향키 위/아래. 동영상 건너뛰기: 단축키 우측/좌측. 길게 건너뛰기:" +
				" control + 방향키 좌측/우측. 전체화면 on/off: alt + enter. 자막 on/off: S, 음소거: M, 뒤로가기" +
				" screen: delete키 혹은 backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "유저의 장르 취향이 Stream에 어떤 영향을 주나요?",
				TEXT: "Coming soon..."
			},
			USEFUL_LINKS: {
				TITLE: "유용한 링크",
				TEXT: "Coming soon..."
			},
		}
	});
});
