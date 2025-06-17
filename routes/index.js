/*----------
Required Modules
----------*/
const router = require("express").Router();
const passport = require("passport");
const baseController = require("../controllers/baseController");

/*----------
This route serves the home page of the application
----------*/

router.use("/", require("./swagger"));
router.get("/", baseController.buildHome);

// These are the routes that lead to the other route files
router.use("/civs", require("./civ"));
router.use("/tech", require("./tech"));
router.use("/units", require("./unit"));
router.use("/buildings", require("./building"));

/*----------
This route handles the login with GitHub using Passport.js
----------*/
router.get(
  "/login", //#swagger.ignore = true
  passport.authenticate("github"),
  (req, res) => {}
);

/*----------
This route handles the logout functionality
----------*/
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/*----------
Exporting the router
----------*/

module.exports = router;
