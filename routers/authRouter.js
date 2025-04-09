const express = require('express');
const authcontroller = require('../controller/authcontroller');

const router = express.Router();

router.post('/signup', authcontroller.signup)

module.exports = router;