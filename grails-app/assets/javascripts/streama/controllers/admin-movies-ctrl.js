

angular.module('streama').controller('adminMoviesCtrl', [
  'apiService', 'modalService', '$state', 'mediaListService',
  function (apiService, modalService, $state, mediaListService) {
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
    vm.movie = mediaListService.init(apiService.movie.list);
    apiService.theMovieDb.hasKey().success(function (data) {
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
      return apiService.theMovieDb.search('movie', query).then(function (data) {
        vm.suggestedMovies = data.data;
      });
    }
  }

  function addFromSuggested(movie, redirect) {
    var tempMovie = angular.copy(movie);
    var apiId = tempMovie.id;
    delete tempMovie.id;
    tempMovie.apiId = apiId;

    apiService.movie.save(tempMovie).success(function (data) {
      if(redirect){
        $state.go('admin.movie', {movieId: data.id});
      }else{
        vm.movie.list.push(data);
      }
    });
  }

  function alreadyAdded(movie) {
    console.log('%c movie', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', movie);
    return movie.id && _.find(vm.movie.list, {apiId: movie.id.toString()});
  }


  function createFromFiles() {
    modalService.createFromFilesModal('movie').then(function (data) {
      apiService.movie.list().success(function (data) {
        angular.extend(vm.movie.list, data);
      });
    });
  }

}]);
