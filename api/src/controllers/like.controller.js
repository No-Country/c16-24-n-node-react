const { Like } = require("../db");

const toggleLikeRecipe = async (userId, recipeId) => {
  // Verificar si el usuario ya ha dado like a la receta
  const existingLike = await Like.findOne({
    where: { userId, recipeId },
  });

  if (existingLike) {
    // Si ya existe un like para esta receta por este usuario, eliminar el like
    await existingLike.destroy();
    return { created:false, message: "Like eliminado de la receta correctamente" };
  } else {
    // Si no existe un like para esta receta por este usuario, crear un nuevo like
    await Like.create({ userId, recipeId });
    return { created:true, message: "Like agregado a la receta correctamente" };
  }
};
// Función para obtener los likes de una receta
const getLikesForRecipePublic = async (recipeId) => {
  // Obtener todos los likes para la receta especificada
  const likes = await Like.findAndCountAll({
    where: { recipeId },
  });
  // Preparar la respuesta
  const response = {
    likes: likes.count,
  };

  return response;
};

const getLikesForRecipePrivate = async (recipeId, userId) => {
  // Obtener todos los likes para la receta especificada
  const likes = await Like.findAndCountAll({
    where: { recipeId },
  });

  const userLiked = await Like.findOne({
    where: {
      recipeId: recipeId,
      userId: userId,
    },
  });

  // Preparar la respuesta
  const response = {
    likes: likes.count,
    liked: !!userLiked,
  };

  return response;
};

module.exports = {
  toggleLikeRecipe,
  getLikesForRecipePublic,
  getLikesForRecipePrivate,
};
