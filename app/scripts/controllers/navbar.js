'use strict';

angular.module('liftApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Overview',
      'link': '/'
    },{
      'title': 'Health Meters',
      'link': '/meters'
    },{
      'title': 'History',
      'link': '/history'
    },{
      'title': 'Medicine',
      'link': '/medicine'
    },{
      'title': 'Test Results',
      'link': '/testResults'
    }
    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.users = [
        'Eric',
        'James',
        'Another'
    ];

    $scope.activeUser = $scope.users[0];

    $scope.chooseUser = function(user) {
      $scope.activeUser = user;
    }
  });
