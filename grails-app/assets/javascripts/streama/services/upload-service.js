'use strict';

angular.module('streama').factory('uploadService', function ($http, Upload, contextPath) {
	return {
		doUpload: function (uploadStatus, endpoint, callback, errCallback, files) {
			if (files && files.length) {
				for (var i = 0; i < files.length; i++) {
					var file = files[i];

					Upload.upload({
						url: contextPath + endpoint,
						sendObjectsAsJsonBlob: true,
						file: file
					})

						.progress(function (evt) {
							var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
							uploadStatus.percentage = progressPercentage;
						})

						.success(callback || angular.noop)
						.error(function (err) {
              console.log('%c err', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', arguments);
              alertify.error("File upload failed. Please close this popup and try again.", 0);
              uploadStatus.percentage = null;
              (errCallback || angular.noop)(err);
            });

				}
			}
		}
	};
});
