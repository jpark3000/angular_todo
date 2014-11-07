'use strict';

describe('Controller: AuthCtrl', function () {
  // load the controller's module
  beforeEach(module('todoApp'));


  var AuthCtrl,
      scope,
      location;
      
  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $location) {

    scope = $rootScope.$new();
    location = $location;

    AuthCtrl = $controller('AuthCtrl', {
      $scope: scope,
      $location: location
    });
  }));

  it('redirects to the todos page on successful authentication', inject(function($q, auth) {
    var deferred = $q.defer()
    deferred.resolve()
    spyOn(auth, 'request').and.returnValue(deferred.promise);
    spyOn(location, 'path');

    scope.authorize()
    scope.$digest();

    expect(location.path).toHaveBeenCalledWith('/todos');
  }));
});
