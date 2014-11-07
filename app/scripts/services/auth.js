'use strict';

angular.module('todoApp.services')
  .factory('auth', function($http, $location, $window, $q) {
    var service = {};
    service.isAuthenticated = false;
    
    service.request = function(data, url) {
      var deferred = $q.defer();

      $http.post(baseUrl + '/users' + url, data)
        .success(function(data) {
          service.isAuthenticated = true;
          $window.sessionStorage.userId = data.id;
          $window.sessionStorage.apiToken = data.api_token;
          deferred.resolve(data)
        })
        .error(function(data) {
          deferred.reject(data)
        });
      return deferred.promise;
    };

    return service;
  })