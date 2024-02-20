const { Router } = require("express");

const authRoutes = require("./auth.routes");
const oauthGoogleRoutes = require("./oauth-google.routes");
const recipesRoutes = require("./recipes.routes");

const apiRouter = new Router()
  .use("/auth", authRoutes)
  .use("/auth", oauthGoogleRoutes)
  .use("/recipes", recipesRoutes);

module.exports = apiRouter;
