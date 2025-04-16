const express = require('express');
const router = express.Router();

/* --------------- Recommend Algorithm Part --------------- */
router.get('/max', (req, res) => {
  const connection = req.mysql;
  const sql =
    'select solved_rank, id, namekr, rate, count(problem_id) as sum from solve join problem on solve.problem_id = problem.id group by problem_id having count(problem_id) order by count(problem_id) desc limit 0,10;';
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
router.get('/min', (req, res) => {
  const connection = req.mysql;
  const sql =
    'select solved_rank, id, namekr, rate, count(problem_id) as sum from solve join problem on solve.problem_id = problem.id group by problem_id having count(problem_id) order by count(problem_id) asc limit 0,10;';
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
router.get('/best', (req, res) => {
  const connection = req.mysql;
  const sql =
    "select id,namekr, rate, solved_rank from problem where id in (select problem_id from solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) desc limit 0,10; ";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
router.get('/worst', (req, res) => {
  const connection = req.mysql;
  const sql =
    "select id,namekr, rate, solved_rank from problem where id in (select problem_id from solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) limit 0,10; ";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
/* --------------- Recommend Algorithm Part --------------- */

module.exports = router;
