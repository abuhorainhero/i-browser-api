const { validationResult } = require("express-validator");

const checkValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  } else {
    const errorArray = errors
      .array()
      .map((item) => `${item.param} ${item.msg}`);
    return res.status(400).json({ message: errorArray });
  }
};

module.exports = { checkValidator };
