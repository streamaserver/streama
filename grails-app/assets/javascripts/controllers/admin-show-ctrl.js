

streamaApp.controller('adminShowCtrl', ['$scope', 'apiService', '$stateParams', 'modalService', '$state', function ($scope, apiService, $stateParams, modalService, $state) {

	apiService.tvShow.get($stateParams.showId).success(function (data) {
		$scope.show = data;

		apiService.episode.list({showId: $stateParams.showId}).success(function (data) {
			$scope.seasons = _.groupBy(data, 'season_number');
		});
	});

  $scope.openShowModal = function () {
    modalService.tvShowModal($scope.show, function (data) {
      angular.merge($scope.show, data);
    });
  };


	$scope.addNewEpisode = function(){
		modalService.videoModal(null, 'manual', $scope.show, function (data) {
			$scope.seasons[parseInt(data.season_number)] = $scope.seasons[parseInt(data.season_number)] || [];
			$scope.seasons[parseInt(data.season_number)].push(data);

		});
	};


	$scope.deleteShow = function(){
		alertify.confirm("Are you sure, you want to delete this Show?", function (confirmed) {
			if(confirmed){
				apiService.tvShow.delete($scope.show.id).success(function () {
					$state.go('admin.shows');
				});
			}
		})

	};



	$scope.fetchAllEpisodesForSeason = function(){
		alertify.set({
			buttonReverse: true,
			labels: {
				ok     : "Yes",
				cancel : "Cancel"
			} });

		alertify.prompt("For which season would you like to fetch the episodes?", function (confirmed, season) {
			if(confirmed && season){
				$scope.loading = true;
				apiService.theMovieDb.seasonForShow({apiId: $scope.show.apiId, showId: $stateParams.showId, season: season})
					.success(function (data) {
						console.log('%c data', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', data);
						$scope.seasons[season] = data;
						$scope.loading = false;
					}).error(function () {
						$scope.loading = false;
					});
			}
		})
	};

}]);
