const { Like } = require("../db");

const toggleLikeRecipe = async (userId, recipeId) => {
  // Verificar si el usuario ya ha dado like a la receta
  const existingLike = await Like.findOne({
    where: { userId, recipeId },
  });

  if (existingLike) {
    // Si ya existe un like para esta receta por este usuario, eliminar el like
    await existingLike.destroy();
    return { message: "Like eliminado de la receta correctamente" };
  } else {
    // Si no existe un like para esta receta por este usuario, crear un nuevo like
    await Like.create({ userId, recipeId });
    return { message: "Like agregado a la receta correctamente" };
  }
};
// Función para obtener los likes de una receta
const getLikesForRecipe = async (recipeId) => {
  // Obtener todos los likes para la receta especificada
  const likes = await Like.findAll({
    where: { recipeId },
  });

  // Calcular el total de likes
  const totalLikes = likes.length;

  // Preparar la respuesta
  const response = {
    totalLikes,
    likes,
  };

  return response;
};

module.exports = { toggleLikeRecipe, getLikesForRecipe };
