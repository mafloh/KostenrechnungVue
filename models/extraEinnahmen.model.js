const mongoose = require('mongoose')

const extraEinnahmenSchema = new mongoose.Schema({
    kunde: {
        type: String
    },
    beschreibung: {
        type: String
    },
    idLexware: {
        type: Number
    },
    produkt: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    datumAbgeschlossen: {
        type: Date
    },
    preis: {
        type: Number,
        required: true
    },
    verantwortlich: {
        type: String
    },
})


module.exports = mongoose.model('extraEinnahmen', extraEinnahmenSchema)