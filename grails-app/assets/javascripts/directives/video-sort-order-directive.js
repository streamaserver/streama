'use strict';

streamaApp.directive('videoSortOrderDropdown', [function () {
		return {
			restrict: 'AE',
			templateUrl: 'directive--video-sort-order-dropdown.htm',
			scope: {
				currentSort: '=',
				dropdownType: '='
			},
			link: function ($scope, $elem, $attrs) {
				$scope.sortOrders = [
					{sort: '-dateCreated', label: 'SORT_OPTIONS.NEWEST_ADDED'},
					{sort: 'dateCreated', label: 'SORT_OPTIONS.OLDEST_ADDED'}
				];

				console.log('%c $scope.dropdownType', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', $scope.dropdownType);

				if($scope.dropdownType == 'movie'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'title', label: 'SORT_OPTIONS.AZ'},
						{sort: '-title', label: 'SORT_OPTIONS.ZA'},
						{sort: '-release_date', label: 'SORT_OPTIONS.NEWEST_RELEASED'},
						{sort: 'release_date', label: 'SORT_OPTIONS.OLDEST_RELEASED'}
					])
				}

				if($scope.dropdownType == 'tvShow'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'name', label: 'SORT_OPTIONS.AZ'},
						{sort: '-name', label: 'SORT_OPTIONS.ZA'},
						{sort: '-first_air_date', label: 'SORT_OPTIONS.NEWEST_AIRED'},
						{sort: 'first_air_date', label: 'SORT_OPTIONS.OLDEST_AIRED'}
					])
				}

				$scope.setCurrentSort = function (sortOrder) {
					$scope.currentSort = sortOrder;
				};

				$scope.currentSort = $scope.sortOrders[0];
			}
		}
	}]);
