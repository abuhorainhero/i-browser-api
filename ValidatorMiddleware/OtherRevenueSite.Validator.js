const { check } = require("express-validator");

const otherRevenueSiteValidator = [
    check("minVisitingTime")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!"),

    check("revenue")
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage(": Can not be empty.!"),
];

module.exports = { otherRevenueSiteValidator };
