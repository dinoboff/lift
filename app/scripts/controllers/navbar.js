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

      $scope.activeUser = {};
      $http.get('/api/users').then(function (users) {
        $scope.users = users.data;
        $scope.activeUser = $scope.users[0];
      });


      $scope.chooseUser = function (user) {
        $scope.activeUser = user;
      };
    }]);
