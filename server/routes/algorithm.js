// routes/algorithm.js
const express = require('express');
const router = express.Router();
const AlgorithmController = require('../controllers/algorithmController');

router.get('/max', AlgorithmController.getMaxAlgorithm);
router.get('/min', AlgorithmController.getMinAlgorithm);
router.get('/best', AlgorithmController.getBestAlgorithm);
router.get('/worst', AlgorithmController.getWorstAlgorithm);

module.exports = router;
