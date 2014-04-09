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
      });

    }
  }

}]);
