

angular.module('streama').controller('adminShowCtrl', [
	'$scope', '$q', '$stateParams', 'modalService', '$state', 'uploadService', 'TheMovieDB', 'TvShow', 'Notification',
	function ($scope, $q, $stateParams, modalService, $state, uploadService, TheMovieDB, TvShow, Notification) {

	var episodesFetched = 0;
	var maxSeason = 0;

	$scope.seasonOpened = null;
	$scope.showLoading = true;
	$scope.hasMovieDBKey = true;

	$scope.listEpisodesForSeason = listEpisodesForSeason;

    TheMovieDB.hasKey().$promise.then(function (response) {
    if (!response.key) {
      $scope.hasMovieDBKey = false;
    }
  });

	TvShow.get({id: $stateParams.showId}).$promise.then(function (response) {
		$scope.show = response;

		TvShow.adminEpisodesForTvShow({id: $stateParams.showId}).$promise.then(function (response) {
			var episodes = $scope.episodes = response;
			if(episodes.length){
				$scope.seasons = _.chain(episodes).map('season_number').uniq().value();
        var defaultSeasion = parseInt($stateParams.season) || _.min(episodes, 'season_number').season_number;
        $scope.setCurrentSeason(defaultSeasion);
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
				Notification.addTvShowToCurrentNotification({id: $stateParams.showId, description: text}).$promise.then(function () {
					alertify.success('The TvShow was added to the current notification queue.');
				});
			}
		})
	};


	$scope.addNewEpisode = function(){
		modalService.videoModal(null, 'manual', $scope.show, function (response) {
			var data = response;
			$scope.seasons = $scope.seasons || [];
			var seasonNum = parseInt(data.season_number);
			if($scope.seasons.indexOf(seasonNum) === -1){
				$scope.seasons.push(seasonNum);
			}
			$scope.episodes.push(data);
			$scope.setCurrentSeason(data.season_number);
		});
	};


	$scope.deleteShow = function(){
    alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
		alertify.confirm("Are you sure you want to delete this Show?", function (confirmed) {
			if(confirmed){
				TvShow.delete({id: $scope.show.id}).$promise.then(function () {
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
        TheMovieDB.countNewEpisodesForSeason({apiId: $scope.show.apiId, showId: $stateParams.showId, season: index})
          .$promise
          .then(function (response) {
            $scope.newEpisodesForSeason = response;
          })
      }
		}

	};

	var seasonForShow = function (season) {
    if($scope.hasMovieDBKey){
      return TheMovieDB.seasonForShow({apiId: $scope.show.apiId, showId: $stateParams.showId, season: season}).$promise
				.then(function (response) {
					var data = response;
					console.log('%c seasonForShow', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');
					$scope.seasons = $scope.seasons ||  [];
					if($scope.seasons.indexOf(season) === -1) {
						$scope.seasons.push(season);
					}

					$scope.episodes = $scope.episodes.concat(data);
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
          TheMovieDB.seasonNumberForShow({apiId: $scope.show.apiId}).$promise.then(function(data) {
						getEpisodesForSeasons(data);
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
				TvShow.removeSeason({showId: $stateParams.showId, season_number: season_number}).$promise.then(function () {
					$scope.seasons.splice($scope.seasons.indexOf(season_number), 1);
					$scope.loading = false;
					var lowestSeasonNumber = _.min($scope.seasons);
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

		TvShow.save({}, $scope.show).$promise.then(function (response) {
			var data = response;
			$scope.show.poster_image_src = data.poster_image_src;
		});
	}, function () {});

	function listEpisodesForSeason(seasonNum) {
		return _.filter($scope.episodes, {'season_number': seasonNum});
	}
}]);
