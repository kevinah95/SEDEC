var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var jwt = require('../config/jwt');

var pool = mysql.createPool(require('../config/database').connection);

var auth = {

    login: function(req, res, next) {
        console.log("req.body", req.body);
        console.log("req.query", req.query);
        pool.query({
                sql: 'CALL find_one_user(?)'
            }, [
                req.query.email
            ],
            function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                if (!rows[0].length) {
                    res.status(500).send({ message: { email: 'Correo Incorrecto' } });
                    return next();
                } else {
                    var user = rows[0][0];
                    bcrypt.compare(req.query.password, user.userPassword, function(err, isMatch) {
                        if (!isMatch) {
                            res.status(500).send({ message: { password: 'Contraseña Incorrecta' } });
                            return next();
                        }

                        //delete user.password;
                        var token = jwt.createToken(user);
                        res.send({ token: token, user: user });
                    });
                }
            });
    }
};

module.exports = auth;

/**
 * For signup
 */
/*const saltRounds = 10;
                    const myPlaintextPassword = '123';
                    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                        console.log(hash);
                    });*/