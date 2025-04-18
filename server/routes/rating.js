// routes/rating.js
const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/ratingController');

// POST /QnA/rating
router.post('/', RatingController.rating);

module.exports = router;
