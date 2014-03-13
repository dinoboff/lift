'use strict';

angular.module('liftApp')
  .controller('MedicineCtrl', function ($scope, $http) {
    $http.get('/api/activeMedicines').success(function(activeMedicines) {
      $scope.activeMedicines = activeMedicines;
    });
  });
