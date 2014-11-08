
/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
angular.module('todoApp.controllers', []);
angular.module('todoApp.services', []);

var baseUrl = "http://recruiting-api.nextcapital.com"

var todoApp = angular.module('todoApp', ['ngRoute', 'ngResource', 'ui.sortable', 'todoApp.controllers', 'todoApp.services']);


todoApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/auth.html',
      controller: 'AuthCtrl'
    })
    .when('/todos', {
      templateUrl: 'views/todos.html', 
      controller: 'TodosCtrl'
    })
});

todoApp.run(function($rootScope, $location, auth) {
  $rootScope.$on('$routeChangeStart', function(event) {
    if (auth.isAuthenticated()) {
      $location.path('/todos')
    } else {
      $location.path('/')
    };
  });
});