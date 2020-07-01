const controller = require('../controllers/calculateResults.controller.js')
const express = require('express')
const router = express.Router() 

//Create Calculate Item
router.post("/calculate/", controller.create)

//Retrieve newest Calculate Item
router.get("/calculate/", controller.findNewest)


module.exports = router