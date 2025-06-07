// Modules
const router = require("express").Router();
const techController = require("../controllers/civController");

//middleware functions
const { isAuthenticated } = require("../middleware/authenticate");

//routes
router.get("/", isAuthenticated, techController.getAll);
router.get("/:id", isAuthenticated, techController.getSingle);
router.post("/", isAuthenticated, techController.postTech);
router.put("/:id", isAuthenticated, techController.putTech);
router.delete("/:id", isAuthenticated, techController.deleteTech);