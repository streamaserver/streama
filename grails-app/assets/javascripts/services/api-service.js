'use strict';

streamaApp.factory('apiService', ['$http', function ($http) {
	var urlBase = $('base').attr('href');

	return{
		currentUser: function () {
			return $http.get(urlBase + 'user/current.json');
		},


		tvShow: {
			get: function (id) {
				return $http.get(urlBase + 'tvShow/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post(urlBase + 'tvShow/save.json', data);
			},
			delete: function (id) {
				return $http.delete(urlBase + 'tvShow/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get(urlBase + 'tvShow.json');
			},
			episodesForTvShow: function (id) {
				return $http.get(urlBase + 'tvShow/episodesForTvShow.json', {params: {id: id}});
			}
		},

		user: {
			save: function (data) {
				return $http.post(urlBase + 'user/save.json', data);
			},
			delete: function (id) {
				return $http.delete(urlBase + 'user/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get(urlBase + 'user.json');
			},
			checkAvailability: function (username) {
				return $http.get(urlBase + 'user/checkAvailability.json', {params: {username: username}});
			},
			saveAndInviteUser: function (user) {
				return $http.post(urlBase + 'user/saveAndInviteUser.json', user);
			},
			makeUserAdmin: function (user) {
				return $http.get(urlBase + 'user/makeUserAdmin.json', {params: {id: user.id}});
			},
      availableRoles: function () {
				return $http.get(urlBase + 'user/availableRoles.json');
			}
		},

		video: {
			get: function (id) {
				return $http.get(urlBase + 'video/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post(urlBase + 'video/save.json', data);
			},
			delete: function (id) {
				return $http.delete(urlBase + 'video/delete.json', {params: {id: id}});
			},
			list: function (params) {
				return $http.get(urlBase + 'video.json', {params: params});
			},
			dash: function () {
				return $http.get(urlBase + 'video/dash.json');
			},
			removeFile: function (videoId, fileId) {
				return $http.get(urlBase + 'video/removeFile.json', {params: {videoId: videoId, fileId: fileId}});
			},
			listAllFiles: function () {
				return $http.get(urlBase + 'file.json');
			},
			addFile: function (videoId, fileId) {
				return $http.get(urlBase + 'video/addFile.json', {params: {videoId: videoId, fileId: fileId}});
			}
		},

		episode: {
			get: function (id) {
				return $http.get(urlBase + 'episode/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post(urlBase + 'episode/save.json', data);
			},
			delete: function (id) {
				return $http.delete(urlBase + 'episode/delete.json', {params: {id: id}});
			},
			list: function (params) {
				return $http.get(urlBase + 'episode.json', {params: params});
			}
		},

		movie: {
			get: function (id) {
				return $http.get(urlBase + 'movie/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post(urlBase + 'movie/save.json', data);
			},
			delete: function (id) {
				return $http.delete(urlBase + 'movie/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get(urlBase + 'movie.json');
			}
		},

		viewingStatus: {
			save: function (params) {
				return $http.get(urlBase + 'viewingStatus/save.json', {params: params});
			},
			delete: function (id) {
				return $http.get(urlBase + 'viewingStatus/delete.json', {params: {id: id}});
			}
		},


    settings: {
			list: function () {
				return $http.get(urlBase + 'settings.json');
			},
			updateMultiple: function (data) {
				return $http.post(urlBase + 'settings/updateMultiple.json', data);
			},
      validateSettings: function (data) {
				return $http.post(urlBase + 'settings/validateSettings.json', data);
			}
		},


		theMovieDb: {
			search: function (type, name) {
				return $http.get(urlBase + 'theMovieDb/search.json', {params: {type: type, name: name}});
			},
			seasonForShow: function (params) {
				return $http.get(urlBase + 'theMovieDb/seasonForShow.json', {params: params});
			}
		},

		websocket: {
			triggerPlayerAction: function (params) {
				return $http.get(urlBase + 'websocket/triggerPlayerAction.json', {params: params});
			}
		}
	};
}]);
