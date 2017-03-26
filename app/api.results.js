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

    router.post('/getResults', function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL get_user_answers(?);', [req.body.id], function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                if (!rows[0].length) {
                    res.status(500).send({ message: 'Something was wrong!' });
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


    function bufferToBase64(buf) { //Buffer to base64
        var binstr = Array.prototype.map.call(buf, function(ch) {
            return String.fromCharCode(ch);
        }).join('');
        return binstr;
    }





    return router;
};