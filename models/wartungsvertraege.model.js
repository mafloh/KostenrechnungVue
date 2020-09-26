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
        type: Number
    },
    einmaligeZahlung: {
        type: Number
    },
    jahreswartung: {
        type: Number
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
        type: Number
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