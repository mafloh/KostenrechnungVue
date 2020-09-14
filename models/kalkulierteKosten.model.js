const mongoose = require('mongoose')

const kalkulierteKostenSchema = new mongoose.Schema({
    nameKosten: {
        type: String
    },    
    terraWeb: {
        type: Number
    },
    terraIndividual: {
        type: Number
    },
    terraSchüler: {
        type: Number
    },
    sonstige: {
        type: Number
    }
})

module.exports = mongoose.model('kalkulierteKosten', kalkulierteKostenSchema)

