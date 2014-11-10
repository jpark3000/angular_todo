'use strict';

describe('Services: todos', function() {
  beforeEach(module('todoApp'));

  var todos,
      httpBackend,
      window;

  beforeEach(inject(function(_todos_, $httpBackend, $window) {
    todos = _todos_;
    httpBackend = $httpBackend

    $window.sessionStorage.userId = '1';
    $window.sessionStorage.apiToken = '1234';
  }));

  afterEach(inject(function($window) {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
    $window.sessionStorage.clear()
  }));

  it('successfully retrieves a users todos', function() {
    httpBackend.expectGET(baseUrl + '/users/1/todos?api_token=1234').respond(200);
    todos.request('get', todos.requestUrl());
    httpBackend.flush();
  });

  it('successfully edits a users todos', function() {
    var putData = {api_token: '1234', todo: {description: 'Get Milk', is_complete: true}};
    httpBackend.expectPUT(baseUrl + '/users/1/todos/1', putData).respond(200);
    todos.request('put', todos.updateUrl(1), putData);
    httpBackend.flush();
  });

  it('successfully creates a users todo', function() {
    var postData = {api_token: '1234', todo: {description: 'Get Eggs'}};
    httpBackend.expectPOST(baseUrl + '/users/1/todos', postData).respond(201);
    todos.request('post', todos.createUrl(), postData)
    httpBackend.flush()
  });
});