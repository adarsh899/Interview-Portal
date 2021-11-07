const express = require('express');
const router = express.Router();
//router.get('/', homecontroller.home);
// router.get('/user', usercontroller.user);
router.use('/user', require('./user'));
module.exports = router;