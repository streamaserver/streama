'use strict';

angular.module('streama').controller('modalNotificationAddCtrl', [
  '$scope', '$uibModalInstance', 'apiService',
  function ($scope, $uibModalInstance, apiService) {

    $scope.notification = {};
    $scope.selectedItem = {};
    $scope.typeahead = {currentTitle:''};

    $scope.cancel = cancel;
    $scope.saveNotification = saveNotification;
    $scope.search = search;
    $scope.selectFromAPI = selectFromAPI;
    $scope.clearNotification = clearNotification;

    function search (query) {
    		return apiService.dash.searchMedia(query).then(function (data) {
    		  return data.data.shows.concat(data.data.movies);
    			//return data.data;
    	  });
    };

    function selectFromAPI ($item) {
        $scope.selectedItem = $item;
    		$scope.notification.id = $item.id;
    };

    function notificationSuccess (response) {
      var data = response.data;
      $uibModalInstance.close(data);
    }

    function saveNotification (notification) {
        if($scope.selectedItem.mediaType == 'movie'){
            apiService.notification.addMovieToCurrentNotification($scope.selectedItem.id).then(notificationSuccess);
        }else if($scope.selectedItem.mediaType == 'tvShow')
            apiService.notification.addTvShowToCurrentNotification($scope.selectedItem.id, $scope.notification.description).then(notificationSuccess);
    }

    function clearNotification (){
      $scope.selectedItem = {};
      $scope.typeahead.currentTitle = '';
    }

    function cancel () {
    		$uibModalInstance.dismiss('cancel');
    };

  }]);
