'use strict';

angular.module('liftApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
      })
      .when('/medicine', {
        templateUrl: 'partials/medicine',
        controller: 'MedicineCtrl'
      })
      .when('/testResults', {
        templateUrl: 'partials/testResults.html',
        controller: 'TestResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  }]);