const { check } = require("express-validator");

const userValidator = [
  check("name")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 5 })
    .withMessage(": minimum length 5 characters.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),

  // check("phone")
  //   .trim()
  //   .exists({ checkNull: true, checkFalsy: true })
  //   .withMessage(": Can not be empty.!")
  //   .isLength({ min: 10, max: 16 })
  //   .withMessage(": Length minimum 10 && maximum 16 characters.!")
  //   .bail()
  //   .isString()
  //   .withMessage(": Should be a string.!"),

  check("email")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 12, max: 50 })
    .withMessage(": Length minimum 12 && maximum 50 characters.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!")
    .isEmail()
    .withMessage(": Should be a Email.!"),

    check("password")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!"),

  // check("gender")
  //   .trim()
  //   .exists({ checkNull: true, checkFalsy: true })
  //   .withMessage(": Can not be empty.!")
  //   .bail()
  //   .isString()
  //   .withMessage(": Should be a string.!"),

  check("countryId")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 24 })
    .withMessage(": minimum length 24 char.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),

  check("cityId")
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(": Can not be empty.!")
    .isLength({ min: 24 })
    .withMessage(": minimum length 24 char.!")
    .bail()
    .isString()
    .withMessage(": Should be a string.!"),

  // check("walletAmount")
  //   .trim()
  //   .exists({ checkNull: true, checkFalsy: true })
  //   .withMessage(": Can not be empty.!"),

  // check("totalMinuteServed")
  //   .trim()
  //   .exists({ checkNull: true, checkFalsy: true })
  //   .withMessage(": Can not be empty.!"),

  // check("totalAdsViewed")
  //   .trim()
  //   .exists({ checkNull: true, checkFalsy: true })
  //   .withMessage(": Can not be empty.!"),

  // check("withdrawalMethodId")
  //   .trim()
  //   .exists({ checkNull: true, checkFalsy: true })
  //   .withMessage(": Can not be empty.!"),

  // check("accountNo")
  //   .trim()
  //   .exists({ checkNull: true, checkFalsy: true })
  //   .withMessage(": Can not be empty.!"),

  // check("interests")
  //   .exists({ checkNull: true, checkFalsy: true })
  //   .withMessage(": Can not be empty.!")
  //   .isArray()
  //   .withMessage(": Should be an array.!"),
];

module.exports = { userValidator };
