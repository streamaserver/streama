'use strict';

angular.module('streama').filter('padnumber', [function () {
	return function(input, length) {
		return pad(input, length);
	};

}]);


angular.module('streama').filter('secondsToDateTime', [function() {
	return function(seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	};
}]);

// <span ng-if="videoDuration >= 3600">{{videoDuration | secondsToDateTime | date:'hh:mm:ss'}}</span>
// <span ng-if="videoDuration < 3600">{{videoDuration | secondsToDateTime | date:'mm:ss'}}</span>

angular.module('streama').filter('secondsToTimeDisplay', ['$filter', function($filter) {
	return function(seconds) {
    var date = new Date(1970, 0, 1).setSeconds(seconds);
    var format = seconds  >= 3600 ? 'hh:mm:ss' : 'mm:ss';
    var result = $filter('date')(date, format);
    return result;
	};
}]);

angular.module('streama').filter('trustResourceUrl', ['$sce', function($sce) {
	return function(input) {
		return $sce.trustAsResourceUrl(input);
	};
}]);

angular.module('streama').filter('trustHtml', ['$sce', function($sce) {
	return function(input) {
		return $sce.trustAsHtml(input);
	};
}]);


function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

angular.module('streama').filter('propsFilter', function() {
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



/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
	return Math.min(Math.max(this, min), max);
};
