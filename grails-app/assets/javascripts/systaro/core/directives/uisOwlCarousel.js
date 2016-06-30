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
				.owlCarousel({
					loop: true,
					items: 1,
					dots: true,
					autoplay: true,
					autoplaySpeed: 1000
				});
		}, 10);
	}
}
