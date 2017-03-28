var express = require('express')

var Busboy = require('busboy'), //
    inspect = require('util').inspect;

var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

module.exports = function(pool) {
    'use strict';

    var router = express.Router();


    function bufferToBase64(buf) { //Buffer to base64
        var binstr = Array.prototype.map.call(buf, function(ch) {
            return String.fromCharCode(ch);
        }).join('');
        return binstr;
    }
    router.post('/auth/login', global.isAuthenticated, function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL check_user(?,?)', [req.body.email, req.body.password], function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                if (!rows[0].length) {
                    res.status(500).send({ message: 'Something was wrong!' });
                } else {
                    res.send(rows[0][0]);
                }
                connection.release();
            });
        });
    });

    return router;
};