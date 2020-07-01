const calculateModel = require("../models/calculateResults.model.js")
const commonController = require('./common.controller.js')

exports.findNewest = async (req, res) => {
    const jahr = req.query.jahr
    const produkt = req.query.produkt
    const kostenLeistung = req.query.kostenLeistung
    const condition = {jahr: jahr, produkt: produkt, kostenLeistung: kostenLeistung}
    await commonController.findNewest(calculateResultsModel, condition, res)
}

exports.create = async (req, res) => {
    const keyValueObject = req.body 
    await commonController.create(Model, keyValueObject, res)
}