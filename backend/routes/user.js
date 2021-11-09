const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user_controller');
const interviewcontroller = require('../controllers/interview_controller');
router.post('/create', usercontroller.create);
router.post('/schedule', interviewcontroller.schedule);
router.get('/getUser', usercontroller.getUsers);
router.get('/getSchedule', interviewcontroller.getSchedule);
router.put('/updateSchedule/:id', interviewcontroller.update);
router.delete('/deleteSchedule/:id',interviewcontroller.delete),

module.exports = router;