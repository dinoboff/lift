'use strict';

var app = angular.module('liftApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngProgress'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/medicine', {
      templateUrl: 'views/medicine.html',
      controller: 'MedicineCtrl'
    })
    .when('/testResults', {
      templateUrl: 'views/testResults.html',
      controller: 'TestResultsCtrl'
    })
    .when('/history', {
      templateUrl: 'views/history.html',
      controller: 'HistoryCtrl'
    })
    .when('/meters', {
      templateUrl: 'views/meters.html',
      controller: 'MetersCtrl'
    })
    .when('/clinician', {
      templateUrl: 'views/clinician.html',
      controller: 'ClinicianCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);
