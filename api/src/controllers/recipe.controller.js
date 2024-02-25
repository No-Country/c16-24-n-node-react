const { Recipe, Ingredient, Category, Hashtag } = require("../db");
const { cloudinary } = require("../utils/cloudinary.helper");
const userID = require("../utils/userId");

const userId = userID("andavian");

const uploadImageToCloudinary = async (imageBase64) => {
  try {
    // Subir la imagen a Cloudinary desde su representación base64
    const result = await cloudinary.v2.uploader.upload(imageBase64, {
      folder: "recipes",
    });
    return result.secure_url; // Devuelve la URL segura de la imagen subida
  } catch (error) {
    throw new Error("Error al subir la imagen a Cloudinary");
  }
};

// Controlador para crear una nueva receta
const createRecipe = async ({
  name,
  imageFile,
  description,
  portion,
  preparation_time,
  difficulty,
  process,
  ingredients,
  categories,
  hashtags,
}) =>
  //userId
  {
    if (
      //!userId ||
      !name ||
      //!imageFile ||
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

    // Subir la imagen a Cloudinary
    var imageUrl = "null";

    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }
    //let userId = "efd1f68f-44f2-4936-8f48-07d8b0be62e1";
    // Crear la receta en la base de datos
    const newRecipe = await Recipe.create({
      UserId: userId, // Asignar el ID del usuario que crea la receta
      name,
      primaryimage: imageUrl,
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

const getRecipes = async () => {
  // Obtener todas las recetas ordenadas por fecha de creación de forma descendente
  const recipes = await Recipe.findAll({
    //order: [["createdAt", "DESC"]],
    include: [Ingredient, Category, Hashtag],
  });
  return recipes;
};

module.exports = { createRecipe, getRecipes };
