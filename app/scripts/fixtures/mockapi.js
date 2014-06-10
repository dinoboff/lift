

'use strict';


var app = angular.module('liftApp');


app.constant('Config', {
  useMocks: true,
  viewDir: 'views/',
  fakeDelay: 100
});

app.constant('PATIENTS', {
  data: {
    patients: [
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
        monitor: {
          glucose: true,
          bloodPressure: true
        },
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
        emailAddress: 'patient2@somewhere.com',
        monitor: {
          bloodPressure: true,
        }
      }
    ]

  }
});
