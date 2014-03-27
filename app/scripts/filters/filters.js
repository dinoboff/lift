'use strict';

angular.module('liftApp')
    .filter('toHumanString', function () {
      return function (input) {
        var map = ['none', 'once','twice','thrice','four times','five times']
        var findDailySchedule = function() {
          var total = 0;
          angular.forEach(input, function(time) {
            total += time;
          });
          return map[total] + " daily";
        };

        if (input instanceof  Array) {
          return findDailySchedule();
        } else {
          return "every " + input + " hours";
        }
      };
    });
