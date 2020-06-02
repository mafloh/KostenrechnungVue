const express = require('express')
const router = express.Router() 
const jahreskennzahl = require('../controllers/jahreskennzahl.controller.js')

//Create new item
router.post('/', jahreskennzahl.create)

//Retrieve all
router.get('/', jahreskennzahl.findAll)

module.exports = router