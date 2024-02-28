const { Router } = require("express");
const { jwtValidator } = require("../middlewares");
const {
  toggleLikeRecipe,
  getLikesForRecipe,
} = require("../controllers/like.controller");

const likesRoutes = Router();

likesRoutes.post("/:recipeId/like", [jwtValidator], async (req, res) => {
  try {
    const { userId } = req.user;
    const { recipeId } = req.params;
    const like = await toggleLikeRecipe(userId, recipeId);
    return res.status(201).json({ like });
  } catch (error) {
    console.error("Error al dar/quitar like a la receta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

likesRoutes.get("/:recipeId/likes", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const likes = await getLikesForRecipe(recipeId);
    return res.status(201).json({ likes });
  } catch (error) {
    console.error("Error al obtener los likes de la receta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = likesRoutes;
