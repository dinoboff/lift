'use strict';

var app = angular.module('liftApp');

app.controller('ClinicianCtrl', ['$scope', function ($scope) {
  $scope.patientInfo = [
    {
      type: 'chronic',
      number: 80,
      percentage: 40,
      icon: 'fa-ambulance'
    },
    {
      type: 'nominal',
      number: 80,
      percentage: 40,
      icon: 'fa-medkit'
    },
    {
      type: 'acute',
      number: 20,
      percentage: 10,
      icon: 'fa-wheelchair'
    },
    {
      type: 'new',
      number: 20,
      percentage: 10,
      icon: 'fa-plus-square'
    }
  ];

  $scope.transactionHistory = [
    {
      date: 'Dec 5, 2012 5:00 PM',
      text: '[patient Eric] Increased dosage of Amlodopine from 2.5mg to 5mg daily'
    },
    {
      date: 'Nov 16, 2012 9:00 AM',
      text: '[patient Eric] ordered to take blood pressure every 4 hours'
    },
    {
      date: 'Nov 15, 2012 9:00 AM',
      text: '[patient Eric] regular clinical visit'
    },
    {
      date: 'Nov 5, 2012 5:00 PM',
      text: '[patient Eric] Prescribed Amlodopine 2.5mg daily'
    }

  ];


}]);
