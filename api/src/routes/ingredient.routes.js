const { Router } = require("express");
const { jwtValidator } = require("../middlewares");
const {
  createIngredient,
  updateIngredient,
  getAllIngredients,
  getIngredientById,
  deleteIngredient,
} = require("../controllers/ingredient.controller");

const ingredientRoutes = Router();

ingredientRoutes.post("/", [jwtValidator], createIngredient);

ingredientRoutes.patch("/:ingredientId", [jwtValidator], updateIngredient);

ingredientRoutes.get("/:ingredientId", getIngredientById);

ingredientRoutes.get("/", getAllIngredients);

ingredientRoutes.delete("/", [jwtValidator], deleteIngredient);

module.exports = ingredientRoutes;
