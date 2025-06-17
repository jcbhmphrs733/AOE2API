// Modules
const router = require("express").Router();
const unitController = require("../controllers/unitController");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", unitController.getAll);
router.get("/:id", unitController.getSingle);
router.post("/", isAuthenticated, unitController.postUnit);
router.put("/:id", isAuthenticated, unitController.putUnit);
router.delete("/:id", isAuthenticated, unitController.deleteUnit);

//exporting the router
module.exports = router;
