const { Category, Ingredient, Hashtag } = require("../db");

const categoryId = async (categoryName) => {
  try {
    const categoryNameLowerCase = categoryName.toLowerCase();
    const category = await Category.findOne({
      where: {
        name: categoryNameLowerCase,
      },
    });

    if (category) {
      return category.id;
    } else {
      throw new Error("Categoría no encontrada");
    }
  } catch (error) {
    throw new Error("Error al buscar la categoría: " + error.message);
  }
};


const ingredientId = async (ingredientName) => {
  try {
    const ingredientNameLowerCase = ingredientName.toLowerCase();
    const ingredient = await Category.findOne({
      where: {
        name: ingredientNameLowerCase,
      },
    });

    if (ingredient) {
      return ingredient.id;
    } else {
      throw new Error("Categoría no encontrada");
    }
  } catch (error) {
    throw new Error("Error al buscar la categoría: " + error.message);
  }
};

const hashtagId = async (hashtagName) => {
  try {
    const hashtagNameLowerCase = hashtagName.toLowerCase();
    const hashtag = await Hashtag.findOne({
      where: {
        name: hashtagNameLowerCase,
      },
    });

    if (hashtag) {
      return hashtag.id;
    } else {
      throw new Error("Categoría no encontrada");
    }
  } catch (error) {
    throw new Error("Error al buscar la categoría: " + error.message);
  }
};

module.exports = {categoryId, ingredientId, hashtagId};
