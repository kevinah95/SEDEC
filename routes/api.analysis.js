var mysql = require('mysql');

var pool = mysql.createPool(require('../config/database').connection);

var analysis = {

    create: function(req, res, next) {
        console.log(req.body);
        pool.query({
                sql: 'CALL create_analysis(?,?,?,?)'
            }, [
                req.user.userId,
                req.body.processId,
                req.body.description,
                req.body.image
            ],
            function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.json({ message: 'Analysis created!' });
            });
    }
};

module.exports = analysis;
/*var express = require('express')

var Busboy = require('busboy'), //
    inspect = require('util').inspect;

var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

module.exports = function(pool) {
    'use strict';

    var router = express.Router();
    router.post('/uploadAnalysis', upload.single(), function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL create_analysis(?,?,?,?);', [req.body.userId, req.body.processId, req.body.description, req.body.image], function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                console.log(rows.affectedRows)
                if (rows.affectedRows == 0) {
                    res.send(JSON.stringify({ "result": "invalid" }));
                } else {
                    res.send(JSON.stringify({ "result": "valid" }));
                }
                connection.release();
            });
        });
    });


    return router;
};*/