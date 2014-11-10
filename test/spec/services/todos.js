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
    httpBackend.expectGET(baseUrl + '/users/1/todos?api_token=1234').respond(200, '')
    todos.request('get', baseUrl + '/users/1/todos?api_token=1234').then(function(data) { console.log(data)})
    httpBackend.flush()
  });
});