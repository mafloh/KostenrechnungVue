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
        type: Boolean
    },
    info: {
        type: String
    },
    individualKaufAnwendung: {
        type: Boolean
    },
    individualStrassendatenbereich: {
        type: String
    },
    individualStrassendatenProMonat: {
        type: Number
    },
    schuelerASPKDO:{
        type: Boolean
    },
    schuelerEigenerServer: {
        type: Boolean
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