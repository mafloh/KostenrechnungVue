const Model = require("../models/extraEinnahmen.model.js")
const commonController = require('./common.controller.js')



//Create and Save new item

exports.create = async (req, res) => {
    const keyValueObject = req.body 
    await commonController.create(Model, keyValueObject, res)
}


// Retrieve all from the database 
exports.findAll = async (req, res) => {
    await commonController.findAll(Model, res);
}

exports.update = async (req, res) => {
    const id = req.params.id
    const DataToUpdate = req.body
    await commonController.update(id, Model, DataToUpdate, res)
}

exports.delete = async (req, res) => { 
    const id = req.params.id
    await commonController.delete(id, Model, res)
}