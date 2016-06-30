'use strict';

streamaApp.factory('apiService', ['$http', '$rootScope', function ($http, $rootScope) {
	var urlBase = $('base').attr('href');
	$rootScope.basePath = urlBase;

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
			},
			adminEpisodesForTvShow: function (id) {
				return $http.get(urlBase + 'tvShow/adminEpisodesForTvShow.json', {params: {id: id}});
			},
			removeSeason: function (showId, season_number) {
				return $http.get(urlBase + 'tvShow/removeSeason.json', {params: {showId: showId, season_number: season_number}});
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
      saveProfile: function (user) {
				return $http.post(urlBase + 'user/saveProfile.json', user);
			},
      availableRoles: function () {
				return $http.get(urlBase + 'user/availableRoles.json');
			},
      changePassword: function (data) {
				return $http.post(urlBase + 'user/changePassword.json', data);
			}
		},

		tag:{
			save: function (data) {
				return $http.post(urlBase + 'tag/save.json', data);
			},
			delete: function (id) {
				return $http.delete(urlBase + 'tag/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get(urlBase + 'tag.json');
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
			listAllFiles: function (params) {
				return $http.get(urlBase + 'file.json', {params: params});
			},
			removeFileFromDisk: function (id, path) {
				return $http.delete(urlBase + 'file/removeFileFromDisk.json', {params: {id: id, path: path}});
			},
			cleanUpFiles: function (type) {
				return $http.delete(urlBase + 'file/cleanUpFiles.json', {params: {type: type}});
			},
			addFile: function (videoId, fileId) {
				return $http.get(urlBase + 'video/addFile.json', {params: {videoId: videoId, fileId: fileId}});
			},
			refetch: function (videoId) {
				return $http.get(urlBase + 'video/refetch.json', {params: {videoId: videoId}});
			},
			addExternalUrl: function (params) {
				return $http.get(urlBase + 'video/addExternalUrl.json', {params: params});
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

		genericVideo: {
			get: function (id) {
				return $http.get(urlBase + 'genericVideo/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post(urlBase + 'genericVideo/save.json', data);
			},
			delete: function (id) {
				return $http.delete(urlBase + 'genericVideo/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get(urlBase + 'genericVideo.json');
			}
		},

		viewingStatus: {
			save: function (params) {
				return $http.get(urlBase + 'viewingStatus/save.json', {params: params});
			},
			markCompleted: function (viewingStatus) {
				return $http.get(urlBase + 'viewingStatus/markCompleted.json', {params: {id: viewingStatus.id}});
			},
			delete: function (id) {
				return $http.delete(urlBase + 'viewingStatus/delete.json', {params: {id: id}});
			}
		},


		genres: {
			get: function (id) {
				return $http.get(urlBase + 'genre/show.json', {params: {id: id}});
			},
			list: function () {
				return $http.get(urlBase + 'genre.json');
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


		notification: {
			list: function () {
				return $http.get(urlBase + 'notificationQueue/index.json');
			},
			listNewReleases: function () {
				return $http.get(urlBase + 'notificationQueue/listNewReleases.json');
			},
			addMovieToCurrentNotification: function (movieId) {
				return $http.get(urlBase + 'notificationQueue/addMovieToCurrentNotification.json', {params: {id: movieId}});
			},
			highlightOnDashboard: function (newRelease) {
				return $http.post(urlBase + 'notificationQueue/highlightOnDashboard.json', newRelease);
			},
			addTvShowToCurrentNotification: function (tvShowId, text) {
				return $http.get(urlBase + 'notificationQueue/addTvShowToCurrentNotification.json', {params: {id: tvShowId, description: text}});
			},
			sendCurrentNotifcation: function () {
				return $http.get(urlBase + 'notificationQueue/sendCurrentNotifcations.json');
			},
			delete: function (id) {
				return $http.delete(urlBase + 'notificationQueue/delete.json', {params: {id: id}});
			},
		},


		theMovieDb: {
			search: function (type, name) {
				return $http.get(urlBase + 'theMovieDb/search.json', {params: {type: type, name: name}});
			},
			seasonForShow: function (params) {
				return $http.get(urlBase + 'theMovieDb/seasonForShow.json', {params: params});
			},
      availableGenres: function (params) {
				return $http.get(urlBase + 'theMovieDb/availableGenres.json');
			},
			countNewEpisodesForSeason: function (params) {
				return $http.get(urlBase + 'theMovieDb/countNewEpisodesForSeason', {params: params});
			}
		},

		dash: {
			searchMedia: function (query) {
				return $http.get(urlBase + 'dash/searchMedia.json', {params: {query: query}});
			},

			listContinueWatching: function () {
				return $http.get(urlBase + 'dash/listContinueWatching.json');
			},

			listMovies: function () {
				return $http.get(urlBase + 'dash/listMovies.json');
			},

			listShows: function () {
				return $http.get(urlBase + 'dash/listShows.json');
			},

			firstEpisodeForShow: function (id) {
				return $http.get(urlBase + 'dash/firstEpisodeForShow.json', {params: {id: id}});
			},

			listGenres: function () {
				return $http.get(urlBase + 'dash/listGenres.json');
			},

			listGenericVideos: function () {
				return $http.get(urlBase + 'dash/listGenericVideos.json');
			},

			listNewReleases: function () {
				return $http.get(urlBase + 'dash/listNewReleases.json');
			}
		},

		websocket: {
			triggerPlayerAction: function (params) {
				return $http.get(urlBase + 'websocket/triggerPlayerAction.json', {params: params});
			}
		}
	};
}]);
