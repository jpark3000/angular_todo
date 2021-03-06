'use strict';

angular.module('todoApp.controllers')
  .controller('TodosCtrl', function ($scope, $location, todos, auth) {

    var getTodos = function() {
      todos.request('get', todos.requestUrl())
        .then(function(data) {
          $scope.todos = data;
        }, function(data) {
          alert(data.error);
        });
    };

    if (auth.isAuthenticated()) { getTodos() };

    $scope.createTodo = function(data) {
      var data = todos.sanitizeData(data)
      todos.request('post', todos.createUrl(), data)
        .then(function(data) {
          $scope.todo = '';
          $scope.todos.push(data);
        }, function(data) {
          alert(data.error);
        });
    };

    $scope.edit = function(todo, index) {
      $scope.todos[$scope.prevEditableTodoIndex || 0].editable = false
      $scope.prevEditableTodoIndex = index;
      
      $scope.editableTodo = angular.copy(todo);
      todo.editable = true;
    };

    $scope.cancelEdit = function(todo) {
      todo.editable = false;
      $scope.editableTodo = null;
    };

    $scope.updateTodo = function(todo, index) {   
      var data = todos.sanitizeData(todo) 
      todos.request('put', todos.updateUrl(data.todo.id), data)
        .then(function(data) {
          $scope.todos[index] = data;
        }, function(data) {
          alert(data.error);
        });
    };

    $scope.signOut = function() {
      auth.signOut()
        .then(function() {
          $location.path('/');
        }, function(data) {
          alert(data.error);
        });
    };
  });