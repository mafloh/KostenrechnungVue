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
        default: 0
        //required: true
    },
    prozentWeb: {
        type: Number,
        default: 0
    },
    prozentSchueler: {
        type: Number,
        default: 0
    },
    prozentIndividual: {
        type: Number,
        default: 0
    },
})


module.exports = mongoose.model('personal', personalSchema)