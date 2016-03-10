'use strict';

/** Directive for formatting from mm:ss to int and back */
streamaApp.directive("formatDirective", function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
      //view to model
      ngModelController.$parsers.push(function(data) {

       return data.split(":")[0]*60+data.split(":")[1]*1;
      });
      //model to view
      ngModelController.$formatters.push(function(data) {
        if(data == undefined)
        {
          return '';
        }
        var seconds = data % 60;
        var minutes = (data-seconds) / 60;
        return minutes+':'+seconds;
      });
    }
  };
});


streamaApp.controller('modalVideoCtrl', [
	'$scope', '$modalInstance', 'apiService', 'video', 'isManual', 'tvShow',
	function ($scope, $modalInstance, apiService, video, isManual, tvShow) {
	$scope.loading = false;

	$scope.addManually = isManual;

	$scope.episode = video || {};
	$scope.saveEpisode = function (episode) {
		if(tvShow)
			episode.show = tvShow.id;
		delete episode.dateCreated;
		delete episode.lastUpdated;


    apiService.episode.save(episode)
			.success(function (data) {

				$modalInstance.close(data);
			})
			.error(function () {
				alertify.error("An error occured.");
			});
	};

	$scope.deleteVideo = function(video){
		alertify.confirm("Are you sure, you want to delete this Episode?", function (confirmed) {
			if(confirmed){
				apiService.video.delete(video.id).success(function () {
					$modalInstance.close({deleted: true});
				});
			}
		})

	};

	$scope.refetch = function(video){
		alertify.confirm("Are you sure you want to re-fetch the meta-data from TheMovieDb? " +
				"All your changes except for the added files will be overridden?", function (confirmed) {
			if(confirmed){
				apiService.video.refetch(video.id).success(function (result) {
					_.assign(video, result);
					alertify.success('Fetch successful');
				});
			}
		})

	};

	setTimeout(function () {
		$('.name-input').focus();
	}, 200);


	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
