'use strict';

describe('Services: todos', function() {
  beforeEach(module('todoApp'));

  var todos,
      httpBackend;


  beforeEach(inject(function(_todos_, $httpBackend) {
    todos = _todos_;
    httpBackend = $httpBackend
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('successfully retrieves a users todos', function() {
    httpBackend.expectGET(baseUrl + '/users/1/todos?api_token=1234').respond(200);
    todos.request('get', baseUrl + '/users/1/todos?api_token=1234');
    httpBackend.flush();
  });

  it('successfully edits a users todos', function() {
    var putData = {api_token: '1234', todo: {description: 'Get Milk', is_complete: true}};
    httpBackend.expectPUT(baseUrl + '/users/1/todos/1', putData).respond(200);
    todos.request('put', baseUrl + '/users/1/todos/1', putData);
    httpBackend.flush();
  });

  it('successfully creates a users todo', function() {
    var postData = {api_token: '1234', todo: {description: 'Get Eggs'}};
    httpBackend.expectPOST(baseUrl + '/users/1/todos', postData).respond(201);
    todos.request('post', baseUrl + '/users/1/todos', postData)
    httpBackend.flush()
  });
});