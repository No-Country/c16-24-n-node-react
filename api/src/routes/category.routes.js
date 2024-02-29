const { Router } = require("express");
const { jwtValidator } = require("../middlewares");
const {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
} = require("../controllers/category.controller");

const categoryRoutes = Router();

categoryRoutes.post("/", [jwtValidator], createCategory);

categoryRoutes.patch("/", [jwtValidator], updateCategory);

categoryRoutes.get("/:categoryId", getCategoryById);

categoryRoutes.get("/", getAllCategories);

categoryRoutes.delete("/:categoryId", [jwtValidator], deleteCategory);

module.exports = categoryRoutes;
