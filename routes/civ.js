// Modules
const router = require("express").Router();
const civController = require("../controllers/civController");
const validateObjectId = require("../utils/validateObjectId");
const validateCiv = require("../utils/validateCiv");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", civController.getAll);
router.get("/:id", validateObjectId, civController.getSingle);
router.post("/", isAuthenticated, validateCiv, civController.postCiv);
router.put(
  "/:id",
  isAuthenticated,
  validateCiv,
  validateObjectId,
  civController.putCiv
);
router.delete(
  "/:id",
  isAuthenticated,
  validateObjectId,
  civController.deleteCiv
);

//Exporting the router
module.exports = router;
