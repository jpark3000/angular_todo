'use strict';

describe('Controller: TodosCtrl', function () {
  // load the controller's module
  beforeEach(module('todoApp'));


  var scope,
      createController;
      
  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {

    scope = $rootScope.$new();
    
    createController = function() {
      $controller('TodosCtrl', {
        $scope: scope
      });
    };
  }));

  it('Gets a users todos if a user is authenticated', inject(function($q, auth, todos) {
    var mockUsersTodos = [{description: 'get pizza', is_complete: false}]
    var deferred = $q.defer()
    deferred.resolve(mockUsersTodos)

    spyOn(auth, 'isAuthenticated').and.returnValue(true);
    spyOn(todos, 'request').and.returnValue(deferred.promise)
    
    createController()
    scope.$digest();
    expect(scope.todos).toEqual(mockUsersTodos)
  }));
});