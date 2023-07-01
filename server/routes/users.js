const express = require('express');
const router = express.Router();

router.post('/page', (req, res) => {
  console.log(req);
  const b = req.body;
  res.send(b);
});

module.exports = router;
