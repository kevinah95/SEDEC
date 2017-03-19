var express = require('express')

var Busboy = require('busboy'), //
inspect = require('util').inspect;

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.get('/getUsers', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL dummy_select()', function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });
    return router;
};
