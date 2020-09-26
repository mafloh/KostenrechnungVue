const mongoose = require('mongoose')

const personalSchema = new mongoose.Schema({
    name: {
        type: String
    },
    funktion: {
        type: String
    },
    abDatum: {
        type: Date,
        //required: true
    },
    bisDatum: {
        type: Date,
        //required: true
    },
    lohnGesamtProMonat: {
        type: Number,
        //required: true
    },
    prozentWeb: {
        type: Number
    },
    prozentSchueler: {
        type: Number
    },
    prozentIndividual: {
        type: Number
    },
})


module.exports = mongoose.model('personal', personalSchema)