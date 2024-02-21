const { checkSchema } = require("express-validator");
const {
  validationErrorMessages,
} = require("../utils/validation-errors.values");

const profileValidationSchema = checkSchema({
  first_name: {
    optional: true,
    isString: { errorMessage: "No válido" },
    notEmpty: true,
    matches: {
      options: /^[a-zA-Z\s]*$/,
      errorMessage: validationErrorMessages.general,
    },
    isLength: {
      options: { min: 2, max: 12 },
      errorMessage: validationErrorMessages.namesLenght,
    },
    trim: true,
  },
  last_name: {
    optional: true,
    isString: true,
    notEmpty: true,
    matches: {
      options: /^[a-zA-Z\s]*$/,
      errorMessage: validationErrorMessages.general,
    },
    isLength: {
      options: { min: 2, max: 12 },
      errorMessage: validationErrorMessages.namesLenght,
    },
    trim: true,
  },
  description: {
    optional: true,
    isLength: {
      options: { min: 2, max: 256 },
      errorMessage: validationErrorMessages.lengthMinMax(2, 256),
    },
    isString: true,
    trim: true,
  },
  country: {
    isString: true,
    optional: true,
    isLength: {
      options: { min: 2, max: 40 },
      errorMessage: validationErrorMessages.lengthMinMax(2, 40),
    },
  },
  mobilenumber: {
    isString: true,
    optional: true,
    isLength: {
      options: { min: 9, max: 12 },
      errorMessage: validationErrorMessages.lengthMinMax(9, 12),
    },
  },
});

const profilePhotoValidationSchema = checkSchema({
  image: {
    optional:true,
    notEmpty:true,
  }
})

module.exports = { profileValidationSchema, profilePhotoValidationSchema };
