var express = require('express');
var router = express.Router();
var user = require('./api.users.js');

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/users/:id', user.getOne);
router.post('/api/v1/admin/users/', user.create);
router.put('/api/v1/admin/users/:id', user.update);
router.delete('/api/v1/admin/users/:id', user.delete);

module.exports = router;