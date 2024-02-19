const { Router } = require("express");

const authRoutes = require("./routes-auth");
const oauthGoogleRoutes = require("./routes-oauth-google");
const recipesRoutes = require("./routes-Recipes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/oauth-google", oauthGoogleRoutes);
router.use("/recipes", recipesRoutes);

module.exports = router;
