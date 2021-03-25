//= wrapped

angular.module('streama')
	.factory('modalService', modalService);

function modalService($uibModal, $state) {
	return {
		tvShowModal: tvShowModal,
		notificationAddModal: notificationAddModal,
		movieModal: movieModal,
		genericVideoModal: genericVideoModal,
		videoModal: videoModal,
		openFileBrowser: openFileBrowser,
		openUserEditModal: openUserEditModal,
		userCreateModal: userCreateModal,
		userInviteModal: userInviteModal,
		fileManagerModal: fileManagerModal,
    openSubtitlesManagerModal: openSubtitlesManagerModal,
		newReleaseModal: newReleaseModal,
		mediaDetailModal: mediaDetailModal,
		openPlaybackOptions: openPlaybackOptions,
		createFromFilesModal: createFromFilesModal,
    openImageChooser: openImageChooser
	};

	function tvShowModal (tvShow, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--tvShow.htm',
			controller: 'modalTvShowCtrl',
			size: 'lg',
			resolve: {
				tvShow: function () {
					return tvShow;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function notificationAddModal (notification, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--notification-add.htm',
			controller: 'modalNotificationAddCtrl',
			size: 'lg',
			resolve: {
				notification: function () {
					return notification;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function movieModal (movie, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--movie.htm',
			controller: 'modalMovieCtrl',
			size: 'lg',
			resolve: {
				movie: function () {
					return movie;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function genericVideoModal (video, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--genericVideo.htm',
			controller: 'modalGenericVideoCtrl',
			size: 'lg',
			resolve: {
				video: function () {
					return video;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function videoModal (video, isManual, tvShow, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--video.htm',
			controller: 'modalVideoCtrl',
			size: 'lg',
			resolve: {
				isManual: function () {
					return isManual;
				},
				video: function () {
					return video;
				},
				tvShow: function () {
					return tvShow;
				}
			}
		});

		modalInstance.result.then(function (data) {
			console.log('%c modal close', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', arguments);
			(callback || angular.noop)(data);
		});
	}

	function openFileBrowser (callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--file-browser.htm',
			controller: 'modalFileBrowserCtrl',
			size: 'lg'
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function openUserEditModal (user, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--edit-user.htm',
			controller: 'modalUserCtrl',
			size: 'lg',
			resolve: {
				user: function () {
					return user;
				},
				isInvite: function () {
					return true;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function userCreateModal (user, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--create-user.htm',
			controller: 'modalUserCtrl',
			size: 'lg',
			resolve: {
				user: function () {
					return user;
				},
				isInvite: function () {
					return false;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function userInviteModal (user, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--invite-user.htm',
			controller: 'modalUserCtrl',
			size: 'lg',
			resolve: {
				user: function () {
					return user;
				},
				isInvite: function () {
					return true;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

	function fileManagerModal (video, episodes, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--manage-files.htm',
			controller: 'modalFileCtrl',
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				video: function () {
					return video;
				},
        episodes: function () {
					return episodes;
				}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

  function openSubtitlesManagerModal (video, callback) {
    var modalInstance = $uibModal.open({
      templateUrl: '/streama/modal--manage-opensubtitles.htm',
      controller: 'modalOpensubtitleCtrl',
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      resolve: {
        video: function () {
          return video;
        }
      }
    });

    modalInstance.result.then(function (data) {
      (callback || angular.noop)(data);
    });
  }

	function newReleaseModal (media, type, episodes, callback) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--new-release.htm',
			controller: 'modalNewReleaseCtrl',
			resolve: {
				media: function () {return media;},
				type: function () {return type;},
				episodes: function () {return episodes;}
			}
		});

		modalInstance.result.then(function (data) {
			(callback || angular.noop)(data);
		});
	}

    /**
     * opens mediaDetail Modal with Trailer, Genre, Description, Poster etc
     * @param config
     * 				config.mediaId    						Integer				The id of the media, will be queried from REST endpoint. Requires mediaType
     * 				config.mediaType    					String				The name of the mediaType, can be one of TvShow|Movie|GenericVideo. Requires mediaId
     * 				config.isEditButtonHidden    	Boolean				Determines, whether the edit-Button should be hidden or not
     * 			  config.mediaObject	          Object        The media object
     * 			  config.isApiMovie             Boolean       Determines, if the movie is api-based or if it exists locally
     * @param callback
     */
		function mediaDetailModal (config, callback) {
			$state.go($state.current.name, {isApiMovie: config.isApiMovie, isEditButtonHidden: true, mediaModal: config.mediaId, mediaType: config.mediaType});

			var modalInstance = $uibModal.open({
				templateUrl: '/streama/modal--media-detail.htm',
				controller: 'modalMediaDetailCtrl',
				size: 'lg',
				resolve: {
					config: function () {
						return config;
					}
				}
			});

			modalInstance.result.then(function (data) {
				//$state.go('dash', {mediaModal: null, mediaType: null});
				(callback || angular.noop)(data);
			}, function () {
				//$state.go('dash', {mediaModal: null, mediaType: null});
			});
		}


	function createFromFilesModal(mediaType) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--create-from-file.htm',
			controller: 'modalCreateFromFileCtrl as vm',
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				dialogOptions: function () {
					return {
						mediaType: mediaType
					};
				}
			}
		});

		return modalInstance.result;
	}

	function openImageChooser(mediaType, media) {
    var modalInstance = $uibModal.open({
      templateUrl: '/streama/modal--image-chooser.htm',
      controller: 'imageChooserModalCtrl as vm',
      size: 'lg',
      resolve: {
        dialogOptions: function () {
          return {
            mediaType: mediaType,
            media: media
          };
        }
      }
    });

    return modalInstance.result;
  }

  function openPlaybackOptions(playerOptions) {
		var modalInstance = $uibModal.open({
			templateUrl: '/streama/modal--playback-options.htm',
			controller: 'playbackOptionsModalCtrl as vm',
			size: 'lg',
			resolve: {
				dialogOptions: function () {
					return {
						playerOptions: playerOptions
					};
				}
			}
		});

		return modalInstance.result;
	}
}
