'use strict';

angular.module('liftApp')
  .controller('TestresultsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/testResults').success(function(results) {
      $scope.testResults = results;
    });
  }]);
