

angular.module('streama').controller('adminShowCtrl', [
	'$scope', '$q', 'apiService', '$stateParams', 'modalService', '$state', 'uploadService',
	function ($scope, $q, apiService, $stateParams, modalService, $state, uploadService) {

	var episodesFetched = 0;
	var maxSeason = 0;

	$scope.seasonOpened = null;
	$scope.showLoading = true;
	$scope.hasMovieDBKey = true;

  apiService.theMovieDb.hasKey().success(function (data) {
    if (!data.key) {
      $scope.hasMovieDBKey = false;
    }
  });

	apiService.tvShow.get($stateParams.showId).success(function (data) {
		$scope.show = data;

		apiService.tvShow.adminEpisodesForTvShow($stateParams.showId).success(function (episodes) {
			if(episodes.length){
				$scope.seasons = _.groupBy(episodes, 'season_number');
				$scope.setCurrentSeason(_.min(episodes, 'season_number').season_number);
			}
			$scope.showLoading = false;
			$scope.highlightOnDashboard = modalService.newReleaseModal.bind(modalService, $scope.show,'tvShow', episodes);
		});
	});

  $scope.openShowModal = function () {
    modalService.tvShowModal($scope.show, function (data) {
      angular.merge($scope.show, data);
    });
  };



	$scope.addToCurrentNotification = function(){
    alertify.set({ buttonReverse: true, labels: {ok: "OK", cancel : "Cancel"}});
		alertify.prompt('Add a description to this TvShow. For instance, tell the users which season you added.', function (confirmed, text) {
			if(confirmed){
				apiService.notification.addTvShowToCurrentNotification($stateParams.showId, text).success(function () {
					alertify.success('The TvShow was added to the current notification queue.');
				});
			}
		})
	};


	$scope.addNewEpisode = function(){
		modalService.videoModal(null, 'manual', $scope.show, function (data) {
			$scope.seasons = $scope.seasons || {};
			$scope.seasons[parseInt(data.season_number)] = $scope.seasons[parseInt(data.season_number)] || [];
			$scope.seasons[parseInt(data.season_number)].push(data);
			$scope.setCurrentSeason(data.season_number);
		});
	};


	$scope.deleteShow = function(){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to delete this Show?", function (confirmed) {
			if(confirmed){
				apiService.tvShow.delete($scope.show.id).success(function () {
					$state.go('admin.shows');
				});
			}
		})

	};

	$scope.openSeason = function (index) {
		if($scope.seasonOpened != index){
			$scope.seasonOpened = index;

		}else{
			$scope.seasonOpened = null;
		}
	};

	$scope.setCurrentSeason = function (index) {
		$scope.currentSeason = index;
		if(index){
		  if($scope.hasMovieDBKey){
        apiService.theMovieDb.countNewEpisodesForSeason({apiId: $scope.show.apiId, showId: $stateParams.showId, season: index})
          .success(function (data) {
            $scope.newEpisodesForSeason = data;
          })
      }
		}

	};

	var seasonForShow = function (season) {
    if($scope.hasMovieDBKey){
      return apiService.theMovieDb.seasonForShow({apiId: $scope.show.apiId, showId: $stateParams.showId, season: season})
				.success(function (data) {
					console.log('%c seasonForShow', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
					$scope.seasons = $scope.seasons ||  {};
					$scope.seasons[season] = $scope.seasons[season] || [];
					$scope.seasons[season] = $scope.seasons[season].concat(data);
					$scope.newEpisodesForSeason = null;
					maxSeason = Math.max(maxSeason, season);
					if (maxSeason == season) {
						$scope.setCurrentSeason(season);
					}
					episodesFetched += data.length;
				});
    }
	};

	var getEpisodesForSeasons = function (seasons) {
		var promises = [];
		for (var i = 0; i < seasons.length; i++) {
			promises.push(seasonForShow(seasons[i]));
		}

		$q.all(promises).then(function() {
			$scope.loading = false;
			maxSeason = 0;
			alertify.success(episodesFetched + " Episodes fetched");
			episodesFetched = 0;
		});
	};

	$scope.fetchEpisodes = function(){
    	alertify.set({ buttonReverse: true, labels: {ok: "OK", cancel : "Cancel"}});
		alertify.prompt("For which seasons would you like to fetch the episodes? (Leave blank to fetch for all seasons)", function (confirmed, season) {
			if (confirmed) {
				$scope.loading = true;
				var seasons = [];

				if (!season) {
					apiService.theMovieDb.seasonNumberForShow({apiId: $scope.show.apiId}).then(function(data) {
						getEpisodesForSeasons(data.data);
					});
					return;
				} else if (season.indexOf('-') > -1) {
					var start = parseInt(season.substring(0, season.indexOf('-')));
					var end = parseInt(season.substring(season.indexOf('-') + 1));
					if (start > end) {
						var temp = start;
						start = end;
						end = temp;
					}

					seasons = _.range(start, end+1);
				} else {
					seasons.push(parseInt(season));
				}

				getEpisodesForSeasons(seasons);
			}
		})
	};

	$scope.refetchSeason = function (season_number) {
		seasonForShow(season_number);
	};

	$scope.deleteSeason = function (season_number) {
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});

		alertify.confirm("Are you sure you want to remove the entire season " + season_number + "?", function (confirmed) {
			if(confirmed){
				$scope.loading = true;
				apiService.tvShow.removeSeason($stateParams.showId, season_number).success(function () {
					delete $scope.seasons[season_number];
					$scope.loading = false;
					var lowestSeasonNumber = _.property('season_number')(_.min($scope.seasons, 'season_number'));
					if(lowestSeasonNumber){
						$scope.setCurrentSeason(lowestSeasonNumber);
					}
				});

			}
		})
	};

	$scope.imageUpload = {};

	$scope.uploadPoster = uploadService.doUpload.bind(uploadService, $scope.imageUpload, 'file/upload.json', function (data) {
		console.log('%c test', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', data);
		$scope.imageUpload.percentage = null;
		
		if(data.error) return
		
		$scope.show.poster_image = data.id;

		apiService.tvShow.save($scope.show).success(function (data) {
			$scope.show.poster_image_src = data.poster_image_src;
		});
	}, function () {});

}]);
