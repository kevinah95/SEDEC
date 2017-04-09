var express = require('express');
var app = express();
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var moment = require('moment');
var cors = require('cors');


app.use(express.static('public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(methodOverride());

app.use(cors());

var dbconfig = require('./config/database');
var jwtconfig = require('./config/jwt');

var pool = mysql.createPool(dbconfig.connection);

// routes ======================================================================
app.use(require('./app')(pool));


// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
var server = app.listen(8080, function() {
    //var host = server.address().address
    var port = server.address().port;
    console.log("Example app listening at http://localhost:%s", port)

});