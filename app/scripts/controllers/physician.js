'use strict';

var app = angular.module('liftApp');
app.controller('PhysicianCtrl', function ($scope, $filter, $modal) {
  var defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() - 12);
  var defaultPatient = {
    gender: 'male',
    dateOfBirth: defaultDate
  };

  var resetPatient = function() {
    $scope.patient = {};
    angular.extend($scope.patient, defaultPatient);
  }

  resetPatient();

  $scope.patients = [
    {
      name: 'Patient 1',
      address: 'Address of the user',
      dateOfBirth: new Date(),
      gender: 'male',
      phoneNumber: '12345678901',
      emailAddress: 'patient1@somewhere.com'
    },
    {
      name: 'Patient 2',
      address: 'Address of the user',
      dateOfBirth: new Date(),
      gender: 'female',
      phoneNumber: '12345678901',
      emailAddress: 'patient1@somewhere.com'
    }
  ];

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
      $scope.patients.push(newPatient);
      resetPatient();
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
      resetPatient();
      $scope.canceled = true;
    })
  }
});

app.controller('AddPatientModalInstanceCtrl', ['$scope', '$modalInstance', '$filter', 'patient', function ($scope, $modalInstance, $filter, patient) {
  $scope.patient = patient;
  $scope.name = "Santosh"

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
