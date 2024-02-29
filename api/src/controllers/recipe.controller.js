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

const updateIngredients = async (recipe, newIngredients) => {
  await Promise.all(
    newIngredients.map(async (ingredientData) => {
      const { name } = ingredientData;
      const nameToLowerCase = name.toLowerCase();
      let ingredient = await Ingredient.findOne({
        where: { name: nameToLowerCase },
      });

      if (!ingredient) {
        ingredient = await Ingredient.create({ name: nameToLowerCase });
      }

      await recipe.addIngredient(ingredient);
    })
  );
};

const updateCategories = async (recipe, newCategories) => {
  await Promise.all(
    newCategories.map(async (categoryData) => {
      const { name } = categoryData;
      const nameToLowerCase = name.toLowerCase();
      let category = await Category.findOne({
        where: { name: nameToLowerCase },
      });

      if (!category) {
        category = await Category.create({ name: nameToLowerCase });
      }

      await recipe.addCategory(category);
    })
  );
};

const updateHashtags = async (recipe, newHashtags) => {
  await Promise.all(
    newHashtags.map(async (hashtagData) => {
      const { name } = hashtagData;
      const nameToLowerCase = name.toLowerCase();
      let hashtag = await Hashtag.findOne({ where: { name: nameToLowerCase } });

      if (!hashtag) {
        hashtag = await Hashtag.create({ name: nameToLowerCase });
      }

      await recipe.addHashtag(hashtag);
    })
  );
};

const DATA_TYPES = {
  ingredient: Ingredient,
  hashtag: Hashtag,
  category: Category,
};

const addToRelations = async (arrayOfData, type) => {
  try {
    if (!DATA_TYPES[type]) {
      throw {};
    }
    if (arrayOfData && arrayOfData.length > 0) {
      const recipeData = await DATA_TYPES[type].bulkCreate(
        arrayOfData.map((newData) => ({
          name: newData.name.toLowerCase(),
          image:
            type === "ingredient" && !!newData.image
              ? { image: newData.image }
              : undefined,
        })),
        {
          // Opciones para evitar duplicados
          updateOnDuplicate: ["name", "image"],
        }
      );
      // const recipeData = await Promise.all(
      //   arrayOfData.map(async (data) => {
      //     const [newData, created] = await DATA_TYPES[type].findOrCreate({
      //       where: { name: data.name },
      //       defaults: type === "ingredient" ? { image: data.image } : undefined,
      //     });
      //     return newData;
      //   })
      // );
      return recipeData;
    }
    return [];
  } catch (error) {
    console.log(error);
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
  const ings = await addToRelations(ingredients, "ingredient");
  await newRecipe.setIngredients(ings);
  // Asociar las categorrías con la receta
  const cats = await addToRelations(categories, "category");
  await newRecipe.setCategories(cats);
  // Asociar los hashtags con la receta
  const hashs = await addToRelations(hashtags, "hashtag");
  await newRecipe.setHashtags(hashs);
  return newRecipe;
};

const updateRecipe = async (userId, recipeId, updatedAttributes) => {
  console.log(updatedAttributes);
  if (
    !updatedAttributes.name ||
    !updatedAttributes.description ||
    !updatedAttributes.portion ||
    !updatedAttributes.preparation_time ||
    !updatedAttributes.difficulty ||
    !updatedAttributes.process ||
    !updatedAttributes.ingredients ||
    !updatedAttributes.categories ||
    !updatedAttributes.hashtags
  )
    throw Error("Faltan datos");

  if (updatedAttributes.ingredients.length < 1) {
    throw new Error("Debe tener al menos un ingrediente");
  }
  const existingRecipe = await Recipe.findByPk(recipeId);

  if (!existingRecipe) {
    throw new Error("Receta no encontrada");
  }

  if (userId != existingRecipe.UserId) {
    throw Error("No puede modificar recetas de otros");
  }

  existingRecipe.set(updatedAttributes);

  const ings = await addToRelations(
    updatedAttributes.ingredients,
    "ingredient"
  );
  await existingRecipe.setIngredients(ings);

  const cats = await addToRelations(updatedAttributes.categories, "category");
  await existingRecipe.setCategories(cats);

  const hashs = await addToRelations(updatedAttributes.hashtags, "hashtag");
  await existingRecipe.setHashtags(hashs);

  // Guardar los cambios en la base de datos
  await existingRecipe.save();

  if (updatedAttributes.ingredients) {
    await updateIngredients(existingRecipe, updatedAttributes.ingredients);
  }

  if (updatedAttributes.categories) {
    await updateCategories(existingRecipe, updatedAttributes.categories);
  }

  if (updatedAttributes.hashtags) {
    await updateHashtags(existingRecipe, updatedAttributes.hashtags);
  }

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
        through: { attributes: [] },
      },
      {
        model: Category,
        attributes: ["name"],
        through: { attributes: [] },
      },
      {
        model: Hashtag,
        attributes: ["name"],
        through: { attributes: [] },
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
        through: { attributes: [] },
      },
      {
        model: Category,
        attributes: ["name"],
        through: { attributes: [] },
      },
      {
        model: Hashtag,
        attributes: ["name"],
        through: { attributes: [] },
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
  const recipeData = {...JSON.parse(JSON.stringify(recipe)), ingredients:recipe.Ingredients, categories:recipe.Categories, hashtags: recipe.Hashtags}
  delete recipeData.Ingredients;
  delete recipeData.Categories;
  delete recipeData.Hashtags;
  return recipeData;
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
