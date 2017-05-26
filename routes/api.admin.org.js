var mysql = require('mysql');

var pool = mysql.createPool(require('../config/database').connection);

var organization = {

    organizations: function (req, res, next) {
        pool.query('CALL get_all_organizations()', function (error, rows) {
            if (error) {
                res.status(500).send({ message: error.message });
                return next(error);
            };
            if (!rows[0].length) {
                res.status(204).send();
            } else {
                res.send(rows[0]);
            }
        });
    },

    allProcesses: function (req, res, next) {
        pool.query('CALL get_all_process()', function (error, rows) {
            if (error) {
                res.status(500).send({ message: error.message });
                return next(error);
            };
            if (!rows[0].length) {
                res.status(204).send();
            } else {
                res.send(rows[0]);
            }
        });
    },

    processByOrganization: function (req, res, next) {
        pool.query('CALL get_processes_by_organization(?)', [req.body.id], function (error, rows) {
            if (error) {
                res.status(500).send({ message: error.message });
                return next(error);
            };
            if (!rows[0].length) {
                res.status(204).send();
            } else {
                res.send(rows[0]);
            }
        });
    },

    organizationUpdate: function (req, res, next) {
        pool.query('CALL organization_update(?,?,?,?,?)',
            [
                req.body.id,
                req.body.name,
                req.body.description,
                req.body.agent,
                req.body.agentMail
            ],
            function (error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.send(rows[0]);
            });
    },
    deleteOrganization: function (req, res, next) {
        pool.query('CALL disable_organization(?)',
            [
                req.body.id
            ],
            function (error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.send(rows[0]);
            });
    },
    createOrganization: function (req, res, next) {
        pool.query('CALL create_organization(?,?,?,?)',
            [
                req.body.name,
                req.body.description,
                req.body.agent,
                req.body.agentMail
            ],
            function (error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.send(rows[0]);
            });
    },
    createProcess: function (req, res, next) {
        pool.query('CALL create_process(?,?)',
            [
                req.body.name,
                req.body.description
            ],
            function (error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.send(rows[0]);
            });
    }
};

module.exports = organization;