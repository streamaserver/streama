//= wrapped

//= require_self
//= require_tree translations

angular
  .module("streama.translations", ["pascalprecht.translate"])
  .config(function ($translateProvider) {
    $translateProvider.determinePreferredLanguage();
    $translateProvider.fallbackLanguage("en");
  })

  .run(function ($rootScope) {
    $rootScope.availableLanguages = [
      "en",
      "fr",
      "es",
      "cat",
      "de",
      'hr',
      "kr",
      "nl",
      "pt",
      "da",
      "ja",
      "it",
      "ar",
      "ru",
      "cn",
      "hu",
      "tr",
      "sk",
    ];
  });
