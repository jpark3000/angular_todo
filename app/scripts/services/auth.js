'use strict';

angular.module('todoApp.services')
  .factory('auth', function($http, $location, $window, $q) {
    var service = {};
    
    service.request = function(data, url) {
      var deferred = $q.defer();

      $http.post(baseUrl + '/users' + url, data)
        .success(function(data) {
          storeUser(data.id, data.api_token);
          deferred.resolve(data)
        })
        .error(function(data) {
          deferred.reject(data)
        });
      return deferred.promise;
    };

    service.signOut = function() {
      var deferred = $q.defer();
      var data = {user_id: $window.sessionStorage.userId, api_token: $window.sessionStorage.apiToken}
      var headers = {'Accept':'*/*', 'Content-Type':'application/json'}

      $http.delete(baseUrl + '/users/sign_out', {headers: headers, data: data})
        .success(function() {
          $window.sessionStorage.clear();
          deferred.resolve();
        })
        .error(function(data) {
          deferred.reject(data);
        });
      return deferred.promise;
    };

    service.isAuthenticated = function() {
      if ($window.sessionStorage.userId && $window.sessionStorage.apiToken) {
        return true;
      } else {
        return false;
      };
    };

    var storeUser = function(id, apiToken) {
      $window.sessionStorage.userId = id;
      $window.sessionStorage.apiToken = apiToken;
    }

    return service;
  })