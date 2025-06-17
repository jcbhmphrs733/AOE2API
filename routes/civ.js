// Modules
const router = require("express").Router();
const civController = require("../controllers/civController");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", civController.getAll);
router.get("/:id", civController.getSingle);
router.post("/", isAuthenticated, civController.postCiv);
router.put("/:id", isAuthenticated, civController.putCiv);
router.delete("/:id", isAuthenticated, civController.deleteCiv);

//Exporting the router
module.exports = router;
