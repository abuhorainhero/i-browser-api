const { check } = require("express-validator");

const bookmarkValidator = [
    check("title")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!")
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),

    check("userId")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!")
        .isLength({ min: 24 })
        .withMessage(": minimum length 24 char.!")
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),

    check("siteUrl")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!")
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),

];

module.exports = { bookmarkValidator };
