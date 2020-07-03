const controller = require('../controllers/calculateResults.controller.js')
const express = require('express')
const router = express.Router() 

//Create Calculate Item
router.post('/', controller.create)

//Retrieve newest Calculate Item
router.get('/', controller.findNewest)


module.exports = router