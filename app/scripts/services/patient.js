'use strict';

angular.module('liftApp')
    .service('PatientService', function () {
      var patients = [
        {
          name: 'Patient One',
          address: 'Address of the user',
          dateOfBirth: new Date(),
          gender: 'male',
          phoneNumber: '12345678901',
          emailAddress: 'patient1@somewhere.com'
        },
        {
          name: 'Patient Two',
          address: 'Address of the user',
          dateOfBirth: new Date(),
          gender: 'female',
          phoneNumber: '12345678901',
          emailAddress: 'patient1@somewhere.com'
        }
      ];

      var defaultDate = new Date();
      defaultDate.setMonth(defaultDate.getMonth() - 12);
      var defaultPatient = {
        gender: 'male',
        dateOfBirth: defaultDate
      };

      return {
        getPatients: function () {
          return patients;
        },

        addPatient: function (patient) {
          patients.push(patient);
        },

        getDefaultPatient: function () {
           return angular.extend({}, defaultPatient);
        }
      }

    });
