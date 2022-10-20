const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userControllers');


// User email

router.post('/signup', userCtrl.signup);

// User Password

router.post('/login', userCtrl.login);


module.exports = router;