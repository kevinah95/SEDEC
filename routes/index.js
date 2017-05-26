var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var auth = require('./api.auth');
var adminUsers = require('./api.admin.users');
var results = require('./api.results');
var processes = require('./api.processes');
var analysis = require('./api.analysis');
var adminOrg = require('./api.admin.org');

/*
 * Routes that doesn't need authorization
 */
router.get('/api/auth/login', auth.login);
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', adminUsers.getAll);
router.get('/api/v1/admin/users/:id', adminUsers.getOne);
router.post('/api/v1/admin/users/', upload.single(), adminUsers.create);
router.put('/api/v1/admin/users/:id', upload.single(), adminUsers.update);
router.delete('/api/v1/admin/users/:id', adminUsers.delete);

/**
 * Admin.Organizations
 */
router.get('/api/v1/admin/org/organizations', adminOrg.organizations);
router.post('/api/v1/admin/org/processByOrganization', adminOrg.processByOrganization);
router.get('/api/v1/admin/org/allProcesses', adminOrg.allProcesses);
router.put('/api/v1/admin/org/organizationUpdate', adminOrg.organizationUpdate);
router.put('/api/v1/admin/org/deleteOrganization', adminOrg.deleteOrganization);
router.put('/api/v1/admin/org/createOrganization', adminOrg.createOrganization);
router.put('/api/v1/admin/org/createProcess', adminOrg.createProcess);

/*
 * Routes that can be accessed only by autheticated users
 */
/**
 * Results
 */
router.get('/api/v1/results', results.getAllByUserId);
/**
 * Processes
 */
router.get('/api/v1/processes', processes.getAllByUserId);
/**
 * Analysis
 */
router.post('/api/v1/analysis', upload.single(), analysis.create);

module.exports = router;