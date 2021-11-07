const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user_controller');
const interviewcontroller = require('../controllers/interview_controller');
router.post('/create', usercontroller.create);
router.post('/schedule', interviewcontroller.schedule);

module.exports = router;