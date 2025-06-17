const { body, validationResult } = require("express-validator");

const validateTech = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name must be a non-empty string"),
  body("castleTech")
    .isString()
    .notEmpty()
    .withMessage("Type must be a non-empty string"),
  body("castleTechCost")
    .isInt()
    .notEmpty()
    .withMessage("Castle tech must be a non-empty integer"),
  body("impTech")
    .isString()
    .notEmpty()
    .withMessage("Imperial tech must be a non-empty string"),
  body("inpTechCost")
    .isInt()
    .notEmpty()
    .withMessage("Unique unit must be a non-empty integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateTech;
