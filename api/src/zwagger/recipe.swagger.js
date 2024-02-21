const {
  RecipeSchema,
  ValidationErrorSchema,
  InternalServerErrorSchema,
} = require("./schemas");

const createRecipePath = {
  post: {
    tags: ["Recipes"],
    summary: "Create a new recipe",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: RecipeSchema,
        },
      },
    },
    responses: {
      201: {
        description: "Recipe created successfully",
        content: {
          "application/json": {
            schema: RecipeSchema,
          },
        },
      },
      400: {
        description: "Bad request, validation errors",
        content: {
          "application/json": {
            schema: ValidationErrorSchema,
          },
        },
      },
      500: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: InternalServerErrorSchema,
          },
        },
      },
    },
  },
};

module.exports = { createRecipePath };
