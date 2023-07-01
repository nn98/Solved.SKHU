const express = require('express');
const router = express.Router();

/* --------------- Ranking Part --------------- */
router.get('/', (req, res) => {
    const connection = req.mysql;
    const sql = 'select * from user order by skhurank';
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});
/* --------------- Ranking Part --------------- */

module.exports = router;
