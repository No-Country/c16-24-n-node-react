const { Router } = require("express");
const {
  signInValidations,
  logInValidations,
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
} = require("../middlewares");
const authRouter = new Router();

authRouter.post(
  "/signin",
  [signInValidations, fieldValidator, uniqueUserValidator],
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

authRouter.post(
  "/login",
  [logInValidations, fieldValidator],
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

authRouter.get("/renew-token", jwtValidator, (req, res) => {
  try {
    const user = renewToken(req.user.id);
    return res.json({ ok: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Server Error, please try again later." });
  }
});

module.exports = authRouter;
