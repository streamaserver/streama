//= wrapped

//= require_self
//= require_tree translations

angular.module('streama.translations', ['pascalprecht.translate'])
	.config(function ($translateProvider) {
		$translateProvider.determinePreferredLanguage();
		$translateProvider.fallbackLanguage('en');
	})

	.run(function ($rootScope) {
		$rootScope.availableLanguages = ['en', 'fr', 'es', 'de', 'kr', 'nl', 'pt'];
	});
