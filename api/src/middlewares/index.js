const emptyBodyValidator = require("./empty-body.middleware");
const fieldValidator = require("./field-validator.middleware");
const imageValidator = require("./image.middleware");
const jwtValidator = require("./jwt.middleware");
const uniqueUserValidator = require("./unique-user.middleware");
const uniqueEmailValidator = require("./unique-email.middleware")

module.exports = {
  emptyBodyValidator,
  fieldValidator,
  imageValidator,
  jwtValidator,
  uniqueUserValidator,
  uniqueEmailValidator
};
