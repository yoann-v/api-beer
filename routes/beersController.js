const express = require('express');
const router = express.Router();

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
})

module.exports = router