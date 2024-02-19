const { Router } = require("express");
const fieldValidator = require("../middlewares/field-validator.middleware");
const checkUniqueUser = require("../middlewares/unique-values.middleware");
const {
  signInValidations,
  logInValidations,
} = require("../validations/auth.validations");
const {
  emailPasswordSignIn,
  emailPasswordLogIn,
  renewToken,
} = require("../controllers/auth.controller");
const tokenValidator = require("../middlewares/jwt.middleware");
const router = new Router();

router.post(
  "/auth/signin",
  [signInValidations, fieldValidator, checkUniqueUser],
  async (req, res) => {
    try {
      const user = await emailPasswordSignIn(req.body);
      res.status(201).json({ ok: true, user });
    } catch (error) {
      res
        .status(500)
        .json({ ok: false, message: "Server Error, please try again later." });
    }
  }
);

router.post(
  "/auth/login",
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

router.get("/auth/renew-token", tokenValidator, (req, res) => {
  try {
    const user = renewToken(req.user.id);
    return res.json({ ok: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Server Error, please try again later." });
  }
});

module.exports = router;
