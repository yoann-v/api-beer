const express = require('express');
const auth = require('auth');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const beersCtrl = require('../controllers/beersControllers');

// Read

router.get('/', auth, beersCtrl.getAllBeer);

// 404

router.get('/:id', auth, beersCtrl.getOneBeer);

// Create

router.post('/', auth, beersCtrl.createBeer);

// Update

router.put('/:id', auth, beersCtrl.updateBeer);

// Delete

router.delete('/:id', auth, beersCtrl.deleteBeer);

module.exports = router;