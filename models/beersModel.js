const mongoose = require("mongoose");

const BeersModel = mongoose.model(
    "api-beer",
    {
        name: {
            type: String,
            required: true
        },
        typeBeer: {
            type: String,
            required: true
        },
        color: {
            type: String,
            //required: true
        },
        degree: {
            type: Number,
            //required: true
        },
        capacity: {
            type: Number,
            //required: true
        },
        country: {
            type: String,
            //required: true
        },
        appearance: {
            type: String,
            //required: true
        },
        aroma: {
            type: String,
            //required: true
        },
        tast: {
            type: String,
            //required: true
        },
        date: {
            type: Date,
            default: Date.now
        },

    },
    "beer"
);

module.exports = { BeersModel };