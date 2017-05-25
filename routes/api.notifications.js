var mysql = require('mysql');

var pool = mysql.createPool(require('../config/database').connection);

var notifications = {

    getAllByUser: function(req, res, next) {
        pool.query('CALL get_user_notifications(?)', [req.user.userId], function(error, rows) {
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
    update: function(req, res, next) {
        pool.query("UPDATE `sedec`.`notification` SET `viewed`=b'1' WHERE  `idNotification`=?", [req.params.id], function(error, rows) {
            if (error) {
                res.status(500).send({ message: error.message });
                return next(error);
            };
            if (rows.affectedRows > 0) {
                res.json({ message: 'Notification updated!' });
            } else {
                res.status(404).send({ message: "Notification Not found." });
            }
        });
    }
};

module.exports = notifications;