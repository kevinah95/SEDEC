var express = require('express')

var Busboy = require('busboy'), //
    inspect = require('util').inspect;

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.get('/getUsers', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL check_user("kevinah95@gmail.com","123")', function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    router.post('/getResults', function(req, res) {
        console.log(req.body);
        pool.getConnection(function(err, connection) {
            connection.query('CALL get_user_answers(?)', [req.body.id], function(err, rows) {
                if (err) throw err;
                if (!rows[0].length) {
                    res.send("invalid");
                } else {
                    /*var base64 = bufferToBase64(new Buffer(rows[0][0].samplePicture));
                    rows[0][0].samplePicture = base64;*/
                    /*var bufferBase64 = new Buffer(rows[0][0].samplePicture, 'binary').toString('base64');
                    console.log(bufferBase64)
                    rows[0][0].samplePicture = bufferBase64;*/
                    /*require("fs").writeFile("out.png", bufferBase64, 'base64', function(err) {
                        console.log(err);
                    });*/
                    //res.setHeader('Content-Type', 'application/json')
                    //res.contentType('application/json');
                    //console.log(rows[0][0].samplePicture);
                    rows[0].forEach(function(element, index) {
                        var bufferBase64 = "data:image/gif;base64," + new Buffer(rows[0][index].samplePicture, 'binary').toString('base64');
                        rows[0][index].samplePicture = bufferBase64;
                    }, this);
                    res.send(rows[0]);
                }
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
                    console.log("valid");
                    res.send(rows[0][0]);
                }
                connection.release();
            });
        });
    });

    function bufferToBase64(buf) { //Buffer to base64
        var binstr = Array.prototype.map.call(buf, function(ch) {
            return String.fromCharCode(ch);
        }).join('');
        return binstr;
    }
    return router;
};