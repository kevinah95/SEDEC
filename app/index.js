var express = require('express')

module.exports = function(pool) {
    'use strict';
    var router = express.Router();
    router.use('/api/users', require('./api.users')(pool))
    router.use('/api/testing', require('./testing')(pool))
    router.use('/api/results', require('./api.results')(pool))
    router.use('/api/analysis', require('./api.analysis')(pool))
    router.use('/api/processes', require('./api.processes')(pool))
    router.use('/api', require('./api.auth')(pool))
    return router;
};