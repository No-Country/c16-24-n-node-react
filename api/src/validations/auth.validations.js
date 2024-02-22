const { checkSchema } = require("express-validator");
const {
  validationErrorMessages,
} = require("../utils/validation-errors.values");

const signInValidations = checkSchema({
  user_name: {
    in: "body",
    trim: true,
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isLength: {
      options: { min: 2, max: 12 },
      errorMessage: validationErrorMessages.namesLenght,
    },
    matches: {
      options: /^[a-zA-Z0-9_]+$/,
      errorMessage: validationErrorMessages.general,
    },
  },
  email: {
    in: "body",
    trim: true,
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isEmail: { errorMessage: validationErrorMessages.isEmail },
    toLowerCase: true,
  },
  password: {
    in: "body",
    trim: true,
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isLength: {
      options: { min: 10, max: 24 },
      errorMessage: validationErrorMessages.lengthMinMax(10,24),
    },
  },
});

const logInValidations = checkSchema({
  email: {
    in: "body",
    trim: true,
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isEmail: { errorMessage: validationErrorMessages.isEmail },
    toLowerCase: true,
  },
  password: {
    in: "body",
    trim: true,
    notEmpty: { errorMessage: validationErrorMessages.notEmpty },
    isLength: {
      options: { min: 10, max: 24 },
      errorMessage: validationErrorMessages.lengthMinMax(10,24),
    },
  },
});

module.exports = { signInValidations, logInValidations };
