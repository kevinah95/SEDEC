var express = require('express')

var Busboy = require('busboy'), //
inspect = require('util').inspect;

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.get('/getUsers', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query('CALL check_user("jmaq.cr@gmail.com","pathfinder")', function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });

    router.post('/getResults', function(req, res) {
        console.log(req.body);
        pool.getConnection(function(err, connection) {
            connection.query('CALL get_user_answers(?)',[req.body.Id], function(err, rows) {
                if (err) throw err;
                res.send(rows[0]);
                connection.release();
            });
        });
    });



    return router;
};
