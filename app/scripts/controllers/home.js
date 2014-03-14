'use strict';

angular.module('liftApp')
    .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.meters = [
        "127",
        "Abdominal Cramps",
        "Benadryl",
        "Calories",
        "Constipation",
        "Decreased Hearing",
        "Ear Ache",
        "Ear Echo Right"
      ];
    }]);
