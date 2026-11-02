//= wrapped

angular.module('streama').controller('adminGenresCtrl', [
  'apiService', '$state', '$rootScope', '$filter', function (apiService, $state, $rootScope, $filter) {
    var vm = this;

    vm.addGenre = addGenre;
    vm.deleteGenre = deleteGenre;

    apiService.genres.list().then(function (response){
      vm.genres = response.data;
    });


    function addGenre(){
      alertify.set({ buttonReverse: true, labels: {ok: "Create", cancel : "Cancel"}});
      alertify.prompt('Add a new custom genre.', function (confirmed, name) {
        if(confirmed){
          apiService.genres.create(name).then(function (response) {
            alertify.success('The Genre was created.');
            vm.genres.push(response.data);
          });
        }
      })
    }

    function deleteGenre(id){
      alertify.set({ buttonReverse: true, labels: {ok: "Yes", cancel : "Cancel"}});
      alertify.confirm("Are you sure, you want to delete this Genre?", function (confirmed) {
        if(confirmed){
          apiService.genres.delete(id).then(function () {
            _.remove(vm.genres, {id: id});
          }, function (){
            alertify.error('Genre is probably used in a video / tvShow or liked by a user. Delete all usages first, then try again.')
          });
        }
      })
    }

  }]);


