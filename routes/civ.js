// Modules
const router = require("express").Router();
const civController = require("../controllers/civController");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", isAuthenticated, civController.getAll);
router.get("/:id", isAuthenticated, civController.getSingle);
router.post("/", isAuthenticated, civController.postCiv);
router.put("/:id", isAuthenticated, civController.putCiv);
router.delete("/:id", isAuthenticated, civController.deleteCiv);

module.exports = router;
