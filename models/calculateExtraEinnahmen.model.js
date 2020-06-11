const mongoose = require('mongoose')

const extraEinnahmenSchema = new mongoose.Schema({
    jahr: {
        type: Number,
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


module.exports = mongoose.model('calculateExtraEinnahmen', calculateExtraEinnahmenSchema)