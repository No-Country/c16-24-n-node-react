const { Router } = require("express");
const { googleOauth } = require("../controllers/oauth-google.controller");
const { signToken } = require("../utils/jwt-auth.helper");
const { FRONT_URL, FRONT_LOGIN } = process.env;
const router = new Router();

router.get(
  "/auth/google",
  googleOauth.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  googleOauth.authenticate("google", {
    failureRedirect: "/error",
    session: false,
  }),
  (req, res) => {
    const token = signToken({ id: req.user.id });
    return res.redirect(`${FRONT_URL}/${FRONT_LOGIN}?token=${token}`);
  }
);

module.exports = router;
