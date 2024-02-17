const { Router } = require("express");
const authRoutes = require("./auth.routes");
const oauthGoogleRoutes = require("./oauth-google.routes");

const api = new Router().use(authRoutes).use(oauthGoogleRoutes);

module.exports = Router().use("/api", api);
