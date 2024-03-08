const { Router } = require("express");
const { jwtValidator } = require("../middlewares");
const {
  toggleLikeRecipe,
  getLikesForRecipePublic,
  getLikesForRecipePrivate,
} = require("../controllers/like.controller");

const likesRoutes = Router();

likesRoutes.post("/:recipeId/like", [jwtValidator], async (req, res) => {
  try {
    const { recipeId } = req.params;
    const like = await toggleLikeRecipe(req.user.id, recipeId);
    return res.status(200).json(like);
  } catch (error) {
    console.error("Error al dar/quitar like a la receta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

likesRoutes.get("/:recipeId/likes", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const likes = await getLikesCountForRecipePublic(recipeId);
    return res.status(200).json(likes);
  } catch (error) {
    console.error("Error al obtener los likes de la receta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

likesRoutes.get("/:recipeId/likes_pr", [jwtValidator], async (req, res) => {
  try {
    const { recipeId } = req.params;
    const likes = await getLikesCountForRecipePrivate(recipeId, req.user.id);
    return res.status(201).json(likes);
  } catch (error) {
    console.error("Error al obtener los likes de la receta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = likesRoutes;
