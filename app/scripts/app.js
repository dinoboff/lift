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
      .when('/history', {
        templateUrl: 'partials/history',
        controller: 'HistoryCtrl'
      })
      .when('/meters', {
        templateUrl: 'partials/meters',
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