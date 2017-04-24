var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var user = require('./api.users');
var results = require('./api.results');
var processes = require('./api.processes');
var analysis = require('./api.analysis');

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/users/:id', user.getOne);
router.post('/api/v1/admin/users/', user.create);
router.put('/api/v1/admin/users/:id', user.update);
router.delete('/api/v1/admin/users/:id', user.delete);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/results', results.getAllByUserId);
router.get('/api/v1/processes', processes.getAllByUserId);
router.post('/api/v1/analysis', upload.single(), analysis.create);

module.exports = router;