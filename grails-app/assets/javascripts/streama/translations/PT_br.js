//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(function ($translateProvider) {
	$translateProvider.translations('pt', {
		LOGIN: {
			TITLE: 'Faça Login',
			USERNAME: 'Usuário',
			PASSWORD: 'Senha',
			FIRST_TIME_HINT: 'Primeira vez fazendo login? Tente \'admin\' nos dois campos.',
			SUBMIT: 'Login'
		},
		DASHBOARD: {
			TITLE: 'Painel',
			NEW_RELEASES: 'Novos lançamentos',
			CONTINUE_WATCHING: 'Continue assistindo',
			DISCOVER_SHOWS: 'Descubra séries',
			DISCOVER_MOVIES: 'Descubra filmes',
			DISCOVER_OTHER_VIDEOS: 'Descubra outros vídeos',
			SORT: 'Ordenar:',
			SEARCH_BY_NAME: 'Pesquisar por Nome...',
			FILTER_BY_TAG: 'Filtrar por Tag...',
			BROWSE_GENRES: 'Navegar',
			LOOKING_AT_GENRE: 'Você está vendo o gênero:',
			MARK_COMPLETED: 'Marca completa',
			NO_TVSHOWS_FOUND: 'Nenhuma Série Disponível',
			NO_MOVIES_FOUND: 'Nenhum Filme Disponível'
		},
		VIDEO: {
			RELEASED: 'Lançado',
			IMDB: 'IMDB',
			RATING: 'Classificação',
			VOTES: 'Votos',
			OVERVIEW: 'Visão Geral',
			GENRE: 'Gênero',
			TRAILER: 'Trailer',
			SEASON: 'Temporada'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Ao criar uma nova sessão você será redirecionado de volta para esse player, mas dessa vez você terá um ID de sessão único na url. Compartilhe isso com seus amigos e tenha uma experiência sincronizada com eles!',
			FILE_MISSING: 'Houve um problema com esse conteúdo. Parece que você removeu o arquivo de vídeo associado a ele.. Compartilhe isso com seus amigos e tenha uma experiência sincronizada com eles!',
			CODEC_PROBLEM: 'Parece que houve um problema ao adicionar o arquivo de vídeo ao player. Isso aconteceu provavelmente por causa de um problema de codec. Tente converter o vídeo para um codec compatível com HTML5, remova o arquivo de vídeo atual e re-adicione ele. Se os codecs estão ok, cheque o log de erros do servidor e a URL base nas configurações.',
			WRONG_BASEPATH: 'Seu vídeo foi incluído usando o caminho base errado, mas você está navegando na página via "{{basePath}}". Verifique se você usou o caminho base correto nas configurações e que você está usando ele para navegar na aplicação.'
		},
		MANAGE_CONTENT: 'Gerenciar Conteúdo',
		ADMIN: 'Admin',
		HELP: 'Ajuda',
		HELP_FAQ: 'AJUDA / FAQ',
		PROFILE_SETTINGS: 'Configurações do Perfil',
		LOGOUT: 'Sair',
		CHANGE_PASSWORD: 'Mudar Senha',
		LANGUAGE_en: 'Inglês',
		LANGUAGE_de: 'Alemão',
    	LANGUAGE_fr: 'Francês',
		LANGUAGE_es: 'Espanhol',
		LANGUAGE_kr: 'Coreano',
		LANGUAGE_nl: 'Holandês',
		LANGUAGE_pt: 'Português',
		
		PROFIlE: {
			USERNAME: 'Usuário',
			FULL_NAME: 'Nome completo',
			LANGUAGE: 'Linguagem',
			PAUSE_ON_CLICK: 'Pausar vídeo ao Clicar',
			FAVORITE_GENRES: 'Gêneros favoritos',
			SAVE: 'Salvar Perfil',
			PASS: 'Senha',
			OLD_PASS: 'Senha Antiga',
			NEW_PASS: 'Senha Nova',
			NEW_PASS_PLACEHOLDER: 'Senha Nova  (min. 6 caracteres)',
			REPEAT_PASS: 'Repita a Senha',
			PASS_ERROR_EMPTY: 'A senha não pode estar vazia',
			PASS_ERROR_LENGTH: 'A senha tem que ter pelo menos 6 caracteres',
			PASS_ERROR_REPEAT: 'As senhas tem que coincidir'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Adicionado por Último',
			OLDEST_ADDED: 'Adicionado Primeiro',
			NEWEST_RELEASED: 'Lançado por Último',
			OLDEST_RELEASED: 'Lançado Primeiro',
			NEWEST_AIRED: 'Transmitido por Último',
			OLDEST_AIRED: 'Transmitido Primeiro'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Como eu envio um vídeo?',
				TEXT: "Você pode enviar conteúdo no menu Gerenciar Conteúdo. Escolha se você quer Enviar um Filme, uma Série ou outro tipo de conteúdo. Clique na opção relevante no sub-menu" +
				" na barra vertical de navegação do lado esquerdo da tela. Você pode enviar um vídeo clicando no botão \"Create New Movie/TV Show/Other Video\" ou digitando" +
				" o nome do vídeo que você quer enviar na barra de pesquisa e selecionando o vídeo relevante nos resultados da busca. Depois disso, você pode escolher preencher as informações" +
				" do vídeo ou manualmente ou carregando as informações do TheMovieDB. Depois disso, você pode enviar o vídeo e os arquivos de legenda clicando no botão Gerenciar Conteúdo."
			},
			DELETE_VIDEO: {
				TITLE: 'Como eu deleto um vídeo?',
				TEXT: "Você pode deletar um vídeo indo para a página de informação do vídeo e clicando em Gerenciar Conteúdo e clicando no botão vermelho de lixeira. Clicar em Edit Movie" +
				" e então em Delete Movie é outro jeito de fazer isso. Você também pode usar o Gerenciador de Arquivos que fica no Gerenciador de Conteúdo. Você pode ver todos os arquivos que" +
				" você enviou lá. Clique no botão da lixeira vermelha para deletar um arquivo."
			},
			VIDEO_FORMATS: {
				TITLE: 'Que formatos de vídeo são suportados?',
				TEXT: "O Streama atualmente suporta apenas formatos de vídeo suportados pelo player HTML5. Você pode testar se o seu arquivo de vídeo é compatível com o player HTML5 simplesmente" +
				" arrastando e soltando seu arquivo numa nova aba do seu navegador."
			},
			SUBTITLES: {
				TITLE: 'Como eu adiciono legendas para os vídeos?',
				TEXT: "Você pode adicionar legendas para os vídeos clicando no botão Gerenciar Arquivos, que fica na página de informações do vídeo. Você pode arrastar e soltar" +
				" o arquivo das legendas lá. Antigamente vocÊ tinha que manualmente converter a legenda para um formato compatível, mas não mais! Agora a aplicação converte pra você."
			},
			INVITE_USERS: {
				TITLE: 'Como eu convido meus amigos para assistir meus vídeos hosteados?',
				TEXT:"Você pode compartilhar seus vídeos com seus amigos convidando eles para usar o seu Streama hosteado. Vá para o menu de Usuários e clique o botão Invite User. Preencha o formulário e" +
				" selecione os cargos do convidado. Usuários com o cargo Admin podem editar Usuários & Configurações. Usuários com o cargo Content Manager podem editar conteúdo. Seu amigo será notificado sobre" +
				" o convite via email. Você também pode compartilhar sessões de vídeo com seus amigos clicando no botão de Compartilhar dentro do player e mandando o link da sessão para eles."
			},
			BASE_URL: {
				TITLE: "O que é a URL base e como eu devo configurá-la?",
				TEXT: "A URL base é usada para vídeos e para o link no email de convite."
			},
			NOTIFICATIONS: {
				TITLE: "O que são notificações?",
				TEXT: "Você pode notificar seus amigos conviados sobre vídeos enviados mandando notificações para eles. Você pode enviar notificações adicionando eles a fila de notificações ao clicar" +
				" Add Notification button which is in your video's information page and going to the Notifications menu and clicking Send Queue button."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "O player tem botões de atalho?",
				TEXT: "Sim. Pausar/resumir: espaço. Volume: setas para cima e para baixo. Pular vídeo para frente ou para trás: setas para esquerda e para direita. Pulo longo:" +
				" control + setas para esquerda e para direita. Ligar ou desligar a tela cheia: alt + enter. Ligar ou desligar legendas: S, Mutar: M, Voltar para e tela anterior:" +
				" delete ou backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "Como os gênereos favoritos do usuário afetam o Streama?",
				TEXT: "Em breve..."
			},
			USEFUL_LINKS: {
				TITLE: "Links úteis",
				TEXT: "Em breve..."
			}
		}
	});
});
