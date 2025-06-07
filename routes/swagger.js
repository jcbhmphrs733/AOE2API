//modules
const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get(
  "/api-docs",
  //#swagger.ignore = true
  swaggerUi.setup(swaggerDocument)
);

//exporting the router
module.exports = router;
