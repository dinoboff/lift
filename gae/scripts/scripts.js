'use strict';

var app = angular.module('liftApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngProgress',
  'ui.calendar',
  'ui.bootstrap',
  'restangular'
]);

app.constant('API_BASE_URL', 'api/v1');

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/medicine', {
        templateUrl: 'views/medicine.html',
        controller: 'MedicineCtrl'
      })
      .when('/testResults', {
        templateUrl: 'views/testResults.html',
        controller: 'TestResultsCtrl'
      })
      .when('/history', {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl'
      })
      .when('/meters', {
        templateUrl: 'views/meters.html',
        controller: 'MetersCtrl'
      })
      .when('/clinician', {
        templateUrl: 'views/clinician.html',
        controller: 'ClinicianCtrl'
      })
      .when('/', {
        templateUrl: 'views/physician.html',
        controller: 'PhysicianCtrl'
      })
      .when('/patients/:patient_id', {
        templateUrl: 'views/patients.html',
        controller: 'PatientsCtrl',
        resolve: {
          selectedPatient: ['$route', 'PatientService', function ($route, PatientService) {
            var patientId = $route.current.params.patient_id
            return PatientService.getPatientById(patientId);
          }]
        }
      })
      .when('/patients/:patient_id/charts', {
        templateUrl: 'views/charts.html',
        controller: 'ChartsCtrl',
        resolve: {
          selectedPatient: ['$route', 'PatientService', function ($route, PatientService) {
            var patientId = $route.current.params.patient_id;
            return PatientService.getPatientById(patientId);
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });

//  $locationProvider.html5Mode(true);
}]);

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

    updateMonitor: function(id, data) {
      return PatientAPI.one('patients', id).all('updateMonitor').post(data);
    },

    getPatientById: function (id) {
      return PatientAPI.one('patients', id).get();
    },

    getMedicationInformation: function (id, date) {
      return PatientAPI.one('patients', id).one('medication').get();
    }
  }

}]);

'use strict';

angular.module('liftApp')
    .controller('NavbarCtrl', ['$scope', '$location', function ($scope, $location) {
      $scope.menu = [
        {
          'title': 'Overview',
          'link': '/'
        },
        {
          'title': 'Health Meters',
          'link': '/meters'
        },
        {
          'title': 'Medicine',
          'link': '/medicine'
        },
        {
          'title': 'History',
          'link': '/history'
        },
        {
          'title': 'Test Results',
          'link': '/testResults'
        },
        {
          'title': 'Physician',
          'link': '/physician'
        }
      ];

      $scope.isActive = function (route) {
        return route === $location.path();
      };
      $scope.users = [
        {
          name: 'Melba Brewster',
          username: 'melba'
        },
        {
          name: 'Harriett Hodges',
          username: 'hhodges'
        },
        {
          name: 'Thomas Frost',
          username: 'tfrost'
        },
        {
          name: 'Diane Sparks',
          username: 'sparks231'
        }
      ];
      $scope.activeUser = $scope.users[0];

      $scope.chooseUser = function (user) {
        $scope.activeUser = user;
      };
    }]);

'use strict';

angular.module('liftApp')
    .controller('HomeCtrl', ['$scope', function ($scope) {
      $scope.meters = [
        '127',
        'Abdominal Cramps',
        'Benadryl',
        'Calories',
        'Constipation',
        'Decreased Hearing',
        'Ear Ache',
        'Ear Echo Right'
      ];
    }]);

'use strict';

var Holder = Holder || {};

var app = angular.module('liftApp');
app.directive('linechart', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element) {
      element.text('this is the linechart directive');
    }
  };
});

app.directive('holderFix', function() {
  return {
    link: function(scope, element) {
      Holder.run({images:element[0], nocss:true});
    }
  };
});


app.directive('setFocus', function() {
  return {
    restrict: 'E',
    link: function(scope, element) {
      element[0].focus();
    }
  }
});


app.directive('laDataChart', function() {
  return {
    restrict: 'E',
    scope: {
      data : '='
    },
    templateUrl: 'views/charts/line.html',
    link: function(scope, element, attrs) {
      scope.graph = {width: 800, height: 350};
      scope.layout = {top: 40, right: 40, bottom: 40, left: 40};
      scope.totalWidth = scope.graph.width +  scope.layout.left + scope.layout.right;
      scope.totalHeight = scope.graph.height + scope.layout.top + scope.layout.bottom;

      var x = d3.time.scale().rangeRound([0, scope.graph.width]);
      x.domain(d3.extent(scope.data, function(d) { return d.date; }));

      var maxGlucose = d3.max(scope.data, function(d) {return d.glucose}) + 10;
      var minGlucose = d3.min(scope.data, function(d) {return d.glucose});
      scope.meanGlucose = d3.mean(scope.data, function(d) { return d.glucose});

      var maxTemp = d3.max(scope.data, function(d) {return d.temp}) + 10;
      var minTemp = d3.min(scope.data, function(d) {return d.temp});
      scope.meanTemp = d3.mean(scope.data, function(d) { return d.temp});

      var y1 = d3.scale.linear().domain([minGlucose, maxGlucose]).range([scope.graph.height/2, 0]);
      var y2 = d3.scale.linear().domain([minTemp, maxTemp]).range([scope.graph.height/2, 0]);

      var line1 = d3.svg.line().x(function(d, i) {return x(d.date) }).y(function(d,i) { return y1(d.glucose)}).interpolate('linear');
      var line2 = d3.svg.line().x(function(d, i) {return x(d.date) }).y(function(d,i) { return y2(d.temp)}).interpolate('linear').interpolate('linear');



      scope.glucoseMean = y1(scope.meanGlucose);
      scope.tempMean = y2(scope.meanTemp);

      var yAxis1 = d3.svg.axis()
          .scale(y1)
          .orient("left")
          .ticks(6);

      var yAxis2 = d3.svg.axis()
          .scale(y2)
          .orient("right")
          .ticks(10);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickPadding(8)
          .tickSize(0)
          .ticks(d3.time.hours, 6);

      //This needs to be put into the template later.
      var svg = d3.select("svg .chart-container");
      svg.append("g").attr("class", "x axis ").attr('transform', 'translate(0,'+scope.graph.height/2+')').call(xAxis);
      svg.append("g").attr("class", "y axis glucose").call(yAxis1);
      svg.append("g").attr("class", "y axis temp").attr('transform', 'translate('+ scope.graph.width +',0)').call(yAxis2);

      scope.line1Path = line1(scope.data);
      scope.line2Path = line2(scope.data);

      scope.glCircles = [];
      scope.tempCircles = [];
      scope.medData = [];
      var medicineCircles = {};
      //yuck
      angular.forEach(scope.data, function(d) {
        var circle1 = {cx: x(d.date), cy: y1(d.glucose)};
        var circle2 = {cx: x(d.date), cy: y2(d.temp)};
        angular.forEach(d.medicines, function(medicine, index) {
          var s = medicineCircles[medicine.name];
          if (!s) {
            s = {};
            s.name = medicine.name;
            s.data = [];
            medicineCircles[medicine.name] = s;
          }
          var className = medicine.value == 1 ? "taken" : "not-taken";
          s.data.push({className:className, cx:x(d.date)});
        });
        scope.glCircles.push(circle1);
        scope.tempCircles.push(circle2);
      });

      scope.medData = medicineCircles;
    }
  }
});
'use strict';

angular.module('liftApp')
    .controller('MedicineCtrl', ['$scope', function ($scope) {
      $scope.activeMedicines = [
        {
          drugName: 'Metformin',
          dosage: '500 mg 2-3 times daily',
          classification: 'Anti Diabetic agents'
        },
        {
          drugName: 'Amidiopine',
          dosage: '2.5 mg once daily',
          classification: 'Calcium Antagonist'
        },
        {
          drugName: 'Catapres',
          dosage: '75-150 mgc twice daily',
          classification: 'Anti Hypertensive'
        },
        {
          drugName: 'Metopolol',
          dosage: '50-100 mg once daily',
          classification: 'Beta Blockers'
        }
      ];
    }]);

'use strict';

angular.module('liftApp')
    .controller('TestResultsCtrl', ['$scope', function ($scope) {
      $scope.testResults = [
        {
          testName: 'Urine Test',
          date: '11/14/2013',
          result: 'Normal'
        },
        {
          testName: 'Blood Test',
          date: '11/14/2013',
          result: 'Normal'
        },
        {
          testName: 'Blood Glucose Test',
          date: '11/14/2013',
          result: 'Normal'
        },
        {
          testName: 'Blood Urea Nitrogen (BUN) Test',
          date: '11/14/2013',
          result: 'Normal'
        },
        {
          testName: 'Electrocardiogram (ECG) Test',
          date: '11/12/2013',
          result: 'Normal'
        }
      ];
    }]);

'use strict';

angular.module('liftApp')
  .controller('HistoryCtrl', ['$scope', function ($scope) {
      $scope.history = [
        {
          date: 'December 5, 2012 6:00 PM',
          text: 'Physician changed the dosage of Amelodopine from 2.5mg to 5mg daily'
        },
        {
          date: 'November 10, 2012 5:00 PM',
          text: 'Physician order: Take blood pressure every 4 hours'
        },
        {
          date: 'November 09, 2012 6:00 PM',
          text: 'Clinical Visit: Dr. Mendez at Philippine General Hospital',
          extraInfo: 'Details...'
        },
        {
          date: 'November 5, 2012 6:00 PM',
          text: 'Physician prescribed the dosage of Amelodopine 2.5mg daily'
        }
      ];
    }]);

'use strict';

angular.module('liftApp')
    .controller('MetersCtrl', ['$scope', function ($scope) {

      $scope.events = [
        {
          date: '11/14/2012 02:00PM',
          event: 'Follow up checkup with Dr. Russel (Cardiologist)'
        },
        {
          date: '11/14/2012 08:00AM',
          event: 'Amelodopine 10mg'
        },
        {
          date: '11/14/2012 06:00AM',
          event: 'Light Jogging'
        },
        {
          date: '11/15/2012 09:00AM',
          event: 'Physical Therapy Session with Dr. Santos(PT)'
        },
        {
          date: '11/15/2012 08:00AM',
          event: 'Metformin 50mg'
        }
      ];
    }]);

'use strict';

var app = angular.module('liftApp');

app.controller('ClinicianCtrl', ['$scope', function ($scope) {

  $scope.uiConfig = {
    calendar: {
      height: 450,
      editable: true,
      header: {
        right: 'month,agendaWeek,agendaDay',
        center: 'title',
        left: 'prev,next today'
      }
    }
  };

  $scope.eventSources = [
  ];
  $scope.patientInfo = [
    {
      type: 'chronic',
      number: 80,
      percentage: 40,
      icon: 'fa-ambulance'
    },
    {
      type: 'nominal',
      number: 80,
      percentage: 40,
      icon: 'fa-medkit'
    },
    {
      type: 'acute',
      number: 20,
      percentage: 10,
      icon: 'fa-wheelchair'
    },
    {
      type: 'new',
      number: 20,
      percentage: 10,
      icon: 'fa-plus-square'
    }
  ];

  $scope.transactionHistory = [
    {
      date: 'Dec 5, 2012 5:00 PM',
      text: '[patient Eric] Increased dosage of Amlodopine from 2.5mg to 5mg daily'
    },
    {
      date: 'Nov 16, 2012 9:00 AM',
      text: '[patient Eric] ordered to take blood pressure every 4 hours'
    },
    {
      date: 'Nov 15, 2012 9:00 AM',
      text: '[patient Eric] regular clinical visit'
    },
    {
      date: 'Nov 5, 2012 5:00 PM',
      text: '[patient Eric] Prescribed Amlodopine 2.5mg daily'
    }

  ];

  $scope.prescriptionHistory = [
    {
      label:'Amlodopine 5mg Tablet',
      qty:30,
      dosage: '5mg OD',
      classification: 'Calcium Antagonist',
      pharmacy: 'Metro Drug'
    },
    {
      label:'Catapres 0.1mg tablet',
      qty:60,
      dosage: '0.1mg bd',
      classification: 'Anti Hypertensive',
      pharmacy: 'Metro Drug'
    },
    {
      label:'Metformin',
      qty:60,
      dosage: '500mg bd',
      classification: 'Anti Diabetic Agent',
      pharmacy: 'Metro Drug'
    },
    {
      label:'Metapolol Tablet',
      qty:30,
      dosage: '50mg OD',
      classification: 'Beta Blockers',
      pharmacy: 'Metro Drug'
    },
    {
      label:'Instamet',
      qty:60,
      dosage: '500mg',
      classification: 'Anti Diabetic Agent',
      pharmacy: 'Metro Drug'
    }
  ]


}]);

'use strict';

var app = angular.module('liftApp');
app.controller('PhysicianCtrl', ['$scope', '$modal', 'PatientService', function ($scope, $modal, PatientService) {

  var defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() - 12);

  var defaultPatient = {
    gender: 'male',
    dateOfBirth: defaultDate
  };

  $scope.patients = PatientService.getPatients().$object;

  $scope.patient = defaultPatient;

  $scope.openDialog = function () {
    $scope.modalInstance = $modal.open({
      templateUrl: 'views/addPatient.html',
      controller: 'AddPatientModalInstanceCtrl',
      resolve: {
        patient: function () {
          return $scope.patient;
        }
      }
    });

    $scope.modalInstance.result.then(function (item) {
      var newPatient = {};
      angular.extend(newPatient, item);
      newPatient.name = newPatient.firstName + " " + newPatient.lastName;
      PatientService.addPatient(newPatient);
      $scope.patient = defaultPatient;
      $scope.patients = PatientService.getPatients().$object;
    }, function () {
      $scope.patient = defaultPatient;
      $scope.canceled = true;
    })
  };


  $scope.openPrescriptionDialog = function (patientId) {
    $scope.prescriptionDialogInstance = $modal.open({
      templateUrl: 'views/prescriptions.html',
      controller: 'PrescriptionInstanceController',
      windowClass: 'prescription-modal',
      resolve: {
        patient: function () {
          console.log("Resolving from the db....");
          return PatientService.getPatientById(patientId);
        }
      }
    });

    $scope.prescriptionDialogInstance.result.then(function (item) {
      $scope.patient = defaultPatient;
      $scope.patients = PatientService.getPatients().$object;
    }, function () {
      $scope.patient = defaultPatient;
      $scope.canceled = true;
    });

  };


}]);

app.controller('AddPatientModalInstanceCtrl', ['$scope', '$modalInstance', '$filter', 'patient', function ($scope, $modalInstance, $filter, patient) {
  $scope.patient = patient;

  $scope.$watch('patient', function (newVal, oldVal) {
    if (newVal) {
      $scope.dateString = $filter("date")(newVal.dateOfBirth, 'yyyy-MM-dd');
    }
  });

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.submit = function (isValid) {
    if (isValid) {
      $modalInstance.close($scope.patient);
    }
  }

}]);

app.controller('PrescriptionInstanceController', ['$scope', '$modalInstance', 'patient', 'PatientService', function ($scope, $modalInstance, patient, PatientService) {
  $scope.patient = patient;
  var schedules = [
    'None',
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, 1],
    4,
    5,
    6,
    8,
    12,
    24
  ];
  var defaultMedication = {
    dose: 1,
    sched: 2,
    type: 'tablet',
    name: ''
  };

  $scope.medication = angular.extend({}, defaultMedication);

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.submit = function () {
    $modalInstance.close($scope.patient);
  };

  $scope.addMedication = function (isValid) {
    if (isValid) {
      $scope.patient.prescriptions = $scope.patient.prescriptions || [];
      var schedule = schedules[$scope.medication.sched];
      $scope.medication.schedule = schedule;
      $scope.medication.date = new Date();
      PatientService.addMedication(patient.id, $scope.medication).then(function() {
        $scope.patient.prescriptions.push($scope.medication);
        console.log($scope.patient);
        $scope.medication = angular.extend({}, defaultMedication);
      });

    }
  };

  $scope.updateMonitor = function(type) {
    var value = $scope.patient.monitor.glucose;
    var data = {"type":type, 'value':value};
    PatientService.updateMonitor(patient.id, data).then(function() {
      $scope.patient.monitor.glucose = value;
    });
  };



}]);

'use strict';

var app = angular.module('liftApp');

app.filter('toHumanString', function () {
  return function (input) {
    var map = ['none', 'once', 'twice', 'thrice', 'four times', 'five times']
    var findDailySchedule = function () {
      var total = 0;
      angular.forEach(input, function (time) {
        total += time;
      });
      return map[total] + " daily";
    };

    if (angular.isArray(input)) {
      return findDailySchedule();
    } else {
      return "every " + input + " hours";
    }
  };
});

app.filter('prescriptionFor', function () {
  return function (prescriptions, timeOfDay) {
    var p = [];
    angular.forEach(prescriptions, function (prescription) {
      if (angular.isArray(prescription.schedule) && prescription.schedule[timeOfDay] == 1) {
        this.push(prescription);
      }
    }, p);
    return p;
    return prescriptions;
  }
});

app.filter('rangeFor', function() {
  return function(input, start, end) {
    var s = parseInt(start);
    var e = parseInt(end);
    for(var i=s; i<=e; i++) {
      input.push(i);
    }
    return input;
  }
});

'use strict';

angular.module('liftApp')
  .controller('PatientsCtrl', ['$scope', '$routeParams', '$filter','selectedPatient', function ($scope, $routeParams, $filter, selectedPatient) {
      $scope.patient = selectedPatient;
      $scope.day = "Yesterday";
      $scope.today = new Date();
      $scope.dateStr = $filter('date')($scope.today, "yyyyMMdd");
      $scope.feelingOptions = ['Bad', 'Good', 'Great', 'Uncomfortable', 'Tired', 'Sleepy', 'Nauseous', 'Other'];
      $scope.status = 'Good';
      $scope.statusOther = '';

      var buildAllPrescriptions = function() {
        var result = {};
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        var yString = $scope.dateStr = $filter('date')(yesterday, "yyyyMMdd");
        var tString = $scope.dateStr = $filter('date')(today, "yyyyMMdd");
        var p1 = buildPrescription(yString);
        result[yString] = p1;
        var p2 = buildPrescription(tString);
        result[tString] = p2;
        return result;
      };

      function createPrescription(date, prescription) {
        var p = {};
        p.date = date;
        p.taken = 'not-taken';
        p.type = prescription.type;
        p.name = prescription.name;
        p.id = prescription.id;
        if (prescription.type == 'data') {
          p.value = prescription.range.start;
          p.optionData = [];
          for (var i= p.value; i<prescription.range.end;i++) {
            p.optionData.push(i);
          }
        } else {
          p.optionData = [];
          p.optionData.push('Taken');
          p.optionData.push('Not Taken');
          p.optionData.push('Previously Taken at');
          p.value = 'Not Taken';
          p.time = new Date();
        }
        return p;
      }

      var buildPrescription = function(date) {
        var result = [];
        var morning = {name:'Morning', medications: []};
        var afternoon = {name:'Afternoon', medications: []};
        var evening = {name:'Evening', medications: []};
        var prescriptions = $scope.patient.prescriptions;
        angular.forEach(prescriptions, function(prescription){
          var schedule = prescription.schedule;
          if (angular.isArray(schedule)) {

            if (schedule[0] == 1) {
              var p = createPrescription(date, prescription);
              morning.medications.push(p);
            }
            if (schedule[1] == 1) {
              p = createPrescription(date, prescription);
              afternoon.medications.push(p);
            }

            if (schedule[2] == 1) {
              p = createPrescription(date, prescription);
              evening.medications.push(p);
            }

          }
        });

        result.push(morning);
        result.push(afternoon);
        result.push(evening);
        return result;
      };


      $scope.prescriptions = buildAllPrescriptions();


      $scope.selectedPrescriptions = $scope.prescriptions[$scope.dateStr];


      $scope.toggleDay = function() {
        var currentType = $scope.day;
        $scope.day = (currentType == 'Yesterday') ? 'Today' : 'Yesterday';
        var date = new Date();
        date.setDate(date.getDate()-1);
        $scope.today = (currentType == 'Yesterday') ? date : new Date();
        $scope.dateStr = $filter('date')($scope.today, "yyyyMMdd");
        $scope.selectedPrescriptions = $scope.prescriptions[$scope.dateStr];
      }

      $scope.updateMedicineInfo = function(medication, input) {
         medication.taken = input;
      }
  }]);

var app = angular.module('liftApp')

app.controller('ChartsCtrl', ['$scope', '$location', 'selectedPatient', function ($scope, $location, selectedPatient) {
  $scope.patient = selectedPatient;

  var randGlucose = function() {
    return 140 + Math.floor((Math.random() * 60));
  };

  var randTemp = function() {
    return 97.0 + (Math.random() * 4);
  };


  var getDate = function(daysBehind, time) {
    var date = new Date();
    date.setDate(date.getDate() - daysBehind);
    date.setHours(time);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  };

  var getData = function(day, time) {
    return {
      date: getDate(day, time),
      glucose: randGlucose(),
      temp: randTemp(),
      medicines: [
        {
           name: 'Aspirin 100mg',
           value: Math.floor(Math.random() * 2)
        },{
          name: 'Istamet',
          value: 1
        }, {
          name: 'Olmezest',
          value: Math.floor(Math.random() * 2)
        }
      ]
    }
  };
  var generateData = function(totalNumberOfDays) {
      var data = [];
      for (var i=totalNumberOfDays-1; i>=0; i--) {
        data.push(getData(i,9));
        data.push(getData(i,12));
        data.push(getData(i,18));
      }
    return data;
  };


  $scope.data = generateData(5);
}]);
