const { Op } = require("sequelize");
const { Recipe, Ingredient, Category, Hashtag, User } = require("../db");
const { cloudinary } = require("../utils/cloudinary.helper");

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
const createRecipe = async (
  {
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
  },
  userId
) => {
  if (
    !name ||
    !imageFile ||
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
          where: { name: ingredient.name.toLowerCase() },
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
          where: { name: category.name.toLowerCase() },
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
          where: { name: hashtag.name.toLowerCase() },
        });
        return newHashtag;
      })
    );

    await newRecipe.addHashtags(recipeHashtags);
  }

  return newRecipe;
};

const updateRecipe = async (recipeId, updatedAttributes) => {
  // Buscar la receta por ID
  const existingRecipe = await Recipe.findByPk(recipeId);

  if (!existingRecipe) {
    throw new Error("Receta no encontrada");
  }

  // Actualizar los atributos proporcionados en updatedAttributes
  Object.keys(updatedAttributes).forEach((key) => {
    if (updatedAttributes[key] !== undefined) {
      existingRecipe[key] = updatedAttributes[key];
    }
  });

  // Guardar los cambios en la base de datos
  await existingRecipe.save();

  return existingRecipe;
};

const updateRecipeImage = async (recipeId, newImageFile) => {
  const existingRecipe = await Recipe.findByPk(recipeId);

  if (!existingRecipe) {
    throw new Error("Receta no encontrada");
  }

  // Subir la nueva imagen a Cloudinary
  const newImageUrl = await uploadImageToCloudinary(newImageFile);

  // Actualizar el atributo de imagen de la receta
  existingRecipe.primaryimage = newImageUrl;

  // Guardar los cambios en la base de datos
  await existingRecipe.save();

  return existingRecipe;
};

const getRecipes = async () => {
  // Obtener todas las recetas ordenadas por fecha de creación de forma descendente
  const recipes = await Recipe.findAll({
    where: { hidden: false },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Ingredient,
        attributes: ["name"],
      },
      {
        model: Category,
        attributes: ["name"],
      },
      {
        model: Hashtag,
        attributes: ["name"],
      },
      {
        model: User,
        attributes: ["user_name"],
      },
    ],
  });
  return recipes;
};

const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findByPk(recipeId, {
    include: [
      {
        model: Ingredient,
        attributes: ["name"],
      },
      {
        model: Category,
        attributes: ["name"],
      },
      {
        model: Hashtag,
        attributes: ["name"],
      },
      {
        model: User,
        attributes: ["user_name"],
      },
    ],
  });

  if (!recipe) {
    throw new Error(`No se encontró ninguna receta con el ID ${recipeId}.`);
  }

  return recipe;
};

const searchRecipesByName = async (name) => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // Búsqueda por coincidencia parcial del nombre
        },
        hidden: false,
      },
      include: [
        {
          model: Ingredient,
          attributes: ["name"],
        },
        {
          model: Category,
          attributes: ["name"],
        },
        {
          model: Hashtag,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return recipes;
  } catch (error) {
    console.error("Error al buscar recetas por nombre:", error);
    throw new Error("Error al buscar recetas por nombre.");
  }
};

const deleteRecipe = async (recipeId) => {
  const recipe = await Recipe.findByPk(recipeId);

  if (!recipe) {
    return res.status(404).json({ error: "Receta no encontrada" });
  }

  // Realizar el borrado lógico actualizando el campo "hidden"
  recipe.hidden
    ? await recipe.update({ hidden: false })
    : await recipe.update({ hidden: true });

  const remainingRecipes = await Recipe.findAll({
    where: { hidden: false },
  });

  return remainingRecipes;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  searchRecipesByName,
  updateRecipe,
  updateRecipeImage,
  deleteRecipe,
};
