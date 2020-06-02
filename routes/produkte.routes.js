const express = require('express')
const router = express.Router() 
const produkte = require('../controllers/produkt.controller.js')

//Create new item
router.post('/', produkte.create)

//Retrieve all
router.get('/', produkte.findAll)

module.exports = router