const { checkSchema } = require("express-validator");
const {
  validationErrorMessages,
} = require("../utils/validation-errors.values");

const imageMaxSize = parseInt(process.env.PROFILE_IMG_MAX_SIZE);

const imageBase64MaxSizeValidator = (value) => {
  const maxSizeInBytes = imageMaxSize * 1024 * 1024;
  const base64SizeInBytes = Math.ceil((value.length * 3) / 4);
  if (base64SizeInBytes > maxSizeInBytes) {
    throw new Error(validationErrorMessages.fileSize(imageMaxSize));
  }
  return true;
};

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
    optional: false,
    notEmpty: true,
    custom: {
      options: (value) => imageBase64MaxSizeValidator(value),
      errorMessage: validationErrorMessages.fileSize(imageMaxSize),
    },
    matches: {
      options: /data:image\/(png|jpeg|svg|webp);base64,/,
      errorMessage: validationErrorMessages.imageMimes,
    },
  },
});

module.exports = { profileValidationSchema, profilePhotoValidationSchema };
