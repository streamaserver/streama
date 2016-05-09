//= wrapped

angular
	.module('systaro.core')
	.directive('uisOwlCarousel', uisOwlCarousel);

function uisOwlCarousel($timeout) {
	var directive = {
		restrict: 'A',
		link: link
	};

	return directive;


	function link($scope, $elem, $attr) {
		$timeout(function () {
			$($elem)
				.addClass('owl-carousel owl-theme')
				.owlCarousel();
		});
	}
}
