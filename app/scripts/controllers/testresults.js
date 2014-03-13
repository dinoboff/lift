'use strict';

angular.module('liftApp')
  .controller('TestResultsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/testResults').success(function(results) {
      $scope.testResults = results;
    });
  }]);
