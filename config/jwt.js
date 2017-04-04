var jwt = require('jwt-simple');
var moment = require('moment');
var bcrypt = require('bcryptjs');
var tokenSecret = process.env.tokenSecret || 'S3D3C';

var exports = module.exports = {};

exports.tokenSecret = tokenSecret;
exports.createToken = function(user) { //TODO add to signup
    var payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: user.userId
    };
    return jwt.encode(payload, tokenSecret);
}

exports.isAuthenticated = function(pool) {
    return function(req, res, next) {
        if (!(req.headers && req.headers.authorization)) {
            return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
        }
        //console.log(createToken("kevin"));
        var header = req.headers.authorization.split(' ');
        var token = header[1];
        var payload = jwt.decode(token, tokenSecret, true); //true for noVerify
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
                    /*const saltRounds = 10;
                    const myPlaintextPassword = '123';
                    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                        console.log(hash);
                    });*/
                    req.user = rows[0][0];
                }
                connection.release();
            });
        });


        next()
    }
}