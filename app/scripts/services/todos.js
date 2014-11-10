'use strict';

angular.module('todoApp.services')
  .factory('todos', function($http, $q, $window) {
    var service = {};

    service.request = function(method, url, data) {
      var deferred = $q.defer();
      $http[method](url, data)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data) {
          deferred.reject(data);
        });
        return deferred.promise;
    };

    service.sanitizeData = function(data) {
      return {api_token: $window.sessionStorage.apiToken, todo: data}
    };


    service.requestUrl = function() {
      return this.createUrl()
              + '?api_token='
              + $window.sessionStorage.apiToken
    };

    service.createUrl = function() {
      return baseUrl 
              + '/users/'
              + $window.sessionStorage.userId
              + '/todos'
    };

    service.updateUrl = function(todoId) {
      return this.createUrl() + '/' + todoId
    };

    return service;
  });