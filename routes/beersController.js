const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const { BeersModel } = require('../models/beersModel');

router.get('/', (req, res) => {
    BeersModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Erreur de la requête: " + err);
        };
    })
});

router.post('/', (req, res) => {
    const newProductBeer = new BeersModel({
        name: req.body.name,
        typeBeer: req.body.typeBeer
    });

    newProductBeer.save((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Erreur de création : ' + err);
        }
    })
});

// update

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Erreur ID : ' + req.params.id)
    }

    const updateBeer = {
        name: req.body.name,
        type: req.body.type
    };

    BeersModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateBeer },
        { new: true },
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log("Erreur update : " + err);
            }
        }
    );
});

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Erreur ID : ' + req.params.id)
        };
    


    BeersModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log("Erreur de suppression : " + err);
            }
        }
    )
});

module.exports = router;