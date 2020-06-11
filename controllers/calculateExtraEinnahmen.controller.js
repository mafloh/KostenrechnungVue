const calculateModel = require("../models/calculateExtraEinnahmen.model.js")
const commonController = require('./common.controller.js')

exports.findNewest = async (req, res) => {
    await commonController.findNewest(calculateModel, res)
}