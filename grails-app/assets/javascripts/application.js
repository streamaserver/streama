//= require angular/angular.min
//= require angular/angular-route.min
//= require angular/angular-cookie.min
//= require angular/angular-resource.min
//= require angular/ng-grid-2.0.11/ng-grid.min
//= require angular/ui-bootstrap-tpls-0.6.0.min
//= require angular/ui-bootstrap-0.7.0.min
//= require_directory .

//= require_self

var meta = document.querySelector('meta[name="_csrf"]');
var csrfToken = meta ? meta.getAttribute('content') : '';
var csrfHeader = document.querySelector('meta[name="_csrf_header"]');
var csrfHeaderName = csrfHeader ? csrfHeader.getAttribute('content') : 'X-CSRF-TOKEN';

var app = angular.module('streama', [
  'ngRoute', 'ngResource', 'ngGrid', 'ui.bootstrap', 'ngCookies'
]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        if (csrfToken) {
          config.headers[csrfHeaderName] = csrfToken;
        }
        return config;
      }
    };
  });
}]);

app.factory('ApiService', ['$resource', function($resource) {
  return {
    shows: $resource('/api/show/:id', {id: '@id'}),
    episodes: $resource('/api/episode/:id', {id: '@id'}),
    movies: $resource('/api/movie/:id', {id: '@id'}),
    files: $resource('/api/file/:id', {id: '@id'}),
    genres: $resource('/api/genre/:id', {id: '@id'}),
    tags: $resource('/api/tag/:id', {id: '@id'})
  };
}]);

app.factory('SocketService', function() {
  var sockets = {};
  return {
    getSocket: function(namespace) {
      if (!sockets[namespace]) {
        sockets[namespace] = io.connect(namespace);
      }
      return sockets[namespace];
    }
  };
});

app.controller('NavController', function($scope, $http, $location, ApiService) {
  $scope.navItems = [
    {label: 'Home', path: '/'},
    {label: 'Shows', path: '/shows'},
    {label: 'Movies', path: '/movies'},
    {label: 'Upload', path: '/upload'},
    {label: 'Admin', path: '/admin'}
  ];

  $scope.isActive = function(path) {
    return $location.path() === path;
  };
});

app.controller('ShowController', function($scope, ApiService) {
  $scope.shows = ApiService.shows.query();
});

app.controller('MovieController', function($scope, ApiService) {
  $scope.movies = ApiService.movies.query();
});

app.controller('UploadController', function($scope, $http) {
  $scope.uploadFile = function() {
    var formData = new FormData();
    formData.append('file', $scope.file);
    $http.post('/api/upload', formData, {
      headers: {'Content-Type': undefined}
    }).then(function(response) {
      $scope.message = 'Upload successful';
    }).catch(function(error) {
      $scope.error = 'Upload failed';
    });
  };
});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/assets/partials/home.html',
      controller: 'HomeController'
    })
    .when('/shows', {
      templateUrl: '/assets/partials/shows.html',
      controller: 'ShowController'
    })
    .when('/movies', {
      templateUrl: '/assets/partials/movies.html',
      controller: 'MovieController'
    })
    .when('/upload', {
      templateUrl: '/assets/partials/upload.html',
      controller: 'UploadController'
    })
    .when('/admin', {
      templateUrl: '/assets/partials/admin.html',
      controller: 'AdminController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.controller('HomeController', function($scope, ApiService) {
  $scope.featuredShows = ApiService.shows.query({featured: true});
  $scope.featuredMovies = ApiService.movies.query({featured: true});
});

app.controller('AdminController', function($scope, ApiService) {
  $scope.shows = ApiService.shows.query();
  $scope.movies = ApiService.movies.query();
  $scope.genres = ApiService.genres.query();
});