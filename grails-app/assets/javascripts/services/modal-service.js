'use strict';

streamaApp.factory('modalService', ['$uibModal', '$state', function ($uibModal, $state) {
	return{
		tvShowModal: function (tvShow, callback) {
			var modalInstance = $uibModal.open({
				templateUrl: 'modal--tvShow.htm',
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
		},


		movieModal: function (movie, callback) {
			var modalInstance = $uibModal.open({
				templateUrl: 'modal--movie.htm',
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
		},



		genericVideoModal: function (video, callback) {
			var modalInstance = $uibModal.open({
				templateUrl: 'modal--genericVideo.htm',
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
		},


		videoModal: function (video, isManual, tvShow, callback) {
			var modalInstance = $uibModal.open({
				templateUrl: 'modal--video.htm',
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
		},


		openFileBrowser: function (callback) {
			var modalInstance = $uibModal.open({
				templateUrl: 'modal--file-browser.htm',
				controller: 'modalFileBrowserCtrl',
				size: 'lg'
			});

			modalInstance.result.then(function (data) {
				(callback || angular.noop)(data);
			});
		},


		userModal: function (user, callback) {
			var modalInstance = $uibModal.open({
				templateUrl: 'modal--user.htm',
				controller: 'modalUserCtrl',
				size: 'lg',
				resolve: {
					user: function () {
						return user;
					}
				}
			});

			modalInstance.result.then(function (data) {
				(callback || angular.noop)(data);
			});
		},

    fileManagerModal: function (video, callback) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modal--manage-files.htm',
        controller: 'modalFileCtrl',
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
    },

    newReleaseModal: function (media, type, episodes, callback) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modal--new-release.htm',
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
    },


		mediaDetailModal: function (mediaId, mediaType, callback) {
			$state.go('dash', {mediaModal: mediaId, mediaType: mediaType});

			var modalInstance = $uibModal.open({
				templateUrl: 'modal--media-detail.htm',
				controller: 'modalMediaDetailCtrl',
				size: 'lg',
				resolve: {
					mediaId: function () {
						return mediaId;
					},
					mediaType: function () {
						return mediaType;
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
	};
}]);
