'use strict';

angular.module('streama').directive('videoSortOrderDropdown', [function () {
		return {
		  require: 'ngModel',
			restrict: 'AE',
			templateUrl: '/streama/directive--video-sort-order-dropdown.htm',
			scope: {
				dropdownType: '='
			},
			link: function ($scope, $elem, $attrs, $controller) {

        $controller.$formatters.push(formatter);

				$scope.sortOrders = [];

				if($scope.dropdownType == 'movie'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'title', order: 'ASC', label: 'SORT_OPTIONS.AZ'},
						{sort: 'title', order: 'DESC', label: 'SORT_OPTIONS.ZA'},
						{sort: 'release_date', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_RELEASED'},
						{sort: 'release_date', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_RELEASED'},
            {sort: 'dateCreated', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_ADDED'},
            {sort: 'dateCreated', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_ADDED'}
					])
				}

				if($scope.dropdownType == 'tvShow'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'name', order: 'ASC', label: 'SORT_OPTIONS.AZ'},
						{sort: 'name', order: 'DESC', label: 'SORT_OPTIONS.ZA'},
						{sort: 'first_air_date', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_AIRED'},
						{sort: 'first_air_date', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_AIRED'},
            {sort: 'dateCreated', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_ADDED'},
            {sort: 'dateCreated', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_ADDED'}
					])
				}

				if($scope.dropdownType == 'report'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'dateCreated', order: 'DESC',label: 'SORT_OPTIONS.NEWEST_REPORTED'},
						{sort: 'dateCreated', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_REPORTED'},
						{sort: 'lastUpdated', order: 'DESC', label: 'SORT_OPTIONS.NEWEST_UPDATED'},
						{sort: 'lastUpdated', order: 'ASC', label: 'SORT_OPTIONS.OLDEST_UPDATED'}
					]);
				}


        function formatter(value) {
          $scope.currentSort = _.find($scope.sortOrders, value) || $scope.sortOrders[0];
        }

				$scope.setCurrentSort = function (sortOrder) {
					$scope.currentSort = sortOrder;
          $controller.$setViewValue(sortOrder);
				};

			}
		}
	}]);
