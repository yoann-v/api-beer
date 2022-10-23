const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userControllers');


// Enregistrement

router.post('/signup', userCtrl.signup);

// Connexion

router.post('/login', userCtrl.login);


module.exports = router;