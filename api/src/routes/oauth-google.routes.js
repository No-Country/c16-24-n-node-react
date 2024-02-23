const { Router } = require("express");
const {
  googleOauth,
  googleRevalidateToken,
} = require("../controllers/oauth-google.controller");
const { signToken } = require("../utils/jwt-auth.helper");
const { jwtValidator } = require("../middlewares");
const { FRONT_URL, FRONT_LOGIN } = process.env;
const oauthGoogleRoutes = Router();

oauthGoogleRoutes.get(
  "/",
  googleOauth.authenticate("google", { scope: ["profile", "email"] })
);

oauthGoogleRoutes.get(
  "/callback",
  googleOauth.authenticate("google", {
    failureRedirect: "/error",
    session: false,
  }),
  (req, res) => {
    const token = signToken({ id: req.user.id });
    return res.redirect(`${FRONT_URL}/${FRONT_LOGIN}?token=${token}`);
  }
);

oauthGoogleRoutes.get("/revalidate", [jwtValidator], async (req, res) => {
  try {
    const user = await googleRevalidateToken(req.user.id);
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
});

module.exports = oauthGoogleRoutes;
