const { check } = require("express-validator");

const withdrawalMethodValidator = [
    check("title")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!")
        .bail()
        .isString()
        .withMessage(": Should be a string.!"),

];

module.exports = { withdrawalMethodValidator };
