'use strict';

describe('Controller: PhysicianCtrl', function () {

  // load the controller's module
  beforeEach(module('liftApp'));

  var PhysicianCtrl,
    scope;

  var fakeModalInstance = {
    result: {
      then: function(confirmCB, cancelCB) {
        this.confirmCallback = confirmCB;
        this.cancelCallback = cancelCB;
      }
    },
    close: function(item) {
      this.result.confirmCallback(item);
    },
    dismiss: function(type) {
      this.result.cancelCallback(type);
    }
  };

  beforeEach(inject(function($modal) {
    spyOn($modal, 'open').andReturn(fakeModalInstance);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$modal_, _PatientService_) {
    scope = $rootScope.$new();
    PhysicianCtrl = $controller('PhysicianCtrl', {
      $scope: scope,
      $modal: _$modal_,
      PatientService: _PatientService_
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.patients.length).toBe(2);
    expect(scope.patient).toBeDefined();
  });

  it ('should cancel the dialog when dismiss is called', function() {
    expect( scope.canceled ).toBeUndefined();
    expect(scope.patient.firstName).toBeUndefined();
    scope.patient.firstName = 'Test';
    scope.openDialog();
    scope.modalInstance.dismiss('cancel');
    expect( scope.canceled ).toBe( true );
    expect(scope.patient.firstName).toBeUndefined();
  });

  it ('should add a user to the list of patients after the dialog is dismissed', function() {
    expect(scope.patient.firstName).toBeUndefined();
    expect(scope.patients.length).toBe(2);
    var p = {
      firstName: 'Test',
      lastName: 'Patient',
      address: 'Address 1',
      gender: 'male',
      dateOfBirth: new Date(),
      phoneNumber: '1111',
      email: 'san@san.com'
    }
    scope.openDialog();
    scope.modalInstance.close(p);
    expect(scope.patients.length).toBe(3);
    expect(scope.patients[2].name).toBe('Test Patient');
    expect(scope.patients[2].id).toBe(3);
  })


});
