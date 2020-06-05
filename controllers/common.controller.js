exports.findAll = async (Model, params, res) => {
        try {
            const produkt_id = params.produkt_id; 
            const jahr = params.jahr;
            let condition = produkt_id || jahr ? {name: produkt_id, jahr: jahr} : {} //alternative mit regex: //let condition = name ? { name: { $regex: new ReqExp(name), $options: "i"} } : {};
            const data = await Model.find(condition)
            res.send(data)
        } catch {
            err => {
            res.status(500).send({
                message:
                    err.message || "Ein Fehler ist beim abrufen der Jahreskennzahlen passiert."
            })
        }
        }
}

