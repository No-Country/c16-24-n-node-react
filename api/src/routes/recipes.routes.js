const { Router } = require("express");
const {
  jwtValidator,
  emptyBodyValidator,
  fieldValidator,
  imageValidator,
} = require("../middlewares");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  searchRecipesByName,
} = require("../controllers/recipe.controller");

const recipesRoutes = Router();

recipesRoutes.get("/search", [jwtValidator], async (req, res) => {
  try {
    const { recipeName } = req.query;
    const recipeByName = await searchRecipesByName(recipeName);
    if (recipeByName.length === 0) {
      return res.status(404).json({
        message: `No se encontraron recetas con el nombre: ${recipeName}`,
      });
    }
    res.status(200).json(recipeByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

recipesRoutes.get("/:id", [jwtValidator], async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await getRecipeById(recipeId);
    return res.status(200).json({ recipe });
  } catch (error) {
    console.error("Error al obtener la receta por ID:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener la receta por ID." });
  }
});

recipesRoutes.get("/", async (req, res) => {
  try {
    const recipes = getRecipes();
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No se encontraron recetas." });
    }
    return res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error al obtener las recetas:", error);
    return res.status(500).json({ message: "Error al obtener las recetas." });
  }
});

recipesRoutes.post("/", [jwtValidator], async (req, res) => {
  try {
    const response = req.body;
    const userId = req.user.id;
    const newRecipe = await createRecipe(response, userId);
    return res.status(201).json(newRecipe);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

recipesRoutes.patch("/", [jwtValidator], async (req, res) => {
  try {
    const { recipeId } = req.params;
    const updateFields = req.body;
    const updatedRecipe = updateRecipe(recipeId, updateFields);
    return res.status(200).json({
      message: "Receta actualizada exitosamente",
      recipe: updatedRecipe,
    });
  } catch (error) {
    // Manejar errores de servidor
    console.error("Error al actualizar la receta:", error);
    return res.status(500).json({ error: "Error al actualizar la receta" });
  }
});

recipesRoutes.delete("/", [jwtValidator], async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipeDeleted = deleteRecipe(recipeId);
    return res.status(200).json({
      message: "Receta borrada exitosamente",
      recipe: recipeDeleted,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = recipesRoutes;
