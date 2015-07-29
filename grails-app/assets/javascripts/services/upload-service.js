'use strict';

streamaApp.factory('uploadService', ['$http', 'Upload', '$location', function ($http, Upload, $location) {
	return {
		doUpload: function (uploadStatus, endpoint, callback, files) {

			var urlBase = $('base').attr('href');

			if (files && files.length) {
				for (var i = 0; i < files.length; i++) {
					var file = files[i];

					Upload.upload({
						url: urlBase + endpoint,
						sendObjectsAsJsonBlob: true,
						file: file
					})

						.progress(function (evt) {
							var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
							uploadStatus.percentage = progressPercentage;
						})

						.success(callback || angular.noop);

				}
			}
		}
	};
}]);