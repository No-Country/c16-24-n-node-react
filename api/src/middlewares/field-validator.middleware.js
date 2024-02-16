const { validationResult } = require("express-validator");

const errorFormatter = ({ location, msg, path }) => {
  return { msg, location, path };
};

const fieldValidator = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = fieldValidator;
