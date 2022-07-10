const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const { BeersModel } = require('../models/beersModel');

// Read

router.get('/', (req, res) => {
    BeersModel.find()
        .then(BeersModel => res.status(200).json(BeersModel))
        .catch(error => res.status(400).json({ error }));
});

// 404

router.get('/:id', (req, res) => {
    BeersModel.findOne({ _id: req.params.id })
        .then(BeersModel => res.status(200).json(BeersModel))
        .catch(error => res.status(404).json({ error }));
});

// Write

router.post('/', (req, res) => {
    delete req.body._id;
    const newProductBeer = new BeersModel({
        ...req.body
    });

    newProductBeer.save()
        .then(() => res.status(201).json({ message: 'Produit enregistré'}))
        .catch(error => res.status(400).json({ error }));
});

// Update

router.put('/:id', (req, res) => {
    BeersModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Produit modifié'}))
        .catch(error => res.status(400).json({ error }));
});

// Delete

router.delete('/:id', (req, res) => {
    BeersModel.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Produit supprimé'}))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;