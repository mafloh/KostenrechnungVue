const mongoose = require('mongoose')

const jahreskennzahlenSchema = new mongoose.Schema({
    jahr: {
        type: Number,
    },
    kostenLeistung: {
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


module.exports = mongoose.model('Jahreskennzahl', jahreskennzahlenSchema)