'use strict';

angular.module('todoApp.controllers')
  .controller('TodosCtrl', function ($scope, $location, todos, auth) {

    todos.request('get', todos.requestUrl())
      .then(function(data) {
        $scope.todos = data;
      }, function() {
        alert('error');
      });

    $scope.createTodo = function(data) {
      var data = todos.sanitizeData(data)
      todos.request('post', todos.createUrl(), data)
        .then(function(data) {
          $scope.todo = '';
          $scope.todos.push(data);
        }, function() {
          alert('error');
        });
    };

    $scope.edit = function(todo) {
      $scope.editableTodo = angular.copy(todo)
      todo.editable = true;
    };

    $scope.cancelEdit = function(todo) {
      $scope.editableTodo = null;
      todo.editable = false;
    };

    $scope.updateTodo = function(todo, index) {   
      var data = todos.sanitizeData(todo) 
      todos.request('put', todos.createUrl() + '/' + data.todo.id, data)
        .then(function(data) {
          $scope.todos[index] = data;
        }, function(data) {
          alert('error');
        });
    };

    $scope.signOut = function() {
      auth.signOut()
        .then(function() {
          $location.path('/');
        }, function(data) {
          console.log(data)
          alert('error');
        });
    };
  });