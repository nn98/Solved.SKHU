const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/ratingController');

router.post('/', RatingController.getRating);

module.exports = router;
