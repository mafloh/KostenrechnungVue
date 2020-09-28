const mongoose = require('mongoose')

const wartungsvertraegeSchema = new mongoose.Schema({
    produkt: {
        type: String,
        required: true
    },
    kunde: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    fixOderGeplant: {
        type: String,
        required: true,
        default: 'fix'
    },
    proMonat: {
        type: Number,
        default: 0
    },
    einmaligeZahlung: {
        type: Number,
        default: 0
    },
    jahreswartung: {
        type: Number,
        default: 0
    },
    idLexware: {
        type: Number
    },
    ASP: {
        type: String
    },
    info: {
        type: String
    },
    individualKaufAnwendung: {
        type: String
    },
    individualStrassendatenbereich: {
        type: String
    },
    individualStrassendatenProMonat: {
        type: Number,
        default: 0
    },
    schuelerASPKDO:{
        type: String
    },
    schuelerEigenerServer: {
        type: String
    },
    schuelerStart4Punkt0: {
        type: Date
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('wartungsvertraege', wartungsvertraegeSchema)