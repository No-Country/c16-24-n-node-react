const { validationResult } = require("express-validator");
const { responseMessages } = require("../utils/validation-errors.values");

const errorFormatter = ({ location, msg, path }) => {
  return { msg, location, path };
};

const fieldValidator = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: req.url != "/auth/login" ? errors.mapped() : undefined,
      message:  req.url == "/auth/login" ? responseMessages.notValidCredentials : undefined,
    });
  }
  next();
};

module.exports = fieldValidator;
