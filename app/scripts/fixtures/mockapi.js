

var app = angular.module('liftApp.mocked');


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



app.run(['$httpBackend','API_BASE_URL','Config', 'PATIENTS', '$log', function($httpBackend, API_BASE_URL,Config, PATIENTS, $log){

  var patientList = PATIENTS;
  function regEsc(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  //When backend receives a request to the views folder, pass it through
  $httpBackend.whenGET( new RegExp( regEsc( Config.viewDir ) ) ).passThrough();

  $httpBackend.whenGET('api/v1/patients').respond(function(method, url) {
    return [200, patientList.data];
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
        $log.log('Delaying response with ' + Config.fakeDelay + 'ms');
        $timeout(function () {
          $log.log("Returning... ", response);
          deferred.resolve(response);
        }, Config.fakeDelay);

        return deferred.promise;
      }

    }
  })

}]);

