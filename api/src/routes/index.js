const { Router } = require("express");

const authRoutes = require("./routes-auth");
const oauthGoogleRoutes = require("./routes-oauth-google");
const recipesRoutes = require("./routes-Recipes");

const apiRouter = new Router()
  .use("/auth", authRoutes)
  .use("/auth", oauthGoogleRoutes)
  .use("/recipes", recipesRoutes);

module.exports = apiRouter;
