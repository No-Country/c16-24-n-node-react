const { Router } = require("express");
const {
  signInValidations,
  emailPassValidations,
} = require("../validations/auth.validations");
const {
  emailPasswordSignIn,
  emailPasswordLogIn,
  renewToken,
} = require("../controllers/auth.controller");
const {
  fieldValidator,
  uniqueUserValidator,
  jwtValidator,
  uniqueEmailValidator,
} = require("../middlewares");
const authRoutes = Router();

authRoutes.post(
  "/signin",
  [signInValidations, fieldValidator, uniqueEmailValidator, uniqueUserValidator],
  async (req, res) => {
    try {
      const user = await emailPasswordSignIn(req.body);
      return res.status(201).json({ ok: true, user });
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ ok: false, message: "Server Error, please try again later." });
    }
  }
);

authRoutes.post(
  "/login",
  [emailPassValidations, fieldValidator],
  async (req, res) => {
    try {
      const user = await emailPasswordLogIn(req.body);
      return res.status(200).json({ ok: true, user });
    } catch (error) {
      console.log(error);
      if (error.status) {
        return res.status(error.status).json({ ok: false, message: error.msg });
      }
      return res
        .status(500)
        .json({ ok: false, message: "Server Error, please try again later." });
    }
  }
);

authRoutes.get("/renew-token", jwtValidator, (req, res) => {
  try {
    const user = renewToken(req.user.id);
    return res.json({ ok: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Server Error, please try again later." });
  }
});

module.exports = authRoutes;
