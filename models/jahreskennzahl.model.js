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


module.exports = mongoose.model('Jahreskennzahl', jahreskennzahlenSchema)