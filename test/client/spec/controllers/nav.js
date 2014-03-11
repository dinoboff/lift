'use strict';

describe('Controller: NavCtrl', function() {

  beforeEach(module('liftApp'));

  var NavbarCtrl,
      location,
      scope;

  beforeEach(inject(function($rootScope, $controller, $location) {
    scope = $rootScope.$new();
    location = $location;
    NavbarCtrl = $controller('NavbarCtrl', {
      $scope: scope
    });
  }));
  it ('should provide a list of menu items with link to them', function() {
    var menu = scope.menu;
    expect(menu).toBeDefined();
    expect(menu.length).toBe(5);
    expect(scope.isActive('/')).toBe(true);
  });

  it ('should provide a list of users to display in navbar', function(){
    var users = scope.users;
    expect(users).toBeDefined();
    expect(users.length).toBe(3);
    expect(scope.activeUser).toBe(users[0]);
  });

  it ('should set the chosen user as the active user', function() {
    var users = scope.users;
    expect(scope.activeUser).toBe(users[0]);
    scope.chooseUser(users[1]);
    expect(scope.activeUser).toBe(users[1]);
  })

});