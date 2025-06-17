// Modules
const router = require("express").Router();
const buildingController = require("../controllers/buildingController");
const validateObjectId = require("../utils/validateObjectId");
const validateBuilding = require("../utils/validateBuilding");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", buildingController.getAll);
router.get(
  "/:id",
  validateObjectId,
  buildingController.getSingle
);
router.post(
  "/",
  isAuthenticated,
  validateBuilding,
  buildingController.postBuilding
);
router.put(
  "/:id",
  isAuthenticated,
  validateObjectId,
  validateBuilding,
  buildingController.putBuilding
);
router.delete(
  "/:id",
  isAuthenticated,
  validateObjectId,
  buildingController.deleteBuilding
);

//Exporting the router
module.exports = router;
