

'use strict';


var app = angular.module('liftApp.mocked', ['restangular','ngMockE2E', 'liftApp']);


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
    ]

  }
});



app.run(['$httpBackend','API_BASE_URL','Config', 'PATIENTS', function($httpBackend, API_BASE_URL,Config, PATIENTS){


  var patientList = PATIENTS;
  function regEsc(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  function findPatientById(id) {
    var result = null;
    angular.forEach(patientList.data.patients, function(patient) {
      if(patient.id == id) {
        result = patient;
      }
    });
    return result;
  }

  $httpBackend.whenGET( new RegExp( regEsc( Config.viewDir ) ) ).passThrough();

  $httpBackend.whenGET('api/v1/patients').respond(function(method, url) {
    return [200, patientList.data];
  });

  $httpBackend.whenGET(/^api\/v1\/patients\/(\d+)/).respond(function(method,url) {
    var regex = /^api\/v1\/patients\/(\d+)/;
    var match = regex.exec(url);
    var id = match[1];

    var result = findPatientById(id);
    return [200, result]
  });

  $httpBackend.whenPOST("api/v1/patients").respond(function(method, url, data) {
    console.log(""+data);
    var patient = JSON.parse(data);
    patient.id = patientList.data.patients.length;
    console.log(patient);
    patientList.data.patients.push(patient);
    return [200, data]
  });

  $httpBackend.whenPOST(/^api\/v1\/patients\/(\d+)\/medication/).respond(function(method, url, data) {
    console.log(data);
    var regex = /^api\/v1\/patients\/(\d+)\/medication/;
    var match = regex.exec(url);
    var id = match[1];
    var patient = findPatientById(id);

    var medication = JSON.parse(data);
    console.log(medication);
    if (patient) {
      patient.prescriptions = patient.prescriptions || [];
      patient.prescriptions.push(medication);
    }
    return [200, patient]
  });



}]);

app.config(['$httpProvider', 'Config',function ($httpProvider, Config) {
  if(!Config.useMocks) return;

  $httpProvider.interceptors.push(function ($q, $timeout, Config, $log) {
    return {
      'request': function (config) {
        $log.log('Requesting ' + config.url, config);
        return config;
      },
      'response': function (response) {
        var deferred = $q.defer();

        if(response.config.url.indexOf(Config.view_dir) == 0) return response; //Let through views immideately

        //Fake delay on response from APIs and other urls
        $timeout(function () {
          deferred.resolve(response);
        }, Config.fakeDelay);

        return deferred.promise;
      }

    }
  })

}]);

