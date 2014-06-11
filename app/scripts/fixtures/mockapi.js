

'use strict';


var app = angular.module('liftApp');




var createSupervisor = function() {
  return {
    id: 1,
    name: 'Dr. Supervisor One',
    email: 'sup@lift.com'
  }
};

var createPhysician = function(count, supervisor) {
  var physicians = [];
  for(var i=0;i<count;i++) {
    var p = {
      id: i+1,
      name: 'Physician ' + (i+1),
      supervisor_id: supervisor.id
    };
    physicians.push(p);
  }
  return physicians;
};

var firstName = ['Daniel','Lucas','Carter','Noah','William','Owen'];
var lastName = ['Braxton','Brushwood','Oliver','Kewley','Gustavson','Johnson','Jones','Miller','Wilson','Anderson','Taylor','Thomas','Parker','Collins'];

var glucose = ['Metformin Oral','Glimepride','Onglyza','Prandin','Fortamet','Istamet','Cycloset'];
var bloodPressure = ['Diovan','Benicar','Azor','Coreg','Avalide','Altace','Ziac','Tenex','Amalong'];

var generateBoolean = function() {
  var num = Math.floor(Math.random()*2);
  console.log(num);
  return num == 0;
};

var getName = function(source) {
  var index = Math.floor(Math.random() * source.length);
  return source[index];
};

var createPatient = function(id, physician) {
  var first = getName(firstName);
  var last = getName(lastName);
  var hasDiabetes = generateBoolean();
  var hasBP = generateBoolean();
  if (hasDiabetes == false) {
    hasBP = true;
  }
  var gender = generateBoolean() == true ? "male" : "female";
  return {
    id: id,
    physicianId: physician.id,
    firstName: first,
    lastName: last,
    name: first + ", " + last,
    address: 'Address of the patient ' + id,
    dateOfBirth: new Date(),
    gender: gender,
    phoneNumber: '1234567890',
    emailAddress: 'patient1@somewhere.com',
    monitor: {
      glucose: hasDiabetes,
      bloodPressure: hasBP
    },
    prescriptions:[]
  }
};


var supervisor = createSupervisor();
var physicians = createPhysician(3, supervisor);
var patients = [];
for(var i=0;i<15;i++) {
  var index = i % 3;
  var physician = physicians[index];
  var patient = createPatient(i+1,physician);
  patients.push(patient);
}

app.constant('Config', {
  useMocks: true,
  viewDir: 'views/',
  fakeDelay: 100
});

app.constant('SUPERVISOR', supervisor);
app.constant('PHYSICIAN', physicians);


app.constant('PATIENTS', {
  data: {
    patients: patients
  }
});

/*app.constant('PATIENTS', {
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
*/