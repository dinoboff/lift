'use strict';

angular.module('liftApp')
    .service('PatientService', function () {
      var currentId = 2;
      var BEFORE_FOOD = 0;
      var AFTER_FOOD = 1;
      var patients = [
        {
          id: 1,
          firstName: 'Patient',
          lastName: 'One',
          name: 'Patient One',
          address: 'Address of the user',
          dateOfBirth: new Date(),
          gender: 'male',
          phoneNumber: '12345678901',
          emailAddress: 'patient1@somewhere.com',
          prescriptions: [
            {
              name: 'Amoxicillin',
              type: 'tablet',
              quantity: 60,
              dose: 1,
              schedule: [1,0,1],
              date: new Date()
            },
            {
              name: 'Doxycycline 100 mg',
              type: 'capsule',
              quantity: 60,
              dose: 1,
              schedule: [0,0,1],
              date: new Date()
            },
            {
              name: 'Monitor Glucose',
              schedule: 8,
              date: new Date()
            },{
              name: 'Monitor Blood Pressure',
              schedule: 24,
              date: new Date()
            }
          ]
        },
        {
          id: 2,
          name: 'Patient Two',
          firstName: 'Patient',
          lastName: 'Two',
          address: 'Address of the user',
          dateOfBirth: new Date(),
          gender: 'female',
          phoneNumber: '12345678901',
          emailAddress: 'patient2@somewhere.com'
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
          patient.id = ++currentId;
          patients.push(patient);
        },

        getDefaultPatient: function () {
           return angular.extend({}, defaultPatient);
        },

        getPatientById: function(id) {
          var patient = null;
          angular.forEach(patients, function(p) {
            if(p.id == id) {
              patient = p;
            }
          });
          return patient;
        }
      }

    });
