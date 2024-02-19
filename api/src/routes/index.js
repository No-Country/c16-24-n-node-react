const { Router } = require("express");
const authRoutes = require("./auth.routes");
const oauthGoogleRoutes = require("./oauth-google.routes");
const profileRoutes = require("./profile.routes");

const api = new Router()
  .use(authRoutes)
  .use(oauthGoogleRoutes)
  .use(profileRoutes);

module.exports = Router().use("/api", api);
