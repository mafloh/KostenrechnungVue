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

//Find by Id
router.get("/ID/:id", controller.findById)

//Create Calculate Item
router.post("/calculate/", controller.create)

//Retrieve newest Calculate Item
router.get("/calculate/", controller.findNewest)


module.exports = router