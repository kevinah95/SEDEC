var express = require('express')

var Busboy = require('busboy'), //
    inspect = require('util').inspect;

var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

var jwt = require('../config/jwt');

module.exports = function(pool) {
    'use strict';

    var router = express.Router();

    router.post('/getResults', function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL results_find_by_user_id(?);', [req.body.userId], function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                if (!rows[0].length) {
                    console.log(rows);
                    res.status(500).send({ message: 'Something was wrong!' });
                } else {
                    res.send(rows[0]);
                }
                connection.release();
            });
        });
    });





    return router;
};