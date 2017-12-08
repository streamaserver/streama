'use strict';

angular.module('streama').controller('dashCtrl',
	function ($scope, apiService, $state, $rootScope, localStorageService, modalService, $stateParams ) {
  var vm = this;

		if ($rootScope.currentUser.isAdmin) {
			apiService.settings.list().success(function (data) {
				var TheMovieDbAPI = _.find(data, {settingsKey: 'Upload Directory'});

				if (!TheMovieDbAPI.value) {
					alertify.alert('You need to fill out some required base-settings. You will be redirected to the settings page now.', function () {
						$state.go('settings.settings');
					});
				}
			});
		}

		vm.fetchFirstEpisodeAndPlay = function (tvShow) {
			apiService.dash.firstEpisodeForShow(tvShow.id).success(function (data) {
				$state.go('player', {videoId: data.id});
			});
		};

		vm.showDetails = function (media) {
			//modalService.mediaDetailModal((media.tvShowId || media.id), media.mediaType); //{videoId: data.id}
      modalService.mediaDetailModal({mediaId: (media.tvShowId || media.id), mediaType: media.mediaType, isApiMovie: false});
		};


		if ($stateParams.mediaModal) {
      modalService.mediaDetailModal({mediaId: $stateParams.mediaModal, mediaType: $stateParams.mediaType, isApiMovie: false});
		}

		apiService.tag.list().success(function (data) {
			vm.tags = data;
		});

		apiService.dash.listNewReleases().success(function (data) {
			vm.newReleases = data;
		});

		var applyFilter = function (item, filterObj) {
			var showItemArray = [];

			_.forEach(filterObj, function (filterVal, key) {
				if (_.isArray(filterVal) && filterVal.length) {
					var intersection = _.intersectionBy(item[key], filterVal, 'id');
					var isVisible = (intersection.length ? true : false);
					showItemArray.push(isVisible);
				}
				if (_.isString(filterVal) && filterVal.length >= 1) {
					var isVisible = (_.includes(item[key].toLowerCase(), filterVal.toLowerCase()) ? true : false);
					showItemArray.push(isVisible);
				}
			});

			return (showItemArray.indexOf(false) < 0);
		};

		vm.dashFilter = {
			movie: {},
			tvShow: {},

			movieFilter: function (item) {
				return applyFilter(item, vm.dashFilter.movie);
			},

			showFilter: function (item) {
				return applyFilter(item, vm.dashFilter.tvShow);
			}
		};


		vm.markCompleted = function (viewingStatus) {
			alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
			alertify.confirm("Are you sure you want to mark this video as completed?", function (confirmed) {
				if (confirmed) {
					apiService.viewingStatus.delete(viewingStatus.id).success(function (data) {
						_.remove(vm.continueWatching, {'id': viewingStatus.id});
					});
				}
			})
		};

		apiService.dash.listContinueWatching().success(function (data) {
			vm.continueWatching = data;
		});

		vm.loadingTvShows = true;
		apiService.dash.listShows().success(function (data) {
			vm.tvShows = data;
			vm.loadingTvShows = false;
		});

		vm.loadingMovies = true;
		apiService.dash.listMovies().success(function (data) {
			vm.movies = data;
			vm.loadingMovies = false;
		});

		vm.loadingRecommendations = true;
		apiService.dash.listRecommendations().success(function (data) {
			vm.recommendations = data;
			vm.loadingRecommendations = false;
		});

		vm.loadingGenericVideos = true;
		apiService.dash.listGenericVideos().success(function (data) {
			vm.genericVideos = data;
			vm.loadingGenericVideos = false;
		});


		apiService.dash.listGenres().success(function (data) {
			$rootScope.genres = data;

			if ($stateParams.genreId) {
				$rootScope.selectedGenre = _.find(data, {id: parseInt($stateParams.genreId)});
				vm.dashFilter.movie.genre = [$rootScope.selectedGenre];
				vm.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
			}
		});


		$scope.$on('changedGenre', function (e, genre) {
			$rootScope.selectedGenre = genre;
			if ($rootScope.selectedGenre) {
				vm.dashFilter.movie.genre = [$rootScope.selectedGenre];
				vm.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
			} else {
				vm.dashFilter.movie.genre = [];
				vm.dashFilter.tvShow.genre = [];
			}
		});


	});
