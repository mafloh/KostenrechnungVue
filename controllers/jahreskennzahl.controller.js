const Jahreskennzahl = require("../models/jahreskennzahl.model")
const {findAll} = require('./common.controller.js')


//Create and Save new item

exports.create = async (req, res) => {
    if (!req.body.produkt_id || !req.body.jahr) {
        res.status(400).send({ message: "Inhalt kann nicht leer sein."})
        return
    }

    const jahreskennzahl = new Jahreskennzahl ({
        produkt_id: req.body.produkt_id,
        jahr: req.body.jahr
    })
    try {
        const newJahreskennzahl = await jahreskennzahl.save()
        .then (data => {
            res.send(data)
        })
    } catch {
        res.status(500).send({
            message: 
                err.message || "Ein Fehler ist passiert beim Anlegen des Eintrages."
        })
    }
}


// Retrieve all from the database 
exports.findAll = async (req, res) => {
    console.log('test');
    await findAll(Jahreskennzahl, req.query, res);
}