'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
angular.module('todoApp', ['ngRoute', 'ngResource']).
config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/auth.html',
      controller: 'AuthCtrl'
    })
    // .when('/todos', {
    //   templateUrl: 'views/todos.html', 
    //   controller: 'TodoCtrl'
    // });
});
