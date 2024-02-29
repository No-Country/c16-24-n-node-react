const { Category } = require("../db");

const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const nameToLowerCase = name.toLowerCase();

    const existingCategory = await Category.findOne({
      where: { name: nameToLowerCase },
    });
    if (existingCategory) {
      return res.status(400).json({ error: "La categoría ya existe" });
    }

    const newCategory = await Category.create({ name, image });

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar parcialmente o crear nuevas categorías
const updateCategories = async (req, res) => {
  try {
    const categoriesToUpdate = req.body;

    // Iterar sobre cada categoría en la lista
    const updatedCategories = await Promise.all(
      categoriesToUpdate.map(async (categoryData) => {
        const { name, image } = categoryData;

        const nameToLowerCase = name.toLowerCase();
        // Verificar si la categoría existe en la base de datos
        let existingCategory = await Category.findOne({
          where: { name: nameToLowerCase },
        });

        // Si la categoría no existe, crear una nueva
        if (!existingCategory) {
          existingCategory = await Category.create({
            name: nameToLowerCase,
            image,
          });
        } else {
          // Actualizar los atributos de la categoría solo si se proporcionan en la solicitud
          if (name !== undefined) {
            existingCategory.name = nameToLowerCase;
          }
          if (image !== undefined) {
            existingCategory.image = image;
          }

          // Guardar los cambios en la base de datos
          await existingCategory.save();
        }

        return existingCategory;
      })
    );

    return res.status(200).json(updatedCategories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    return res.status(200).json(ingredient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Verificar si el ingrediente existe en la base de datos
    const existingCategory = await Category.findByPk(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    // Eliminar el ingrediente
    await existingCategory.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
