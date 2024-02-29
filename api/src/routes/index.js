const { Router } = require("express");

const authRoutes = require("./auth.routes");
const oauthGoogleRoutes = require("./oauth-google.routes");
const recipesRoutes = require("./recipes.routes");
const profileRoutes = require("./profile.routes");
const userRoutes = require("./user.routes");
const reviewsRoutes = require("./review.routes");
const likesRoutes = require("./like.routes");
const ingredientRoutes = require("./ingredient.routes");
const usersRoutes = require("./users.routes");

const apiRouter = new Router()
  .use("/auth", authRoutes)
  .use("/auth/google", oauthGoogleRoutes)
  .use("/profile", profileRoutes)
  .use("/recipes", recipesRoutes)
  .use("/user", userRoutes)
  .use("/users", usersRoutes)
  .use("/reviews", reviewsRoutes)
  .use("/recipe", likesRoutes)
  .use("ingredients", ingredientRoutes);

module.exports = apiRouter;
