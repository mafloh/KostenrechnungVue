const Model = require("../models/calculateResults.model.js")
const commonController = require('./common.controller.js')

exports.findNewest = async (req, res) => {
    const jahrReq = req.query.jahr
    const jahr = jahrReq ? {jahr: jahrReq} : {}
    const kostenLeistungReq = req.query.kostenLeistung
    const kostenLeistung = kostenLeistungReq ? {kostenLeistung: req.query.kostenLeistung} : {}
    const condition = {...jahr, ...kostenLeistung}
    await commonController.findNewest(Model, condition, res)
}

exports.create = async (req, res) => {
    const keyValueObject = req.body 
    await commonController.create(Model, keyValueObject, res)
}