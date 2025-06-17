const { body, validationResult } = require("express-validator");

const validateCiv = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name must be a non-empty string"),
  body("type")
    .isString()
    .notEmpty()
    .withMessage("Type must be a non-empty string"),
  body("castleTech")
    .isString()
    .notEmpty()
    .withMessage("Castle tech must be a non-empty string"),
  body("impTech")
    .isString()
    .notEmpty()
    .withMessage("Imperial tech must be a non-empty string"),
  body("uniqueUnit")
    .isString()
    .notEmpty()
    .withMessage("Unique unit must be a non-empty string"),
  body("teamBonus")
    .isString()
    .notEmpty()
    .withMessage("Team bonus must be a non-empty string"),
  body("bonus")
    .isString()
    .notEmpty()
    .withMessage("Civ bonus must be a non-empty string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateCiv;
