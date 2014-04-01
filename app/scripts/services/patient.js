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
              id: 1,
              name: 'Amoxicillin',
              type: 'tablet',
              quantity: 60,
              dose: 1,
              schedule: [1,0,1],
              date: new Date()
            },
            {
              id: 2,
              name: 'Doxycycline 100 mg',
              type: 'capsule',
              quantity: 60,
              dose: 1,
              schedule: [0,0,1],
              date: new Date()
            },
            {
              id: 3,
              name: 'Cycloproxyvon 100 mg',
              type: 'capsule',
              quantity: 60,
              dose: 1,
              schedule: [1,1,1],
              date: new Date()
            },
            {
              id: 4,
              name: 'Monitor Glucose',
              schedule: [1,0,1],
              type: 'data',
              date: new Date(),
              range: {
                start: 80,
                end: 500
              }
            },{
              id: 5,
              name: 'Monitor Temperature',
              schedule: [1,1,1],
              type: 'data',
              date: new Date(),
              range: {
                start: 90,
                end: 110
              }
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

      var medicationData = [
        {
          patient_id: "1",
          history:[
            {
              date: '20140329',
              data: [
                {
                  id: 1,
                  taken: true,
                  not_taken: false,
                  schedule: 0
                },
                {
                  id: 2,
                  taken: true,
                  not_taken: false,
                  schedule: 0
                },
                {
                  id: 3,
                  taken: false,
                  not_taken: true,
                  schedule: 0
                },
                {
                  id: 4,
                  taken: true,
                  data: 90,
                  date: "20140329 13:45"
                },
                {
                  id: 5,
                  taken: true,
                  data: 170,
                  date: "20140329 13:50"
                },
                {
                  id: 1,
                  taken: true,
                  not_taken: false,
                  schedule: 2
                }
              ]
            }
          ]
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
        },

        getMedicationInformation: function(id, date) {
          var patient = this.getPatientById(id);
          if(patient) {

          }
        }
      }

    });
