const mongoose = require('mongoose')

const calculateResultsSchema = new mongoose.Schema({
    jahr: {
        type: Number,
    },
    KostenLeistung: {
        type: String
    },
    terraWeb: {
        type: Number,
    },
    terraIndividual: {
        type: Number,
    },
    terraSchueler: {
        type: Number,
    }
})


module.exports = mongoose.model('calculateResults', calculateResultsSchema)