const mongoose = require('mongoose')

const produktSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('Produkt', produktSchema)