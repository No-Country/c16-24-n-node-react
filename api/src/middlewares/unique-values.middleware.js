const { User } = require("../db");
const {
  validationErrorMessages,
} = require("../utils/validation-errors.values");

const uniqueUserValidator = async (req, res, next) => {
  try {
    const { user_name, email } = req.body;
    const existingUsername = await User.findOne({ where: { user_name } });
    if (existingUsername) {
      return res.status(400).json({
        ok: false,
        errors: {
          email: {
            value: user_name,
            msg: validationErrorMessages.usedUsername,
          },
        },
      });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({
        ok: false,
        errors: {
          email: {
            value: email,
            msg: validationErrorMessages.usedEmail,
          },
        },
      });
    }
    next();
  } catch (error) {
    console.error("Error al verificar la unicidad del usuario:", error);
    res.status(500).json({
      ok: false,
      error:
        "Ocurrió un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};

module.exports = uniqueUserValidator;
