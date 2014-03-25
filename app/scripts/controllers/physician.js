'use strict';

var app = angular.module('liftApp');
app.controller('PhysicianCtrl', ['$scope','$modal', 'PatientService',function ($scope, $modal, PatientService) {

  $scope.patients = PatientService.getPatients();
  $scope.patient = PatientService.getDefaultPatient();

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
      var newPatient = {}
      angular.extend(newPatient, item);
      newPatient.name = newPatient.firstName + " " + newPatient.lastName;
      PatientService.addPatient(newPatient);
      $scope.patient = PatientService.getDefaultPatient();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
      $scope.patient = PatientService.getDefaultPatient();
      $scope.canceled = true;
    })
  }
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
