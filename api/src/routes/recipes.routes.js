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
} = require("../controllers/recipe.controller");

const recipesRoutes = Router();

recipesRoutes.get("/:id", async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await getRecipeById(recipeId);

    // Enviar la receta encontrada en la respuesta
    return res.status(200).json({ recipe });
  } catch (error) {
    // Si ocurre un error, enviar una respuesta con un código de estado 500 y el mensaje de error
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
    // Si ocurre un error, enviar una respuesta con un código de estado 500 y el mensaje de error
    console.error("Error al obtener las recetas:", error);
    return res.status(500).json({ message: "Error al obtener las recetas." });
  }
});

recipesRoutes.post("/", async (req, res) => {
  try {
    const response = req.body;
    //const userId = req.user.id;
    const newRecipe = await createRecipe(response);
    return res.status(201).json(newRecipe);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

recipesRoutes.patch("/", async (req, res) => {
  try {
    return res.status(200).send("Esta es la ruta patch recipes");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

recipesRoutes.delete("/", async (req, res) => {
  try {
    return res.status(200).send("Esta es la ruta delete recipes");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = recipesRoutes;
