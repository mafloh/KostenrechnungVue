const mongoose = require('mongoose')

const calculateResultsSchema = new mongoose.Schema({
    jahr: {
        type: Number,
    },
    kostenLeistung: {
        type: String
    },
    terraWeb: {
        type: Number,
    },
    terraIndividual: {
        type: Number,
    },
    terraSchüler: {
        type: Number,
    },
    sonstige: {
        type: Number
    }
})

module.exports = mongoose.model('calculateResults', calculateResultsSchema)