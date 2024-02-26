const { checkSchema } = require("express-validator");
const {
  validationErrorMessages,
} = require("../utils/validation-errors.values");
const { userNameValidOptions } = require("./auth.validations");

const searchUserValidation = checkSchema({
  term: {
    in: "query",
    trim: true,
    toLowerCase: true,
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isLength: {
      options: { min: 2, max: 24 },
      errorMessage: validationErrorMessages.lengthMinMax(2, 24),
    },
    matches: {
      options: /^[a-zA-Z0-9_]+$/,
      errorMessage: validationErrorMessages.general,
    },
  },
  page: {
    in: "query",
    isInt: {
      errorMessage: validationErrorMessages.mustBeInt(1),
      options: { min: 1 },
    },
    trim: true,
    toInt: true,
    optional: true,
  },
  perPage: {
    in: "query",
    isInt: {
      errorMessage: validationErrorMessages.mustBeInt(1, 10),
      options: { min: 1, max: 10 },
    },
    trim: true,
    toInt: true,
    optional: true,
  },
});

const getUserValidation = checkSchema({
  userName: { ...userNameValidOptions, in: "params" },
});

const getUserRecipesValidation = checkSchema({
  userId: {
    in: "params",
    trim: true,
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isUUID: { errorMessage: validationErrorMessages.notUUID },
  },
});

module.exports = {
  searchUserValidation,
  getUserValidation,
  getUserRecipesValidation,
};
