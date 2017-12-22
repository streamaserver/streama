'use strict';

angular.module('streama').directive('videoSortOrderDropdown', [function () {
		return {
			restrict: 'AE',
			templateUrl: '/streama/directive--video-sort-order-dropdown.htm',
			scope: {
				currentSort: '=',
				dropdownType: '='
			},
			link: function ($scope, $elem, $attrs) {

				$scope.sortOrders = [];

				if($scope.dropdownType == 'movie'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'title', label: 'SORT_OPTIONS.AZ'},
						{sort: '-title', label: 'SORT_OPTIONS.ZA'},
						{sort: '-release_date', label: 'SORT_OPTIONS.NEWEST_RELEASED'},
						{sort: 'release_date', label: 'SORT_OPTIONS.OLDEST_RELEASED'},
            {sort: '-dateCreated', label: 'SORT_OPTIONS.NEWEST_ADDED'},
            {sort: 'dateCreated', label: 'SORT_OPTIONS.OLDEST_ADDED'}
					])
				}

				if($scope.dropdownType == 'tvShow'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'name', label: 'SORT_OPTIONS.AZ'},
						{sort: '-name', label: 'SORT_OPTIONS.ZA'},
						{sort: '-first_air_date', label: 'SORT_OPTIONS.NEWEST_AIRED'},
						{sort: 'first_air_date', label: 'SORT_OPTIONS.OLDEST_AIRED'},
            {sort: '-dateCreated', label: 'SORT_OPTIONS.NEWEST_ADDED'},
            {sort: 'dateCreated', label: 'SORT_OPTIONS.OLDEST_ADDED'}
					])
				}

				if($scope.dropdownType == 'report'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'dateCreated', label: 'SORT_OPTIONS.NEWEST_REPORTED'},
						{sort: '-dateCreated', label: 'SORT_OPTIONS.OLDEST_REPORTED'},
						{sort: 'lastUpdated', label: 'SORT_OPTIONS.NEWEST_UPDATED'},
						{sort: '-lastUpdated', label: 'SORT_OPTIONS.OLDEST_UPDATED'}
					]);
				}


				$scope.setCurrentSort = function (sortOrder) {
					$scope.currentSort = sortOrder;
				};

				$scope.currentSort = $scope.sortOrders[0];
			}
		}
	}]);
