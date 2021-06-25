const { check } = require("express-validator");

const withdrawalRequestValidator = [
    check("userId")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!")
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),

    check("withdrawalMethodId")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!")
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),

    check("accountNo")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!")
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),

    check("amount")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!"),

    // check("status")
    //     .trim()
    //     .exists({ checkNull: true, checkFalsy: true })
    //     .withMessage(": Can not be empty.!")
    //     .bail()
    //     .isString()
    //     .withMessage(": Should be a string.!"),

    // check("note")
    //     .trim()
    //     .exists({ checkNull: true, checkFalsy: true })
    //     .withMessage(": Can not be empty.!")
    //     .bail()
    //     .isString()
    //     .withMessage(": Should be a string.!"),
];

module.exports = { withdrawalRequestValidator };
