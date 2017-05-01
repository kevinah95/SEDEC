var jwt = require('jwt-simple');
var moment = require('moment');
var mysql = require('mysql');
var pool = mysql.createPool(require('../config/database').connection);
var jwtconfig = require('../config/jwt');

module.exports = function(req, res, next) {
    /**
     * Validate Header
     */
    if (!(req.headers && req.headers.authorization)) {
        return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
    }

    /**
     * Validate token
     */
    var header = req.headers.authorization.split(' ');
    var token = header[1];
    var payload = jwt.decode(token, jwtconfig.tokenSecret, true); //true for noVerify
    var now = moment().unix();
    if (now > payload.exp) {
        return res.status(401).send({ message: 'Token has expired.' });
    }

    /**
     * Validate user
     */
    pool.getConnection(function(err, connection) {
        connection.query('CALL user_find_by_id(?)', [payload.sub], function(error, rows) {
            if (error) {
                res.status(500).send({ message: error.message });
                return next(error);
            };
            if (!rows[0].length) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid User"
                });
                return;
            } else {
                req.user = rows[0][0];
                next();
            }
            connection.release();
        });
    });
};