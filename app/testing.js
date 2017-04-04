var express = require('express')

var Busboy = require('busboy'), //
    inspect = require('util').inspect;

var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
});

var prettyjson = require('prettyjson');

module.exports = function(pool) {
    'use strict';

    // I would move this down nearer to where it's used
    function processRow(row, callback) { // <=== accept the callback
        //console.log(row);
        callback(); // <=== call the callback
    }

    var router = express.Router();

    router.post('/test01', function(req, res, next) {

        pool.getConnection(function(err, connection) {
            var query = connection.query({
                sql: 'Select * from user;',
                values: [req.body.mailp, req.body.passp]
            });
            var rows = [];
            query
                .on('error', function(error) {
                    // Handle error, an 'end' event will be emitted after this as well
                    res.status(500).send({ error: error.message });
                    return next(error);
                })
                .on('fields', function(fields) {
                    // the field packets for the rows to follow
                    //console.log(fields);
                })
                .on('result', function(row) {
                    connection.pause();
                    processRow(row, function() {
                        connection.resume();
                    });
                    rows.push(row);
                })
                .on('end', function() {
                    // all rows have been received
                    res.send(rows);
                    connection.release();
                });
        });
    });
    router.post('/test02', function(req, res, next) {

        pool.getConnection(function(err, connection) {
            req.body.mailp = "kevinah95@gmail.com"
            req.body.passp = "123"
            var query = connection.query({
                sql: 'CALL check_user(?,?);',
                values: [req.body.mailp, req.body.passp]
            });
            var fields = [];
            var rows = [];
            query
                .on('error', function(error) {
                    // Handle error, an 'end' event will be emitted after this as well
                    res.status(500).send({ error: error.message });
                    return next(error);
                })
                .on('fields', function(_fields) {
                    // the field packets for the rows to follow
                    //console.log(fields);

                    fields = _fields
                })
                .on('result', function(row) {
                    connection.pause();
                    processRow(row, function() {
                        //console.log(row.userProfilePicture.toString());
                        connection.resume();
                    });
                    rows.push(row);
                })
                .on('end', function() {
                    // all rows have been received
                    res.json(rows[0]);
                    connection.release();
                });
        });
    });
    router.post('/test03', function(req, res, next) {

        pool.getConnection(function(err, connection) {
            var query = connection.query({
                sql: 'CALL dummy(?);',
                values: [req.body.id]
            });
            var fields = [];
            var rows = [];
            query
                .on('error', function(error) {
                    // Handle error, an 'end' event will be emitted after this as well
                    console.log(error);
                    res.status(500).send({
                        error: {
                            error,
                            message: error.message
                        }
                    });
                    return next(error);
                })
                .on('fields', function(_fields) {
                    // the field packets for the rows to follow
                    //console.log(fields);

                    fields = _fields
                })
                .on('result', function(row) {
                    connection.pause();
                    processRow(row, function() {
                        //console.log(row.userProfilePicture.toString());
                        connection.resume();
                    });
                    rows.push(row);
                })
                .on('end', function() {
                    // all rows have been received
                    res.json(rows[0]);
                    connection.release();
                });
        });
    });

    return router;
};