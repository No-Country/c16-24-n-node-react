const { Router } = require("express");
const authRoutes = require("./auth.routes");
const oauthGoogleRoutes = require("./oauth-google.routes");
const profileRoutes = require("./profile.routes");

const apiRouter = new Router()
  .use("/auth",authRoutes)
  .use("/auth/google", oauthGoogleRoutes)
  .use("/profile",profileRoutes);

module.exports = apiRouter;
