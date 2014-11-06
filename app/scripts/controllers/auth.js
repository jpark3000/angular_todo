'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the todoApp
 */


angular.module('todoApp.controllers', [])
  .controller('AuthCtrl', function ($scope, $location, auth) {
    $scope.auth = function(data, url) {
      auth.request(data, url)
        .then(function() {
          $location.path('/todos');
        }, function() {
          alert('error');
        });
    };
  });
