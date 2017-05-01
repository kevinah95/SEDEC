var mysql = require('mysql');

var pool = mysql.createPool(require('../config/database').connection);

var analysis = {

    create: function(req, res, next) {
        console.log(req.body);
        pool.query({
                sql: 'CALL create_analysis(?,?,?,?)'
            }, [
                req.user.userId,
                req.body.processId,
                req.body.description,
                req.body.image
            ],
            function(error, rows) {
                if (error) {
                    res.status(500).send({ message: error.message });
                    return next(error);
                };
                res.json({ message: 'Analysis created!' });
            });
    }
};

module.exports = analysis;