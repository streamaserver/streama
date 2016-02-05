'use strict';

streamaApp.filter('padnumber', [function () {
	return function(input, length) {
		return pad(input, length);
	};
	
}]);


streamaApp.filter('secondsToDateTime', [function() {
	return function(seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}]);

streamaApp.filter('trustResourceUrl', ['$sce', function($sce) {
	return function(input) {
		return $sce.trustAsResourceUrl(input);
	};
}]);


function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

streamaApp.filter('propsFilter', function() {
	return function(items, props) {
		var out = [];

		if (angular.isArray(items)) {
			var keys = Object.keys(props);

			items.forEach(function(item) {
				var itemMatches = false;

				for (var i = 0; i < keys.length; i++) {
					var prop = keys[i];
					var text = props[prop].toLowerCase();
					if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
						itemMatches = true;
						break;
					}
				}

				if (itemMatches) {
					out.push(item);
				}
			});
		} else {
			// Let the output be the input untouched
			out = items;
		}

		return out;
	};
});