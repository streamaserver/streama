

angular.module('streama').controller('adminMoviesCtrl', [
  'apiService', 'modalService', '$state',
  function (apiService, modalService, $state) {
  var vm = this;

	vm.loading = true;
  vm.hasMovieDBKey = true;
  vm.searchText = "Search Movie from collection or TheMovieDB...";

  vm.createFromFiles = createFromFiles;


  apiService.theMovieDb.hasKey().success(function (data) {
    if (!data.key) {
      vm.hasMovieDBKey = false;
      vm.searchText = "Search Movie from collection...";
    }
  });

	apiService.movie.list().success(function (data) {
		vm.movies = data;
		vm.loading = false;
	});

	vm.openMovieModal = function () {
		modalService.movieModal(null, function (data) {
			$state.go('admin.movie', {movieId: data.id});
		});
	};

	vm.doSearch = function (query) {
    if (vm.hasMovieDBKey) {
      return apiService.theMovieDb.search('movie', query).then(function (data) {
        vm.suggestedMovies = data.data;
      });
    }
	};

	vm.addFromSuggested = function (movie, redirect) {
		var tempMovie = angular.copy(movie);
		var apiId = tempMovie.id;
		delete tempMovie.id;
		tempMovie.apiId = apiId;

		apiService.movie.save(tempMovie).success(function (data) {
			if(redirect){
				$state.go('admin.movie', {movieId: data.id});
			}else{
				vm.movies.push(data);
			}
		});
	};

	vm.alreadyAdded = function (movie) {
		console.log('%c movie', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', movie);
		return movie.id && _.find(vm.movies, {apiId: movie.id.toString()});
	};

	function createFromFiles() {
		modalService.createFromFilesModal('movie').then(function (data) {
			apiService.movie.list().success(function (data) {
				angular.extend(vm.movies, data);
			});
		});
	}

}]);
