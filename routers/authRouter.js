const express = require('express');
const authcontroller = require('../controller/authcontroller');

const router = express.Router();

router.post('/signup', authcontroller.signup);
router.post('/signin', authcontroller.signin);

module.exports = router;