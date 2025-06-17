// Modules
const router = require("express").Router();
const techController = require("../controllers/techController");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", techController.getAll);
router.get("/:id", techController.getSingle);
router.post("/", isAuthenticated, techController.postTech);
router.put("/:id", isAuthenticated, techController.putTech);
router.delete("/:id", isAuthenticated, techController.deleteTech);

//exporting the router
module.exports = router;