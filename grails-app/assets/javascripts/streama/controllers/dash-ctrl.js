'use strict';

angular.module('streama').controller('dashCtrl',
	function ($scope, apiService, $state, $rootScope, localStorageService, modalService, $stateParams ) {

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

		$scope.fetchFirstEpisodeAndPlay = function (tvShow) {
			apiService.dash.firstEpisodeForShow(tvShow.id).success(function (data) {
				$state.go('player', {videoId: data.id});
			});
		};

		$scope.showDetails = function (media) {
			modalService.mediaDetailModal((media.tvShowId || media.id), media.mediaType);
		};


		if ($stateParams.mediaModal) {
			modalService.mediaDetailModal($stateParams.mediaModal, $stateParams.mediaType);
		}

		apiService.tag.list().success(function (data) {
			$scope.tags = data;
		});

		apiService.dash.listNewReleases().success(function (data) {
			$scope.newReleases = data;
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

		$scope.dashFilter = {
			movie: {},
			tvShow: {},

			movieFilter: function (item) {
				return applyFilter(item, $scope.dashFilter.movie);
			},

			showFilter: function (item) {
				return applyFilter(item, $scope.dashFilter.tvShow);
			}
		};


		$scope.markCompleted = function (viewingStatus) {
			alertify.set({buttonReverse: true, labels: {ok: "Yes", cancel: "Cancel"}});
			alertify.confirm("Are you sure you want to mark this video as completed?", function (confirmed) {
				if (confirmed) {
					apiService.viewingStatus.delete(viewingStatus.id).success(function (data) {
						_.remove($scope.continueWatching, {'id': viewingStatus.id});
					});
				}
			})
		};

		apiService.dash.listContinueWatching().success(function (data) {
			$scope.continueWatching = data;
		});

		$scope.loadingTvShows = true;
		apiService.dash.listShows().success(function (data) {
			$scope.tvShows = data;
			$scope.loadingTvShows = false;
		});

		$scope.loadingMovies = true;
		apiService.dash.listMovies().success(function (data) {
			$scope.movies = data;
			$scope.loadingMovies = false;
		});

		$scope.loadingRecommendations = true;
		apiService.dash.listRecommendations().success(function (data) {
			$scope.recommendations = data;
			$scope.loadingRecommendations = false;
		});

		$scope.loadingGenericVideos = true;
		apiService.dash.listGenericVideos().success(function (data) {
			$scope.genericVideos = data;
			$scope.loadingGenericVideos = false;
		});


		apiService.dash.listGenres().success(function (data) {
			$rootScope.genres = data;

			if ($stateParams.genreId) {
				$rootScope.selectedGenre = _.find(data, {id: parseInt($stateParams.genreId)});
				$scope.dashFilter.movie.genre = [$rootScope.selectedGenre];
				$scope.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
			}
		});


		$scope.$on('changedGenre', function (e, genre) {
			$rootScope.selectedGenre = genre;
			if ($rootScope.selectedGenre) {
				$scope.dashFilter.movie.genre = [$rootScope.selectedGenre];
				$scope.dashFilter.tvShow.genre = [$rootScope.selectedGenre];
			} else {
				$scope.dashFilter.movie.genre = [];
				$scope.dashFilter.tvShow.genre = [];
			}
		});


	});
