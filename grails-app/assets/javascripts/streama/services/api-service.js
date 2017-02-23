'use strict';

angular.module('streama').factory('apiService', function ($http, $rootScope, contextPath) {
	return{
		currentUser: function () {
			return $http.get('user/current.json');
		},

		tvShow: {
			get: function (id) {
				return $http.get('tvShow/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post('tvShow/save.json', data);
			},
			delete: function (id) {
				return $http.delete('tvShow/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('tvShow.json');
			},
			episodesForTvShow: function (id) {
				return $http.get('tvShow/episodesForTvShow.json', {params: {id: id}});
			},
			adminEpisodesForTvShow: function (id) {
				return $http.get('tvShow/adminEpisodesForTvShow.json', {params: {id: id}});
			},
			removeSeason: function (showId, season_number) {
				return $http.get('tvShow/removeSeason.json', {params: {showId: showId, season_number: season_number}});
			}
		},

		user: {
			save: function (data) {
				return $http.post('user/save.json', data);
			},
			delete: function (id) {
				return $http.delete('user/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('user.json');
			},
			checkAvailability: function (username, isInvite) {
				return $http.get('user/checkAvailability.json', {params: {username: username, isInvite: isInvite}});
			},
      saveAndCreateUser: function (user) {
        return $http.post('user/saveAndCreateUser.json', user);
      },
			saveAndInviteUser: function (user) {
				return $http.post('user/saveAndInviteUser.json', user);
			},
      saveProfile: function (user) {
				return $http.post('user/saveProfile.json', user);
			},
      availableRoles: function () {
				return $http.get('user/availableRoles.json');
			},
      changePassword: function (data) {
				return $http.post('user/changePassword.json', data);
			}
		},

		tag:{
			save: function (data) {
				return $http.post('tag/save.json', data);
			},
			delete: function (id) {
				return $http.delete('tag/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('tag.json');
			}
		},

		video: {
			get: function (id) {
				return $http.get('video/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post('video/save.json', data);
			},
			delete: function (id) {
				return $http.delete('video/delete.json', {params: {id: id}});
			},
			list: function (params) {
				return $http.get('video.json', {params: params});
			},
			dash: function () {
				return $http.get('video/dash.json');
			},
			removeFile: function (videoId, fileId) {
				return $http.get('video/removeFile.json', {params: {videoId: videoId, fileId: fileId}});
			},
			listAllFiles: function (params) {
				return $http.get('file.json', {params: params});
			},
			removeFileFromDisk: function (id, path) {
				return $http.delete('file/removeFileFromDisk.json', {params: {id: id, path: path}});
			},
      removeMultipleFilesFromDisk: function(bulk) {
        return $http.delete('file/removeMultipleFilesFromDisk.json', {params: {id: bulk}})
      },
			cleanUpFiles: function (type) {
				return $http.delete('file/cleanUpFiles.json', {params: {type: type}});
			},
			addFile: function (videoId, fileId) {
				return $http.get('video/addFile.json', {params: {videoId: videoId, fileId: fileId}});
			},
			refetch: function (videoId) {
				return $http.get('video/refetch.json', {params: {videoId: videoId}});
			},
			addExternalUrl: function (params) {
				return $http.get('video/addExternalUrl.json', {params: params});
			},
      addLocalFile: function (params) {
        return $http.get('video/addLocalFile.json', {params: params});
      }
		},

    file: {
      localFiles: function(path) {
        return $http.get('file/localFiles.json', {params: {path: path}});
      }
    },

		episode: {
			get: function (id) {
				return $http.get('episode/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post('episode/save.json', data);
			},
			delete: function (id) {
				return $http.delete('episode/delete.json', {params: {id: id}});
			},
			list: function (params) {
				return $http.get('episode.json', {params: params});
			}
		},

		movie: {
			get: function (id) {
				return $http.get('movie/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post('movie/save.json', data);
			},
			delete: function (id) {
				return $http.delete('movie/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('movie.json');
			}
		},

		genericVideo: {
			get: function (id) {
				return $http.get('genericVideo/show.json', {params: {id: id}});
			},
			save: function (data) {
				return $http.post('genericVideo/save.json', data);
			},
			delete: function (id) {
				return $http.delete('genericVideo/delete.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('genericVideo.json');
			}
		},

		viewingStatus: {
			save: function (params) {
				return $http.get('viewingStatus/save.json', {params: params});
			},
			markCompleted: function (viewingStatus) {
				return $http.get('viewingStatus/markCompleted.json', {params: {id: viewingStatus.id}});
			},
			delete: function (id) {
				return $http.delete('viewingStatus/delete.json', {params: {id: id}});
			}
		},


		genres: {
			get: function (id) {
				return $http.get('genre/show.json', {params: {id: id}});
			},
			list: function () {
				return $http.get('genre.json');
			}
		},


    settings: {
			list: function () {
				return $http.get('settings.json');
			},
			updateMultiple: function (data) {
				return $http.post('settings/updateMultiple.json', data);
			},
      validateSettings: function (data) {
				return $http.post('settings/validateSettings.json', data);
			}
		},


		notification: {
			list: function () {
				return $http.get('notificationQueue/index.json');
			},
			listNewReleases: function () {
				return $http.get('notificationQueue/listNewReleases.json');
			},
			addMovieToCurrentNotification: function (movieId) {
				return $http.get('notificationQueue/addMovieToCurrentNotification.json', {params: {id: movieId}});
			},
			highlightOnDashboard: function (newRelease) {
				return $http.post('notificationQueue/highlightOnDashboard.json', newRelease);
			},
			addTvShowToCurrentNotification: function (tvShowId, text) {
				return $http.get('notificationQueue/addTvShowToCurrentNotification.json', {params: {id: tvShowId, description: text}});
			},
			sendCurrentNotifcation: function () {
				return $http.get('notificationQueue/sendCurrentNotifcations.json');
			},
			delete: function (id) {
				return $http.delete('notificationQueue/delete.json', {params: {id: id}});
			},
		},


		theMovieDb: {
      hasKey: function (params) {
        return $http.get('theMovieDb/hasKey.json');
      },
			search: function (type, name) {
				return $http.get('theMovieDb/search.json', {params: {type: type, name: name}});
			},
			seasonNumberForShow: function (params) {
				return $http.get('theMovieDb/seasonNumberForShow.json', {params: params});
			},
			seasonForShow: function (params) {
				return $http.get('theMovieDb/seasonForShow.json', {params: params});
			},
      availableGenres: function (params) {
				return $http.get('theMovieDb/availableGenres.json');
			},
			countNewEpisodesForSeason: function (params) {
				return $http.get('theMovieDb/countNewEpisodesForSeason', {params: params});
			}
		},

		dash: {
			searchMedia: function (query) {
				return $http.get('dash/searchMedia.json', {params: {query: query}});
			},

			listContinueWatching: function () {
				return $http.get('dash/listContinueWatching.json');
			},

			listMovies: function () {
				return $http.get('dash/listMovies.json');
			},

			listShows: function () {
				return $http.get('dash/listShows.json');
			},

			firstEpisodeForShow: function (id) {
				return $http.get('dash/firstEpisodeForShow.json', {params: {id: id}});
			},

			listGenres: function () {
				return $http.get('dash/listGenres.json');
			},

			listGenericVideos: function () {
				return $http.get('dash/listGenericVideos.json');
			},

			listNewReleases: function () {
				return $http.get('dash/listNewReleases.json');
			},

			listRecommendations: function () {
				return $http.get('dash/listRecommendations.json');
			}
		},

		websocket: {
			triggerPlayerAction: function (params) {
				return $http.get('websocket/triggerPlayerAction.json', {params: params});
			}
		}
	};
});
