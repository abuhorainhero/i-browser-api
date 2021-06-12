const { check } = require("express-validator");

const cityValidator = [
  check("name")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 2 })
    .withMessage(": minimum length 2 char.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),

  check("countryId")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 24 })
    .withMessage(": minimum length 24 char.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),
];

module.exports = { cityValidator };
