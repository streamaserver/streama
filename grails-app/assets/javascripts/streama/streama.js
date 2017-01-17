//= wrapped

//= require /systaro/core/systaro.core
//= require /streama/core/streama.core
//= require /streama/streama.translations

//= require_self


//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree filters
//= require_tree templates

//= require streama.run
//= require streama.routes
//= require streama.interceptor

angular.module('streama', [
    'systaro.core',
    'streama.core',
    'streama.translations',
    'ui.router',
    'ui.bootstrap',
    'ngFileUpload',
    'ui.slider',
    'LocalStorageModule',
    'ui.select',
    'ngSanitize'
]);



angular.module('streama').config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/dash');
});




