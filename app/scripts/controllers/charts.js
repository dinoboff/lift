var app = angular.module('liftApp')

app.controller('ChartsCtrl', ['$scope', '$location', 'selectedPatient', function ($scope, $location, selectedPatient) {
  $scope.patient = selectedPatient;

  var randGlucose = function() {
    return 140 + Math.floor((Math.random() * 60));
  };

  var randTemp = function() {
    return 97.0 + (Math.random() * 4);
  };


  var getDate = function(daysBehind, time) {
    var date = new Date();
    date.setDate(date.getDate() - daysBehind);
    date.setHours(time);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  };

  var getData = function(day, time) {
    return {
      date: getDate(day, time),
      glucose: randGlucose(),
      temp: randTemp(),
      medicines: [
        {
           name: 'Aspirin 100mg',
           value: Math.floor(Math.random() * 2)
        },{
          name: 'Istamet',
          value: 1
        }, {
          name: 'Olmezest',
          value: Math.floor(Math.random() * 2)
        }
      ]
    }
  };
  var generateData = function(totalNumberOfDays) {
      var data = [];
      for (var i=totalNumberOfDays-1; i>=0; i--) {
        data.push(getData(i,9));
        data.push(getData(i,12));
        data.push(getData(i,18));
      }
    return data;
  };


  $scope.data = generateData(5);
}]);
