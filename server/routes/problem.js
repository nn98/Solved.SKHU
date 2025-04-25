// routes/algorithm.js
const express = require('express');
const router = express.Router();
const ProblemController = require('../controllers/problemController');

router.get('/max', ProblemController.getMaxProblem);
router.get('/min', ProblemController.getMinProblem);
router.get('/best', ProblemController.getBestProblem);
router.get('/worst', ProblemController.getWorstProblem);
router.post('/random', ProblemController.getRandomProblem);

module.exports = router;
