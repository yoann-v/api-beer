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
    const beerObject = JSON.parse(req.body.thing);
    delete beerObject._id;
    delete beerObject._userId;
    const beer = new BeersModel({
        ...beerObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    BeersModel.save()
        .then(() => res.status(201).json({ message: 'Produit enregistré'}))
        .catch(error => res.status(400).json({ error }));
};

// Update

exports.updateBeer = (req, res) => {
    const beerObject = req.file ? {
        ...JSON.parse(req.body.BeersModel),
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
    BeersModel.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Produit supprimé'}))
        .catch(error => res.status(400).json({ error }));
};