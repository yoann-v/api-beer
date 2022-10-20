const { BeersModel } = require('../models/beersModel');

// Get all beer

exports.getAllBeer = (req, res) => {
    BeersModel.find()
        .then(BeersModel => res.status(200).json(BeersModel))
        .catch(error => res.status(400).json({ error }));
};

// get one beer

exports.getOneBeer = (req, res) => {
    BeersModel.findOne({ _id: req.params.id })
        .then(BeersModel => res.status(200).json(BeersModel))
        .catch(error => res.status(404).json({ error }));
};

// Create

exports.createBeer = (req, res) => {
    delete req.body._id;
    const newProductBeer = new BeersModel({
        ...req.body
    });

    newProductBeer.save()
        .then(() => res.status(201).json({ message: 'Produit enregistré'}))
        .catch(error => res.status(400).json({ error }));
};

// Update

exports.updateBeer = (req, res) => {
    BeersModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Produit modifié'}))
        .catch(error => res.status(400).json({ error }));
};

// Delete

exports.deleteBeer = (req, res) => {
    BeersModel.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Produit supprimé'}))
        .catch(error => res.status(400).json({ error }));
};