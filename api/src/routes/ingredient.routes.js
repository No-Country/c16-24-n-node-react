const { Router } = require("express");
const { jwtValidator } = require("../middlewares");
const {
  createIngredient,
  updateIngredients,
  getAllIngredients,
  getIngredientById,
  deleteIngredient,
} = require("../controllers/ingredient.controller");

const ingredientRoutes = Router();

ingredientRoutes.post("/", [jwtValidator], createIngredient);

ingredientRoutes.patch("/", [jwtValidator], updateIngredients);

ingredientRoutes.get("/:ingredientId", getIngredientById);

ingredientRoutes.get("/", getAllIngredients);

ingredientRoutes.delete("/:ingredientId", [jwtValidator], deleteIngredient);

module.exports = ingredientRoutes;
