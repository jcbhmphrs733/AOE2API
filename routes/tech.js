// Modules
const router = require("express").Router();
const techController = require("../controllers/techController");
const validateObjectId = require("../utils/validateObjectId");
const validateTech = require("../utils/validateTech");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", techController.getAll);
router.get("/:id", validateObjectId, techController.getSingle);
router.post("/", isAuthenticated, validateTech, techController.postTech);
router.put(
  "/:id",
  isAuthenticated,
  validateTech,
  validateObjectId,
  techController.putTech
);
router.delete(
  "/:id",
  isAuthenticated,
  validateObjectId,
  techController.deleteTech
);

//exporting the router
module.exports = router;
