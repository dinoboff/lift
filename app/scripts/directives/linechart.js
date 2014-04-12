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

app.directive('holderFix', function() {
  return {
    link: function(scope, element) {
      Holder.run({images:element[0], nocss:true});
    }
  };
});


app.directive('setFocus', function() {
  return {
    restrict: 'E',
    link: function(scope, element) {
      element[0].focus();
    }
  }
});


app.directive('laDataChart', function() {
  return {
    restrict: 'E',
    scope: {
      data : '='
    },
    templateUrl: 'views/charts/line.html',
    link: function(scope, element, attrs) {
      scope.graph = {width: 800, height: 350};
      scope.layout = {top: 40, right: 40, bottom: 40, left: 40};
      scope.totalWidth = scope.graph.width +  scope.layout.left + scope.layout.right;
      scope.totalHeight = scope.graph.height + scope.layout.top + scope.layout.bottom;

      var x = d3.time.scale().rangeRound([0, scope.graph.width]);
      x.domain(d3.extent(scope.data, function(d) { return d.date; }));

      var maxGlucose = d3.max(scope.data, function(d) {return d.glucose}) + 10;
      var minGlucose = d3.min(scope.data, function(d) {return d.glucose});
      scope.meanGlucose = d3.mean(scope.data, function(d) { return d.glucose});

      var maxTemp = d3.max(scope.data, function(d) {return d.temp}) + 10;
      var minTemp = d3.min(scope.data, function(d) {return d.temp});
      scope.meanTemp = d3.mean(scope.data, function(d) { return d.temp});

      var y1 = d3.scale.linear().domain([minGlucose, maxGlucose]).range([scope.graph.height/2, 0]);
      var y2 = d3.scale.linear().domain([minTemp, maxTemp]).range([scope.graph.height/2, 0]);

      var line1 = d3.svg.line().x(function(d, i) {return x(d.date) }).y(function(d,i) { return y1(d.glucose)}).interpolate('linear');
      var line2 = d3.svg.line().x(function(d, i) {return x(d.date) }).y(function(d,i) { return y2(d.temp)}).interpolate('linear').interpolate('linear');



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
      var svg = d3.select("svg .chart-container");
      svg.append("g").attr("class", "x axis ").attr('transform', 'translate(0,'+scope.graph.height/2+')').call(xAxis);
      svg.append("g").attr("class", "y axis glucose").call(yAxis1);
      svg.append("g").attr("class", "y axis temp").attr('transform', 'translate('+ scope.graph.width +',0)').call(yAxis2);

      scope.line1Path = line1(scope.data);
      scope.line2Path = line2(scope.data);

      scope.glCircles = [];
      scope.tempCircles = [];
      scope.medData = [];
      var medicineCircles = {};
      //yuck
      angular.forEach(scope.data, function(d) {
        var circle1 = {cx: x(d.date), cy: y1(d.glucose)};
        var circle2 = {cx: x(d.date), cy: y2(d.temp)};
        angular.forEach(d.medicines, function(medicine, index) {
          var s = medicineCircles[medicine.name];
          if (!s) {
            s = {};
            s.name = medicine.name;
            s.data = [];
            medicineCircles[medicine.name] = s;
          }
          var className = medicine.value == 1 ? "taken" : "not-taken";
          s.data.push({className:className, cx:x(d.date)});
        });
        scope.glCircles.push(circle1);
        scope.tempCircles.push(circle2);
      });

      scope.medData = medicineCircles;
    }
  }
});