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
					{sort: '-dateCreated', label: 'Most Recently Added'},
					{sort: 'dateCreated', label: 'First Added'}
				];

				console.log('%c $scope.dropdownType', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', $scope.dropdownType);

				if($scope.dropdownType == 'movie'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'title', label: 'A-Z'},
						{sort: '-title', label: 'Z-A'},
						{sort: '-release_date', label: 'Latest Release'},
						{sort: 'release_date', label: 'Oldest Release'}
					])
				}

				if($scope.dropdownType == 'tvShow'){
					$scope.sortOrders = $scope.sortOrders.concat([
						{sort: 'name', label: 'A-Z'},
						{sort: '-name', label: 'Z-A'},
						{sort: '-first_air_date', label: 'Most recently aired'},
						{sort: 'first_air_date', label: 'Oldest Air-Date'}
					])
				}

				$scope.setCurrentSort = function (sortOrder) {
					$scope.currentSort = sortOrder;
				};

				$scope.currentSort = $scope.sortOrders[0];
			}
		}
	}]);
