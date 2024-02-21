const { Recipe, Ingredient, Category, Hashtag } = require("../db");

// Controlador para crear una nueva receta
const createRecipe = async ({
  userId,
  name,
  primaryimage,
  description,
  portion,
  preparation_time,
  difficulty,
  process,
  hidden,
  ingredients,
  categories,
  hashtags,
}) => {
  if (
    !userId ||
    !name ||
    !primaryimage ||
    !description ||
    !portion ||
    !preparation_time ||
    !difficulty ||
    !process ||
    !ingredients ||
    !categories ||
    !hashtags
  )
    throw Error("Faltan datos");

  // Crear la receta en la base de datos
  const newRecipe = await Recipe.create({
    userId, // Asignar el ID del usuario que crea la receta
    name,
    primaryimage,
    description,
    portion,
    preparation_time,
    difficulty,
    process,
  });

  // Asociar los ingredientes con la receta
  if (ingredients && ingredients.length > 0) {
    const recipeIngredients = await Promise.all(
      ingredients.map(async (ingredient) => {
        const [newIngredient, created] = await Ingredient.findOrCreate({
          where: { name: ingredient.name },
          defaults: { image: ingredient.image },
        });
        return newIngredient;
      })
    );

    await newRecipe.addIngredients(recipeIngredients);
  }

  // Asociar las categorías con la receta
  if (categories && categories.length > 0) {
    const recipeCategories = await Promise.all(
      categories.map(async (category) => {
        const [newCategory, created] = await Category.findOrCreate({
          where: { name: category.name },
          defaults: { image: category.image },
        });
        return newCategory;
      })
    );

    await newRecipe.addCategories(recipeCategories);
  }

  // Asociar los hashtags con la receta
  if (hashtags && hashtags.length > 0) {
    const recipeHashtags = await Promise.all(
      hashtags.map(async (hashtag) => {
        const [newHashtag, created] = await Hashtag.findOrCreate({
          where: { name: hashtag.name },
        });
        return newHashtag;
      })
    );

    await newRecipe.addHashtags(recipeHashtags);
  }

  return newRecipe;
};

module.exports = createRecipe;
