// Modules
const router = require("express").Router();
const buildingController = require("../controllers/buildingController");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", buildingController.getAll);
router.get("/:id", buildingController.getSingle);
router.post("/", isAuthenticated, buildingController.postBuilding);
router.put("/:id", isAuthenticated, buildingController.putBuilding);
router.delete("/:id", isAuthenticated, buildingController.deleteBuilding);

//Exporting the router
module.exports = router;
