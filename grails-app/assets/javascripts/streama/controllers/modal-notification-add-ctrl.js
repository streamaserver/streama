'use strict';

angular.module('streama').controller('modalNotificationAddCtrl', [
  '$scope', '$uibModalInstance', 'Dash', 'Notification',
  function ($scope, $uibModalInstance, Dash, Notification) {

    $scope.notification = {};
    $scope.selectedItem = {};
    $scope.typeahead = {currentTitle:''};

    $scope.cancel = cancel;
    $scope.saveNotification = saveNotification;
    $scope.search = search;
    $scope.selectFromAPI = selectFromAPI;
    $scope.clearNotification = clearNotification;

    function search (query) {
    		return Dash.searchMedia({query: query}).$promise.then(function (data) {
    		  return data.shows.concat(data.movies);
    			//return data.data;
    	  });
    };

    function selectFromAPI ($item) {
        $scope.selectedItem = $item;
    		$scope.notification.id = $item.id;
    };

    function notificationSuccess (response) {
      var data = response;
      $uibModalInstance.close(data);
    }

    function saveNotification (notification) {
        if($scope.selectedItem.mediaType == 'movie'){
            Notification.addMovieToCurrentNotification({id: $scope.selectedItem.id}).$promise.then(notificationSuccess);
        }else if($scope.selectedItem.mediaType == 'tvShow')
            Notification.addTvShowToCurrentNotification({id: $scope.selectedItem.id, description: $scope.notification.description}).$promise.then(notificationSuccess);
    }

    function clearNotification (){
      $scope.selectedItem = {};
      $scope.typeahead.currentTitle = '';
    }

    function cancel () {
    		$uibModalInstance.dismiss('cancel');
    };

  }]);
