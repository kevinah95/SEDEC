var express = require('express')

var Busboy = require('busboy'), //
    inspect = require('util').inspect;

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.get('/getUsers', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL check_user(1,1)', function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });
    router.post('/login', function(req, res) {
        //console.log(req.body);
        //jmaq.cr@gmail.com
        //pathfinder
        pool.getConnection(function(err, connection) {
            connection.query('CALL check_user(?,?)', [req.body.email, req.body.password], function(err, rows) {
                if (err) throw err;
                console.log(rows[0][0]);
                if (!rows[0].length) {
                    res.send(JSON.stringify({ "result": "invalid" }));
                } else {
                    /*var base64 = bufferToBase64(new Buffer(rows[0][0].photo));
                    rows[0][0].photo = base64;
                    res.send(rows[0][0]);*/
                    console.log("valid");
                    res.send(rows[0][0]);
                }
                connection.release();
            });
        });
    });
    return router;
};