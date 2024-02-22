const { Router } = require("express");
const {
  jwtValidator,
  fieldValidator,
  uniqueUserValidator,
  uniqueEmailValidator,
} = require("../middlewares");
const { changePasswordValidation } = require("../validations/user.validations");
const { emailPassValidations } = require("../validations/auth.validations");
const {
  updatePassword,
  updateEmail,
  updateUserName,
} = require("../controllers/user.controller");
const { responseMessages } = require("../utils/validation-errors.values");

const userRoutes = Router();

userRoutes.put(
  "/change-password",
  [jwtValidator, changePasswordValidation, fieldValidator],
  async (req, res) => {
    try {
      const data = await updatePassword(req.body, req.user.id);
      return res.status(200).json({ ...data });
    } catch (error) {
      console.log(error);
      if (error.status) {
        return res.status(error.status).json({ ok: false, message: error.msg });
      }
      return res
        .status(500)
        .json({ ok: false, message: responseMessages.internalServerError });
    }
  }
);

userRoutes.put(
  "/change-email",
  [jwtValidator, emailPassValidations, fieldValidator, uniqueEmailValidator],
  async (req, res) => {
    try {
      const data = await updateEmail(req.body, req.user.id);
      return res.status(200).json({ ...data });
    } catch (error) {
      console.log(error);
      if (error.status) {
        return res.status(error.status).json({ ok: false, message: error.msg });
      }
      return res
        .status(500)
        .json({ ok: false, message: responseMessages.internalServerError });
    }
  }
);

userRoutes.put(
  "/change-user",
  [jwtValidator, uniqueUserValidator],
  async (req, res) => {
    try {
      const data = await updateUserName(req.body, req.user.id);
      return res.status(200).json({ ...data });
    } catch (error) {
      console.log(error);
      if (error.status) {
        return res.status(error.status).json({ ok: false, message: error.msg });
      }
      return res
        .status(500)
        .json({ ok: false, message: responseMessages.internalServerError });
    }
  }
);

module.exports = userRoutes;
