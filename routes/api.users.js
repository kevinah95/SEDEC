var mysql = require('mysql');

var pool = mysql.createPool(require('../config/database').connection);

var users = {

    getAll: function(req, res, next) {
        pool.query('CALL get_all_users()', function(error, rows) {
            if (error) {
                res.status(500).send({ message: error.message });
                return next(error);
            };
            if (!rows[0].length) {
                res.status(500).send({ message: 'Something was wrong!' });
            } else {
                res.send(rows[0]);
            }
        });
    },

    getOne: function(req, res, next) {
        pool.query('CALL find_by_id(?)', [req.params.id], function(error, rows) {
            if (error) {
                res.status(500).send({ message: error.message });
                return next(error);
            };
            if (!rows[0].length) {
                res.status(204).send({ message: 'No Content' });
            } else {
                res.send(rows[0][0]);
            }
        });
    },

    create: function(req, res, next) {
        pool.query({
                sql: 'CALL create_user(?,?,?,?,?)'
            }, [
                req.body.email,
                req.body.password,
                req.body.name,
                req.body.profilePicture,
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

    update: function(req, res, next) {
        pool.query({
                sql: 'CALL update_user_profile(?,?,?,?,?)'
            }, [
                req.params.id,
                req.body.email,
                req.body.password,
                req.body.name,
                req.body.profilePicture
            ],
            function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                if (rows.affectedRows > 0) {
                    res.json({ message: 'User updated!' });
                } else {
                    res.status(404).send({ message: "User Not found." });
                }

            });
    },

    delete: function(req, res, next) {
        pool.query('CALL delete_user(?)', [req.params.id], function(error, rows) {
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
    }
};

module.exports = users;