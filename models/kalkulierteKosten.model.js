const mongoose = require('mongoose')

const kalkulierteKostenSchema = new mongoose.Schema({
    nameKosten: {
        type: String
    },    
    terraWeb: {
        type: Number,
        default: 0
    },
    terraIndividual: {
        type: Number,
        default: 0
    },
    terraSchüler: {
        type: Number,
        default: 0
    },
    sonstige: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('kalkulierteKosten', kalkulierteKostenSchema)

