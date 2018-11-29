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
			list: function (params) {
				return $http.get('tvShow.json', {params: params});
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
    userActivity: {
      list: function (params) {
        return $http.get('userActivity.json', {params: params});
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
        return $http.delete('file/removeMultipleFilesFromDisk.json', {params: {id: bulk}});
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

    report: {
      list: function (params) {
        return $http.get('report.json', {params: params});
      },
      reportsById: function (videoId) {
        return $http.get('report/reportsById.json', {params: {videoId: videoId}});
      },
      save: function (videoId, errorCode) {
        return $http.put('report/save.json', {videoId: videoId, errorCode: errorCode});
      },
      resolve: function (reportId) {
        return $http.post('report/resolve.json', {reportId: reportId});
      },
      unresolve: function (reportId) {
        return $http.post('report/unresolve.json', {reportId: reportId});
      },
      resolveMultiple: function(bulk) {
        return $http.post('report/resolveMultiple.json', {ids: bulk});
      }
    },

    file: {
      localFiles: function(path) {
        return $http.get('file/localFiles.json', {params: {path: path}});
      },
			matchMetaDataFromFiles: function (files) {
				return $http.post('file/matchMetaDataFromFiles.json', {files: files});
			},
      bulkAddMediaFromFile: function (files) {
				return $http.post('file/bulkAddMediaFromFile.json', {files: files});
			},
      save: function(data) {
        return $http.post('file/save.json', data);
      },
      getURL: function (id) {
        return $http.get('file/getURL.json', {params: {id: id}});
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
      getsimilar: function (id) {
        return $http.get('movie/getsimilar.json', {params: {id: id}});
      },
			save: function (data) {
				return $http.post('movie/save.json', data);
			},
			delete: function (id) {
				return $http.delete('movie/delete.json', {params: {id: id}});
			},
			list: function (params) {
				return $http.get('movie.json', {params: params});
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
			},
      imagesForMedia: function (params) {
				return $http.get('theMovieDb/imagesForMedia', {params: params});
			}
		},

		dash: {
			searchMedia: function (query) {
				return $http.get('dash/searchMedia.json', {params: {query: query}});
			},

			listContinueWatching: function () {
				return $http.get('dash/listContinueWatching.json');
			},

			listMovies: function (params) {
				return $http.get('dash/listMovies.json', {params: params});
			},

			listShows: function (params) {
				return $http.get('dash/listShows.json', {params: params});
			},

			firstEpisodeForShow: function (id) {
				return $http.get('dash/firstEpisodeForShow.json', {params: {id: id}});
			},

			listGenres: function () {
				return $http.get('dash/listGenres.json');
			},

			listGenericVideos: function (params) {
				return $http.get('dash/listGenericVideos.json', {params: params});
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
		},

    profile: {
		  save: function (params) {
        return $http.post('profile/save',  params)
      },
		  update: function (params) {
        return $http.put('profile/update.json',  params)
      },
		  delete: function (id) {
        return $http.delete('profile/delete.json',  {params: {id: id}})
      },
      getUserProfiles: function () {
        return $http.get('profile/getUserProfiles.json')
      }
    }

	};
});
