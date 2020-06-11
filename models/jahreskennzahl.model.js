const mongoose = require('mongoose')

const jahreskennzahlenSchema = new mongoose.Schema({
    produkt_id: {
        type: String,
        required: true
    },
    jahr: {
        type: Number,
        required: true,
        
    },
    kosten: {
        personal: {
            type: Number,
            default: 0,
            required: true
        },
        gemeinkosten: {
            type: Number,
            default: 0,
            required: true
        },
        serverkosten: {
            type: Number,
            default: 0,
            required: true
        },
        nebenkosten: {
            type: Number,
            default: 0,
            required: true
        },
        vertrieb: {
            type: Number,
            default: 0,
            required: true
        }

    },
    leistungen: {
        wartungsverträge: {
            type: Number,
            default: 0,
            required: true
        },
        extraEinnahmen: {
            type: Number,
            default: 0,
            required: true
        }
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('Jahreskennzahl', jahreskennzahlenSchema)