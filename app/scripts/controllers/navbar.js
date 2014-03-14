'use strict';

angular.module('liftApp')
    .controller('NavbarCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
      $scope.menu = [
        {
          'title': 'Overview',
          'link': '/'
        },
        {
          'title': 'Medicine',
          'link': '/medicine'
        },
        {
          'title': 'Test Results',
          'link': '/testResults'
        }
      ];

      $scope.isActive = function (route) {
        return route === $location.path();
      };
      $scope.users = [
        {
          name: 'Melba Brewster',
          username: 'melba'
        },
        {
          name: 'Harriett Hodges',
          username: 'hhodges'
        },
        {
          name: 'Thomas Frost',
          username: 'tfrost'
        },
        {
          name: 'Diane Sparks',
          username: 'sparks231'
        }
      ];
      $scope.activeUser = $scope.users[0];

      $scope.chooseUser = function (user) {
        $scope.activeUser = user;
      };
    }]);
