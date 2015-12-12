var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
var request = require('request');
var _ = require('underscore');
var http = require('http');

var config = require('../config');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/../public')));

// Returns page root
app.get('/',function(req, res) {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.use(function(err, req, res, next) {
  console.log('Error occured', err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

var server = http.createServer(app);

// Start server (default port 3000)
server.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
