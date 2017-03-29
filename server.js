var express = require('express');
var app = express();
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var moment = require('moment');


app.use(express.static('public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(methodOverride());

var dbconfig = require('./config/database');
var jwtconfig = require('./config/jwt');

var pool = mysql.createPool(dbconfig.connection);
//=====================auth=============================
function createToken(user) { //TODO add to signup
    var payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: user.userId
    };

    return jwt.encode(payload, jwtconfig.tokenSecret);
}

//Global var, call with: global.isAuthenticated  
//For more information see: http://stackoverflow.com/a/17123976
isAuthenticated = function(req, res, next) {
        if (!(req.headers && req.headers.authorization)) {
            return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
        }
        //console.log(createToken("kevin"));
        var header = req.headers.authorization.split(' ');
        var token = header[1];
        var payload = jwt.decode(token, jwtconfig.tokenSecret, true); //true for noVerify
        var now = moment().unix();
        if (now > payload.exp) {
            return res.status(401).send({ message: 'Token has expired.' });
        }

        pool.getConnection(function(err, connection) {
            connection.query('CALL findById(?)', [payload.sub], function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                if (!rows[0].length) {
                    res.status(500).send({ message: 'Something was wrong!' });
                } else {
                    req.user = rows[0][0];
                }
                connection.release();
            });
        });


        next();
    }
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