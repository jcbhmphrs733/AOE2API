/*----------
Required Modules
----------*/
const router = require("express").Router();
const baseController = require("../controllers/baseController");


/*----------
This route serves the home page of the application
----------*/

router.get("/", baseController.buildHome);


// These are the routes that lead to the other route files
router.use("/api-docs", require("./apiDocs"));
router.use("/civs", require("./civ"));
router.use("/tech", require("./tech"));
router.use("/units", require("./unit"));
router.use("/buildings", require("./building"));

/*----------
Exporting the router
----------*/

module.exports = router;