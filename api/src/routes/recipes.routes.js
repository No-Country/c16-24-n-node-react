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
  updateRecipeImage,
  getRecipesByHashtag,
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

recipesRoutes.get("/:recipeId", [jwtValidator], async (req, res) => {
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
  const { query } = req;
  try {
    const recipes = await getRecipes(query.page, query.perPage);
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

recipesRoutes.patch("/:recipeId", [jwtValidator], async (req, res) => {
  try {
    const { recipeId } = req.params;
    const updateFields = req.body;
    const updatedRecipe = await updateRecipe(
      req.user.id,
      recipeId,
      updateFields
    );
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

recipesRoutes.patch("/image/:recipeId", [jwtValidator], async (req, res) => {
  try {
    const { recipeId } = req.params;
    const imageFile = req.body;
    const updatedImage = await updateRecipeImage(recipeId, imageFile);
    return res.status(200).json({
      message: "Imagen actualizada exitosamente",
      image: updatedImage,
    });
  } catch (error) {
    // Manejar errores de servidor
    console.error("Error al actualizar la imagen:", error);
    return res.status(500).json({ error: "Error al actualizar la imagen" });
  }
});

recipesRoutes.delete("/:recipeId", [jwtValidator], async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipeDeleted = await deleteRecipe(recipeId);
    return res.status(200).json({
      message: "Receta borrada exitosamente",
      recipe: recipeDeleted,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

recipesRoutes.get("/category/:catName", async (req, res) => {
  const { catName } = req.params;
  try {
    const data = await getRecipesByHashtag(catName);
    return res.status(200).json({ok:true, data});
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({ ok: false, message: error.msg });
    }
    return res
      .status(500)
      .json({ ok: false, message: responseMessages.internalServerError });
  }
});

module.exports = recipesRoutes;
