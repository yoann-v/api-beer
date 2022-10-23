const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const router = express.Router();

const beersCtrl = require('../controllers/beersControllers');

// Read all beer

router.get('/', auth, beersCtrl.getAllBeer);

// Read ID beer

router.get('/:id', auth, beersCtrl.getOneBeer);

// Create

router.post('/', auth, multer, beersCtrl.createBeer);

// Update

router.put('/:id', auth, multer, beersCtrl.updateBeer);

// Delete

router.delete('/:id', auth, beersCtrl.deleteBeer);

module.exports = router;