const { check } = require("express-validator");

const adminValidator = [
  check("name")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),

  check("phone")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 10 })
    .withMessage(": Length minimum 10 Characters.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),

  check("email")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!")
    .isEmail()
    .withMessage(": Should be a Email.!"),

    check("password")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 10 })
    .withMessage(": minimum length 10 characters.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),

  check("gender")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),

];

module.exports = { adminValidator };
