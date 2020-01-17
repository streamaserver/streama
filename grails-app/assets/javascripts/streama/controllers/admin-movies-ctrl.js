

angular.module('streama').controller('adminMoviesCtrl', [
   'modalService', '$state', 'mediaListService', 'TheMovieDB', 'Movie',
  function (modalService, $state, mediaListService, TheMovieDB, Movie) {
  var vm = this;

  vm.hasMovieDBKey = true;
  vm.searchText = "Search Movie from collection or TheMovieDB...";

  vm.createFromFiles = createFromFiles;
  vm.openMovieModal = openMovieModal;
  vm.doSearch = doSearch;
  vm.alreadyAdded = alreadyAdded;
  vm.addFromSuggested = addFromSuggested;

  init();

  function init() {
    vm.movie = mediaListService.init(Movie.list);
    TheMovieDB.hasKey().$promise.then(function (data) {
      if (!data.key) {
        vm.hasMovieDBKey = false;
        vm.searchText = "Search Movie from collection...";
      }
    });
  }


  function openMovieModal() {
    modalService.movieModal(null, function (data) {
      $state.go('admin.movie', {movieId: data.id});
    });
  }

  function doSearch(query) {
    vm.movie.search();
    if (vm.hasMovieDBKey) {
      return TheMovieDB.search({type: 'movie', name: query}).$promise.then(function (data) {
        vm.suggestedMovies = data;
      });
    }
  }

  function addFromSuggested(movie, redirect) {
    var tempMovie = angular.copy(movie);
    var apiId = tempMovie.id;
    delete tempMovie.id;
    tempMovie.apiId = apiId;

    Movie.save({}, tempMovie).$promise.then(function (response) {
      if(redirect){
        $state.go('admin.movie', {movieId: response.id});
      }else{
        vm.movie.list.push(response);
      }
    });
  }

  function alreadyAdded(movie) {
    console.log('%c movie', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', movie);
    return movie.id && _.find(vm.movie.list, {apiId: movie.id.toString()});
  }


  function createFromFiles() {
    modalService.createFromFilesModal('movie').then(function (data) {
      Movie.list().$promise.then(function (response) {
        angular.extend(vm.movie.list, response);
      });
    });
  }

}]);
