'use strict';

angular.module('liftApp')
  .controller('MedicineCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/activeMedicines').success(function(activeMedicines) {
      $scope.activeMedicines = activeMedicines;
    });
  }]);
