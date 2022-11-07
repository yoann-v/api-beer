const { BeersModel } = require('../models/beersModel');
const fs = require('fs');

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

exports.createBeer = (req, res, next) => {
    const beerObject = JSON.parse(JSON.stringify(req.body));
    delete beerObject._id;
    delete beerObject._userId;
    const beer = new BeersModel({
        ...beerObject,
        userId: req.auth.userId,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    beer.save()
        .then(() => res.status(201).json({ message: 'Produit enregistré'}))
        .catch(error => res.status(400).json({ error }));
};

// Update

exports.updateBeer = (req, res) => {
    const beerObject = req.file ? {
        ...JSON.parse(JSON.stringify(req.body)),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete beerObject._userId;
    BeersModel.findOne({_id: req.params.id})
        .then((beer) => {
            if (beer.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé'});
            } else {
                BeersModel.updateOne({ _id: req.params.id}, { ...beerObject, _id: req.params.id})
                    .then(() => res.status(200).json({ message: 'Produit modifié'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

// Delete

exports.deleteBeer = (req, res) => {
    BeersModel.findOne({_id: req.params.id})
        .then(beer => {
            if(beer.userId != req.auth.userId) {
                res.status(401).json({message: 'Non-autorisé'})
            } else {
                const filename = beer.imageUrl.split('/image')[1];
                fs.unlink(`images/${filename}`, () => {
                    BeersModel.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Produit supprimé'})})
                        .catch(error => res.status(401).json({ error }))
                })
            }
        })
        .catch(error => res.status(500).json({ error }));
};