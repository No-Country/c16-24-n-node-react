const { Ingredient } = require("../db");

// Controlador para crear un nuevo ingrediente
const createIngredient = async (req, res) => {
  try {
    const { name, image } = req.body;

    const nameToLowerCase = name.toLowerCase();

    // Verificar si el ingrediente ya existe en la base de datos
    const existingIngredient = await Ingredient.findOne({
      where: { name: nameToLowerCase },
    });
    if (existingIngredient) {
      return res.status(400).json({ error: "El ingrediente ya existe" });
    }

    // Crear el nuevo ingrediente
    const newIngredient = await Ingredient.create({ name, image });

    return res.status(201).json(newIngredient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateIngredients = async (req, res) => {
  try {
    const ingredientsToUpdate = req.body;

    // Iterar sobre cada ingrediente en la lista
    const updatedIngredients = await Promise.all(
      ingredientsToUpdate.map(async (ingredientData) => {
        const { name, image } = ingredientData;

        const nameToLowerCase = name.toLowerCase();

        // Verificar si el ingrediente existe en la base de datos
        let existingIngredient = await Ingredient.findOne({
          where: { name: nameToLowerCase },
        });

        // Si el ingrediente no existe, crear uno nuevo
        if (!existingIngredient) {
          existingIngredient = await Ingredient.create({
            name: nameToLowerCase,
            image,
          });
        } else {
          // Actualizar los atributos del ingrediente solo si se proporcionan en la solicitud
          if (name !== undefined) {
            existingIngredient.name = nameToLowerCase;
          }
          if (image !== undefined) {
            existingIngredient.image = image;
          }

          // Guardar los cambios en la base de datos
          await existingIngredient.save();
        }

        return existingIngredient;
      })
    );

    return res.status(200).json(updatedIngredients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los ingredientes
const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    return res.status(200).json(ingredients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un ingrediente por su ID
const getIngredientById = async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const ingredient = await Ingredient.findByPk(ingredientId);

    if (!ingredient) {
      return res.status(404).json({ error: "Ingrediente no encontrado" });
    }

    return res.status(200).json(ingredient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un ingrediente
const deleteIngredient = async (req, res) => {
  try {
    const { ingredientId } = req.params;

    // Verificar si el ingrediente existe en la base de datos
    const existingIngredient = await Ingredient.findByPk(ingredientId);
    if (!existingIngredient) {
      return res.status(404).json({ error: "Ingrediente no encontrado" });
    }

    // Eliminar el ingrediente
    await existingIngredient.destroy();

    return res.status(204).send(); // No Content
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIngredient,
  updateIngredients,
  getAllIngredients,
  getIngredientById,
  deleteIngredient,
};
