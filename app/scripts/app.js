'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */

var todoApp = angular.module('todoApp', ['todoApp.controllers', 'todoApp.services', 'ngRoute', 'ngResource']);


todoApp.config(function($routeProvider) {
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

