

var express = require('express');

var app = express();


app.get('/', function(req, resp) {
  resp.send('Hello');
});

app.get('/api/v1/hi', function(req, res) {
  res.send('Hell  o');
});

app.get('/api/v1/patients', function(req, res) {

});

app.get('/api/v1/patients/:id', function(req, res) {

});

var server = app.listen(3000, '0.0.0.0', function() {
  console.log("Server running on port 3000");
});