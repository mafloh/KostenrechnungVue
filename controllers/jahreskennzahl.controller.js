const Jahreskennzahl = require("../models/jahreskennzahl.model")


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
    try {
        const produkt_id = req.query.produkt_id; 
        const jahr = req.query.jahr;
        let condition = produkt_id || jahr ? {name: produkt_id, jahr: jahr} : {} //alternative mit regex: //let condition = name ? { name: { $regex: new ReqExp(name), $options: "i"} } : {};
        const jahreskennzahlen = await Jahreskennzahl.find(condition)
        .then (data => {
            res.send(data)
        })

    } catch {
        err => {
        res.status(500).send({
            message:
                err.message || "Ein Fehler ist beim abrufen der Jahreskennzahlen passiert."
        })
    }
    }
}