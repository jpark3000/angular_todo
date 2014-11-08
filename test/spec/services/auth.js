'use strict';

describe('Service: auth', function () {

  // load the service's module
  beforeEach(module('todoApp'));

  // instantiate service
  var auth, postData, succesfulResponse, window, httpBackend;
  
  beforeEach(inject(function(_auth_, $httpBackend, $window) {
    auth = _auth_;
    window = $window;
    httpBackend = $httpBackend;
    postData = {'email': '99@1.com', 'password': '1'};
    succesfulResponse = {'api_token':'123', 'email':'99@1.com', 'id':1, 'todos':[]};
  }));

  describe('successful authentication', function() {
    beforeEach(function() {
      httpBackend.expectPOST(baseUrl + '/users', postData).respond(succesfulResponse)
      auth.request(postData, '')
      httpBackend.flush()
    });
    
    it('should store user id in sessionStorage', function() {
      expect(window.sessionStorage.userId).toBe('1')
    });

    it('should store api_token in sessionStorage', function() {
      expect(window.sessionStorage.apiToken).toBe('123')
    });

    it('should set isAuthenticated to true', function() {
      expect(auth.isAuthenticated).toBe(true);
    });
  });

  describe('unsuccessful authentication', function() {
    beforeEach(function() {
      httpBackend.expectPOST(baseUrl + '/users', postData).respond(500, '')
      auth.request(postData, '')
      httpBackend.flush()
    });

    it('should set isAuthenticated to false', function() {
      expect(auth.isAuthenticated).toBe(false);
    });
  });
});