const express = require('express');
const router = express.Router();

router.post('/page', (req, res) => {
  console.log(req);
  const b = req.body;
  res.send(b);
});

/* +++++ UserCheck +++++ */
app.post('/check', (req, res) => {
  console.log('userCheck/get', '- called');
  let sql = 'select ID from user;';
  connection.query(sql, function (err, result, fields) {
    if (err) {
      console.log('error in RandomProblem/get', err);
      throw err;
    }
    console.log('userCheck/get', '- callback');
    res.json(result);
  });
});

module.exports = router;
