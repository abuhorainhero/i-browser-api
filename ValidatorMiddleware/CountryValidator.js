const { check } = require("express-validator");

const countryValidator = [
  check("name")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 2 })
    .withMessage(": minimum length 2 char.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),
];

module.exports = { countryValidator };
