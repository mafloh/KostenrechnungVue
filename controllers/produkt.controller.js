const Produkt = require("../models/produkt.model")


//Create and Save new item

exports.create = async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Inhalt kann nicht leer sein."})
        return
    }

    const produkt = new Produkt ({
        name: req.body.name
    })
    try {
        const newProdukt = await produkt.save()
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
        const value = req.query.name; 
        let condition = value ? {name: value} : {} //alternative mit regex: //let condition = name ? { name: { $regex: new ReqExp(name), $options: "i"} } : {};
        const produkte = await Produkt.find(condition)
        .then (data => {
            res.send(data)
        })

    } catch {
        err => {
        res.status(500).send({
            message:
                err.message || "Ein Fehler ist beim abrufen der Produkte passiert."
        })
    }
    }
}



// Find a single Produkt with an id
exports.findOne = (req, res) => {

}