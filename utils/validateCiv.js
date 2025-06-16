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
    .isSy()
    .notEmpty()
    .withMessage("Castle tech must be a non-empty array"),
];
