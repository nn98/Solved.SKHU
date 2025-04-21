const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/registerController');

// POST /register/professor
router.post('/professor', RegisterController.handleProRegister);

// POST /register/student
router.post('/student', RegisterController.handleStudentRegister);

// POST /register/user
router.post('/user', RegisterController.handleUserRegister);

module.exports = router;
