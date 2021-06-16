const { check } = require("express-validator");

const adsValidator = [
    check("url")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!")
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),

    check("minVisitingTime")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!"),

    check("instruction")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!")
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),

    check("revenue")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!"),
];

module.exports = { adsValidator };
