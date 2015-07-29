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

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}