'use strict';

angular.module('liftApp')
  .controller('PatientsCtrl', ['$scope', '$routeParams', 'selectedPatient', function ($scope, $routeParams, selectedPatient) {
      $scope.patient = selectedPatient;
      $scope.day = "Yesterday";
      $scope.today = new Date();

      $scope.toggleDay = function() {
        $scope.day = ($scope.day == 'Yesterday') ? 'Today' : 'Yesterday';
        var date = new Date();
        date.setDate(date.getDate()-1);
        $scope.today = ($scope.day == 'Yesterday') ? new Date(): date;
      }
  }]);
