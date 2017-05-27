var mysql = require('mysql');

var pool = mysql.createPool(require('../config/database').connection);

var adminusers = {

    getAllUsers: function(req, res, next) {
        pool.query('CALL get_all_users()', function(error, rows) {
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

    disableUser: function(req, res, next) {
        pool.query('CALL disable_user(?)', [req.body.userId], function(error, rows) {
            if (error) {
                res.status(500).send({ message: error.message });
                return next(error);
            };
            if (rows.affectedRows > 0) {
                res.json({ message: 'Successfully deleted' });
            } else {
                res.status(404).send({ message: "User Not found." });
            }
        });
    },

    createUser: function(req, res, next) {
        pool.query({
                sql: 'CALL create_user(?,?,?,?,?)'
            }, [
                req.body.userMail,
                req.body.userPassword,
                req.body.userName,
                req.body.userProfilePicture,
                req.body.organizationId
            ],
            function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.json({ message: 'User created!' });
            });
    },

    updateUser: function(req, res, next) {
        pool.query({
                sql: 'CALL admin_update_user(?,?,?,?,?)'
            }, [
                req.body.userMail,
                req.body.userName,
                req.body.isAdmin,
                req.body.organizationId,
                req.body.userId
            ],
            function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                if (rows.affectedRows > 0) {
                    res.json({ message: 'Successfully updated' });
                } else {
                    res.status(404).send({ message: "User Not found." });
                }
            });
    },

    removeUserProcesses: function(req, res, next) {
        pool.query({
                sql: 'CALL remove_user_processes(?)'
            }, [
                req.body.userId
            ],
            function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.json({ message: 'Processes deleted!' });
            });
    },

    updateProcessAssociation: function(req, res, next) {
        pool.query({
                sql: 'CALL user_process_association(?,?)'
            }, [
                req.body.userId,
                req.body.processId
            ],
            function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.json({ message: 'User associated with process!' });
            });
    },

    getOrganizations: function(req, res, next) {
        pool.query('CALL get_all_organization_names()', function(error, rows) {
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


    getOrganizationProcesses: function(req, res, next) {
        console.log(req.body);
        pool.query('CALL get_processes_by_organization(?)', [req.body.organizationId], function(error, rows) {
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
    }




};

module.exports = adminusers;