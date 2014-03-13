'use strict';

angular.module('liftApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
      })
      .when('/medicine', {
        templateUrl: 'partials/medicine',
        controller: 'MedicineCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });