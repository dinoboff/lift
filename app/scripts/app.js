'use strict';

var app = angular.module('liftApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngProgress'
])
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
      .otherwise({
        redirectTo: '/'
      });

  $locationProvider.html5Mode(true);
}]);

app.run(['$rootScope','ngProgress',function($rootScope, ngProgress){
  $rootScope.$on("$routeChangeStart", function() {
    ngProgress.color("indigo");
    ngProgress.start();

  });
  $rootScope.$on("$routeChangeSuccess", function() {
    ngProgress.complete();
  });

}]);