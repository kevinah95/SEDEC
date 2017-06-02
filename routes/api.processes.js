var mysql = require('mysql');

var pool = mysql.createPool(require('../config/database').connection);

var processes = {

    getAllByUserId: function(req, res, next) {
        pool.query('CALL processes_find_by_user_id(?)', [req.params.id], function(error, rows) {
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

module.exports = processes;