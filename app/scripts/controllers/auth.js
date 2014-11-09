'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the todoApp
 */


angular.module('todoApp.controllers')
  .controller('AuthCtrl', function ($scope, $location, auth) {
    $scope.authorize = function(data, url) {
      auth.request(data, url)
        .then(function() {
          $location.path('/todos');
        }, function(data) {
          if (data.error) {
            alert(data.error);
          } else if (data.email) {
            alert("Email " + data.email[0])
          };
        });
    };
  });
