'use strict';

var Holder = Holder || {};

var app = angular.module('liftApp');
app.directive('linechart', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element) {
      element.text('this is the linechart directive');
    }
  };
});

app.directive('holderFix', function () {
  return {
    link: function (scope, element) {
      Holder.run({images: element[0], nocss: true});
    }
  };
});


app.directive('setFocus', function () {
  return {
    restrict: 'E',
    link: function (scope, element) {
      element[0].focus();
    }
  }
});


app.directive('laDataChart', function ($compile) {

  var makeId = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  return {
    restrict: 'E',
    scope: {
      data: '=',
      dtype: '@'
    },
    templateUrl: 'views/charts/line.html',
    link: function (scope, element, attrs) {
      var svgC = element.children().get(0);
      var classId = "la-" + makeId();
      $(svgC).addClass(classId);

      scope.graph = {width: 800, height: 350};
      scope.layout = {top: 40, right: 40, bottom: 40, left: 40};
      scope.totalWidth = scope.graph.width + scope.layout.left + scope.layout.right;
      scope.totalHeight = scope.graph.height + scope.layout.top + scope.layout.bottom;

      var x = d3.time.scale().rangeRound([0, scope.graph.width]);

      x.domain(d3.extent(scope.data, function (d) {
        return d.date;
      }));



      var maxGlucose = d3.max(scope.data, function (d) {
        var max = d3.max(d3.entries(d.glucose), function(d){
          return d.value;
        });
        return max;
      }) + 10;

      var minGlucose = d3.min(scope.data, function (d) {
        var min = d3.min(d3.entries(d.glucose), function(d){
          return d.value;
        });
        return min;

      });



      scope.meanGlucose = d3.mean(scope.data, function (d) {
        var mean = d3.mean(d3.entries(d.glucose), function(d){
          return d.value;
        });
        return mean;
      });

      var maxTemp = d3.max(scope.data, function (d) {
        var max = d3.max(d3.entries(d.temp), function(d){
          return d.value;
        });
        return max;
      }) + 10;

      var minTemp = d3.min(scope.data, function (d) {
        var min = d3.min(d3.entries(d.temp), function(d){
          return d.value;
        });
        return min;

      });

      scope.meanTemp = d3.mean(scope.data, function (d) {
        var mean = d3.mean(d3.entries(d.glucose), function(d){
          return d.value;
        });
        return mean;
      });

      var y1 = d3.scale.linear().domain([minGlucose, maxGlucose]).range([scope.graph.height / 2, 0]);
      var y2 = d3.scale.linear().domain([minTemp, maxTemp]).range([scope.graph.height / 2, 0]);

      var leftLines = [];
      for(var i=0;i<2;i++) {
        var line1 = d3.svg.line().x(function (d) {
          return x(d.date)
        }).y(function (d) {
          return y1(d.glucose[i])
        }).interpolate('linear');
        leftLines.push(line1);
      }

      var rightLines = [];
      for(i=0;i<1;i++) {
        var line2 = d3.svg.line().x(function (d) {
          return x(d.date)
        }).y(function (d) {
          return y2(d.temp[i])
        }).interpolate('linear');
        rightLines.push(line2);
      }


      scope.glucoseMean = y1(scope.meanGlucose);
      scope.tempMean = y2(scope.meanTemp);

      var yAxis1 = d3.svg.axis()
        .scale(y1)
        .orient("left")
        .ticks(6);

      var yAxis2 = d3.svg.axis()
        .scale(y2)
        .orient("right")
        .ticks(10);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickPadding(8)
        .tickSize(0)
        .ticks(d3.time.hours, 6);

      //This needs to be put into the template later.
      var svg = d3.select("." + classId + " svg g");
      svg.append("g").attr("class", "x axis ").attr('transform', 'translate(0,' + scope.graph.height / 2 + ')').call(xAxis);
      svg.append("g").attr("class", "y axis glucose").call(yAxis1);
      svg.append("g").attr("class", "y axis temp").attr('transform', 'translate(' + scope.graph.width + ',0)').call(yAxis2);

      scope.leftLinesPath = [];
      scope.rightLinesPath = [];
      for(i=0;i<2;i++) {
        var p =leftLines[i](scope.data)
        scope.leftLinesPath.push(p);
        console.log(p);
      }

      for(i=0;i<1;i++) {
        scope.rightLinesPath.push(rightLines[i](scope.data));
      }

      scope.glCircles = [];
      scope.tempCircles = [];
      scope.medData = [];
      var medicineCircles = {};
      //yuck
      angular.forEach(scope.data, function (d) {
        var len = d.glucose.length;

        for(var i=0;i<len;i++) {
          var circle = {cx: x(d.date), cy: y1(d.glucose[i])};
          scope.glCircles.push(circle);
        }

        len = d.temp.length;
        for(i=0;i<len;i++) {
          var circle = {cx: x(d.date), cy: y2(d.temp[i])};
          scope.tempCircles.push(circle);
        }
        angular.forEach(d.medicines, function (medicine, index) {
          var s = medicineCircles[medicine.name];
          if (!s) {
            s = {};
            s.name = medicine.name;
            s.dosage = medicine.dosage;
            s.data = [];
            medicineCircles[medicine.name] = s;
          }
          var className = medicine.value == 1 ? "taken" : "not-taken";
          s.data.push({className: className, cx: x(d.date)});
        });
      });

      scope.medData = medicineCircles;
    }
  }

  });
