const { body, validationResult } = require("express-validator");

const validateBuilding = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name must be a non-empty string"),
  body("baseHP")
    .isInt()
    .notEmpty()
    .withMessage("Base HP must be a non-empty integer"),
  body("cost")
    .isObject()
    .notEmpty()
    .withMessage("Cost must be a non-empty object"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateBuilding;
