var express = require('express')

var Busboy = require('busboy'), //
    inspect = require('util').inspect;

var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

var jwt = require('../config/jwt');
var bcrypt = require('bcryptjs');

module.exports = function(pool) {
    'use strict';

    var router = express.Router();
    /*router.post('/auth/login', jwt.isAuthenticated(pool), function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL check_user(?,?)', [req.body.email, req.body.password], function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                if (!rows[0].length) {
                    res.status(500).send({ message: 'Something was wrong!' });
                } else {
                    var user = rows[0][0];
                    var token = jwt.createToken(user);
                    res.send({ token: token, user: user });
                    //res.send(rows[0][0]);
                }
                connection.release();
            });
        });
    });*/
    router.post('/auth/login', function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL find_one_user(?)', [req.body.email], function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                console.log(rows[0]);
                if (!rows[0].length) {
                    res.status(500).send({ message: { email: 'Correo Incorrecto' } });
                    return next();
                } else {
                    var user = rows[0][0];
                    bcrypt.compare(req.body.password, user.userPassword, function(err, isMatch) {
                        if (!isMatch) {
                            res.status(500).send({ message: { password: 'Contraseña Incorrecta' } });
                            return next();
                        }

                        //delete user.password;
                        var token = jwt.createToken(user);
                        res.send({ token: token, user: user });
                    });
                }
                connection.release();
            });
        });
    });

    router.post('/auth/signup', function(req, res, next) {
        //Step 13
        res.send({ token: 123, user: "burned" });
    });

    return router;
};
