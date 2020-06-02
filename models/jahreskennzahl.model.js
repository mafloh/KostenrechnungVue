const mongoose = require('mongoose')

const jahreskennzahlenSchema = new mongoose.Schema({
    produkt_id: {
        type: String,
        required: true
    },
    jahr: {
        type: Number,
        required: true
    },
    kosten: {
        personal: {
            type: Number
        },
        gemeinkosten: {
            type: Number
        },
        serverkosten: {
            type: Number
        },
        nebenkosten: {
            type: Number
        },
        vertrieb: {
            type: Number
        }

    },
    leistungen: {
        wartungsverträge: {
            type: Number
        },
        extraEinnahmen: {
            type: Number
        }
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('Jahreskennzahl', jahreskennzahlenSchema)