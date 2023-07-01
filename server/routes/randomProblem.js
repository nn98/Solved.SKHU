const express = require('express');
const router = express.Router();

/* +++++ Random +++++ */
router.post('/', (req, res) => {
    const connection = req.mysql;
    console.log('randomProblem/get', '- called');
    let sql = 'select * from problem where solved_rank between 1 and 17 order by rand() limit 1;';
    console.log('get randomProblem', sql);
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log('error in RandomProblem/get', err);
            throw err;
        }
        console.log('randomProblem/get', '- callback');
        res.json(result);
    });
});
/* +++++ Random +++++ */

module.exports = router;