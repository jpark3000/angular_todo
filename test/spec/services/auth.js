'use strict';

describe('Service: auth', function () {

  // load the service's module
  beforeEach(module('todoApp'));

  // instantiate service
  var auth, httpMock, postData, succesfulResponse, window;
  var baseUrl = 'http://recruiting-api.nextcapital.com/users'
  
  beforeEach(inject(function (_auth_, $httpBackend, $window) {
    auth = _auth_;
    httpMock = $httpBackend
    window = $window
    postData = {'email': '99@1.com', 'password': '1'}
    succesfulResponse = {'api_token':'123', 'email':'99@1.com', 'id':1, 'todos':[]}
    
    httpMock.expectPOST(baseUrl, postData).respond(succesfulResponse)
    auth.request(postData, '')
    httpMock.flush()
  }));

  it('should store user id in sessionStorage', function() {
    expect(window.sessionStorage.userId).toBe('1')
  });

  it('should store api_token in sessionStorage', function() {
    expect(window.sessionStorage.apiToken).toBe('123')
  });

});