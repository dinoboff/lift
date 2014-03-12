'use strict';

angular.module('liftApp')
    .controller('HomeCtrl', function ($scope, $http) {
      $http.get('/api/meters').then(function (result) {
        $scope.meters = result.data;
      });
    });
