'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('liftApp'));

  var HomeCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));
});
