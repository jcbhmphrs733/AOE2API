/*----------
Required Modules
----------*/
const router = require("express").Router();
const baseController = require("../controllers/baseController");


/*----------
This route serves the home page of the application
----------*/

router.get("/", baseController.buildHome);



/*----------
Exporting the router
----------*/

module.exports = router;