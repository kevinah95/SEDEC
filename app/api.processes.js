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
    router.post('/getProcesses', function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL get_user_processes(?)', [req.body.Id], function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    return router;
};