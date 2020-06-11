const controller = require('../controllers/calculateExtraEinnahmen.controller.js')


//Create Calculate Item
router.post("/calculate/", controller.create)

//Retrieve newest Calculate Item
router.get("/calculate/", controller.findNewest)


module.exports = router