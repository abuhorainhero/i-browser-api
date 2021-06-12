const { check } = require("express-validator");

const interestValidator = [
  check("topic")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 3 })
    .withMessage(": minimum length 3 characters.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),
];

module.exports = { interestValidator };
