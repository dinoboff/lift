'use strict';

var interceptor = function (data, operation, what) {
  var resp;

  if (operation === 'getList') {
    resp = data[what] ? data[what] : [];
    resp.cursor = data.cursor ? data.cursor : null;
  } else {
    resp = data;
  }
  return resp;
};

var app = angular.module('liftApp');

app.service('PatientAPI', ['Restangular', 'API_BASE_URL', function (Restangular, API_BASE_URL) {
  return Restangular.withConfig(function (RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(API_BASE_URL);
    RestangularConfigurer.addResponseInterceptor(interceptor);
  });
}]);


app.service('PatientService', ['PatientAPI', function (PatientAPI) {
  return {
    getPatients: function () {
      return PatientAPI.all('patients').getList();
    },

    addPatient: function (patient) {
      return PatientAPI.all('patients').post(patient);
    },

    addMedication: function (id, medication) {
      return PatientAPI.one('patients', id).all('medication').post(medication);
    },

    getPatientById: function (id) {
      return PatientAPI.one('patients', id).get();
    },

    getMedicationInformation: function (id, date) {
      return PatientAPI.one('patients', id).one('medication').get();
    }
  }

}]);
