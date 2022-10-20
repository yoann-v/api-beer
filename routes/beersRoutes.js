const express = require('express');
const auth = require('auth');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const multer = require('../middleware/multer-config')

const beersCtrl = require('../controllers/beersControllers');

// Read

router.get('/', auth, beersCtrl.getAllBeer);

// 404

router.get('/:id', auth, beersCtrl.getOneBeer);

// Create

router.post('/', auth, multer, beersCtrl.createBeer);

// Update

router.put('/:id', auth, multer, beersCtrl.updateBeer);

// Delete

router.delete('/:id', auth, beersCtrl.deleteBeer);

module.exports = router;