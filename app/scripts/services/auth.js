'use strict';

angular.module('todoApp.services', [])
  .factory('auth', function($http, $location, $window, $q) {
    var service = {};
    var baseUrl = "http://recruiting-api.nextcapital.com/users";

    service.request = function(data, url) {
      var deferred = $q.defer();
      $http.post(baseUrl + url, data)
        .success(function(data) {
          $window.sessionStorage.userId = data.id;
          $window.sessionStorage.apiToken = data.api_token;
          deferred.resolve(data)
        })
        .error(function(data) {
          deferred.reject(data)
        });
      return deferred.promise;
    }
    return service;
  })