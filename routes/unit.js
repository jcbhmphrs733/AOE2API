// Modules
const router = require("express").Router();
const unitController = require("../controllers/unitController");
const validateObjectId = require("../utils/validateObjectId");
const validateUnit = require("../utils/validateUnit");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", unitController.getAll);
router.get("/:id", validateObjectId, unitController.getSingle);
router.post("/", isAuthenticated, validateUnit, unitController.postUnit);
router.put("/:id", isAuthenticated, validateUnit, validateObjectId, unitController.putUnit);
router.delete(
  "/:id",
  isAuthenticated,
  validateObjectId,
  unitController.deleteUnit
);

//exporting the router
module.exports = router;
