const { check } = require("express-validator");

const viewedAdsValidator = [
    check("adsId")
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
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),
];

module.exports = { viewedAdsValidator };
