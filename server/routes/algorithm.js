// routes/algorithm.js
const express = require('express');
const router = express.Router();
const AlgorithmController = require('../controllers/algorithmController');

router.get('/max', AlgorithmController.getMax);
router.get('/min', AlgorithmController.getMin);
router.get('/best', AlgorithmController.getBest);
router.get('/worst', AlgorithmController.getWorst);

module.exports = router;
