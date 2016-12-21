var express = require('express');
var path = require('path');
var colors = require('../routers/colors');

var port = process.env.PORT || 3000;

var app = express();

app.use('/colors', colors);

// Base URL
app.get('/', function(req, res) {
    res.sendFile(path.resolve('views/index.html'));
});

app.listen(port, function() {
    console.log('server listening on', port);
});

// Expose public folder
app.use(express.static('public'));
