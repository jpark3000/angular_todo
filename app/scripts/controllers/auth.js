'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the todoApp
 */
var baseUrl = "http://recruiting-api.nextcapital.com"

angular.module('todoApp.controllers', [])
  .controller('AuthCtrl', function ($scope, $http, $location, $window) {
    $scope.signUp = function(data) {
      $http.post(baseUrl + "/users", data).
        success(function(data, status, headers, config) {
          console.log(data);
          $window.sessionStorage.user = data.api_token;
          $window.sessionStorage.userId = data.id;
          $location.path('/todos')
        }).
        error(function(data, status, headers, config) {
          console.log(data);
          console.log(status);
        });
    };

    $scope.logIn = function(data) {
      console.log(data)
      $http.post(baseUrl + "/users/sign_in", data).
        success(function(data, status, headers, config) {
          console.log(data);
          $location.path('/todos')
        }).
        error(function(data, status, headers, config) {
          console.log(data);
          console.log(status);
        });
    };
  });
