/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations', ['pascalprecht.translate'])
	.config(function ($translateProvider) {
		$translateProvider.determinePreferredLanguage();
		$translateProvider.fallbackLanguage('en');
	})

	.run(function ($rootScope) {
		$rootScope.availableLanguages = ['en', 'fr','de'];
	});

