const controller = require('../controllers/extraEinnahmen.controller.js')


// ----------------------------- //
const express = require('express')
const router = express.Router() 

//Create new item
router.post('/', controller.create)

//Retrieve all
router.get('/', controller.findAll)

//update one
router.put("/:id", controller.update)

//delete one
router.delete("/:id", controller.delete)


module.exports = router