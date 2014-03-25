'use strict';

describe('Service: PatientService', function () {

  // load the service's module
  beforeEach(module('liftApp'));

  // instantiate service
  var PatientService;
  beforeEach(inject(function (_PatientService_) {
    PatientService = _PatientService_;
  }));

  it('should do something', function () {
    expect(!!PatientService).toBe(true);
  });

});
